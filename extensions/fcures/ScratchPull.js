// Name: ScratchPull
// ID: fcuresScratchPull
// Description: Allows you to pull info from scratch website, such as user info, project info, studio info, etc.
// By: fcures <https://scratch.mit.edu/users/fcures/> (Main Account is sev18 <https://scratch.mit.edu/users/sev18/>)
// License: MIT


(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must run unsandboxed to run.");
  }

  // Helper function for fetching data from APIs
  async function fetchData(url) {
    try {
      const response = await Scratch.fetch(url);
      if (!response.ok) {
        return "";
      }
      return await response.json();
    } catch (error) {
      return "";
    }
  }

  // Class definition
  class fcuresScratchPull {
    getInfo() {
      return {
        id: "fcuresScratchPull",
        name: Scratch.translate("ScratchPull"),
        color1: "#ECA90B",
        color2: "#EBAF00",
        blocks: this.defineBlocks(),
        menus: this.defineMenus(),
      };
    }

    // Define blocks
    defineBlocks() {
      return [
        {
          opcode: "usergrab2",
          blockType: Scratch.BlockType.REPORTER,
          text: Scratch.translate("[WHAT] of user [WHO]"),
          arguments: {
            WHAT: {
              type: Scratch.ArgumentType.STRING,
              menu: "WHAT5",
            },
            WHO: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "griffpatch",
            },
          },
        },
        {
          opcode: "projectgrab",
          blockType: Scratch.BlockType.REPORTER,
          text: Scratch.translate("grab [WHAT] count of project id [WHO]"),
          arguments: {
            WHAT: {
              type: Scratch.ArgumentType.STRING,
              menu: "WHAT3",
            },
            WHO: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "60917032",
            },
          },
        },
        // Other blocks...
      ];
    }

    // Define menus
    defineMenus() {
      return {
        WHAT: {
          acceptReporters: true,
          items: [
            {
              text: Scratch.translate("follower"),
              value: "follower",
            },
            // Other items...
          ],
        },
        // Other menus...
      };
    }

    // Fetch user data
    async usergrab(args) {
      const jsonData = await fetchData(`https://scratchdb.lefty.one/v3/user/info/${args.WHO}`);
      switch (args.WHAT) {
        case "follower":
          return jsonData.statistics.followers ?? "";
        case "following":
          return jsonData.statistics.following ?? "";
        default:
          return "";
      }
    }

    // Fetch project data
    async projectgrab(args) {
      const jsonData = await fetchData(`https://trampoline.turbowarp.org/api/projects/${args.WHO}`);
      switch (args.WHAT) {
        case "love":
          return jsonData.stats.loves ?? "";
        case "favorite":
          return jsonData.stats.favorites ?? "";
        case "view":
          return jsonData.stats.views ?? "";
        default:
          return "";
      }
    }

    // Fetch project name from ID
    async idtoname(args) {
      const jsonData = await fetchData(`https://trampoline.turbowarp.org/api/projects/${args.WHO}`);
      return jsonData.title ?? "";
    }

    // Fetch project owner username from ID
    async idtoowner(args) {
      const jsonData = await fetchData(`https://trampoline.turbowarp.org/api/projects/${args.WHO}`);
      return jsonData.author.username ?? "";
    }

    // Fetch global rankings for user
    async rankusergrab(args) {
      const jsonData = await fetchData(`https://scratchdb.lefty.one/v3/user/info/${args.WHO}`);
      switch (args.WHAT) {
        case "follower":
          return jsonData.statistics.ranks.followers ?? "";
        case "love":
          return jsonData.statistics.ranks.loves ?? "";
        case "favorite":
          return jsonData.statistics.ranks.favorites ?? "";
        case "view":
          return jsonData.statistics.ranks.views ?? "";
        default:
          return "";
      }
    }

    // Fetch global rankings for project
    async rankprojectgrab(args) {
      const jsonData = await fetchData(`https://scratchdb.lefty.one/v3/project/info/${args.WHO}`);
      switch (args.WHAT) {
        case "love":
          return jsonData.statistics.ranks.loves ?? "";
        case "favorite":
          return jsonData.statistics.ranks.favorites ?? "";
        case "view":
          return jsonData.statistics.ranks.views ?? "";
        default:
          return "";
      }
    }
  }

  // Register extension
  Scratch.extensions.register(new fcuresScratchPull());

})(Scratch);
