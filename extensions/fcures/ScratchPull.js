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

  async function fetchData(url) {
    try {
      const response = await Scratch.fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

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

    defineBlocks() {
        {
          opcode: "userPull",
          blockType: Scratch.BlockType.REPORTER,
          text: Scratch.translate("[WHAT] of user [WHO]"),
          arguments: {
            WHAT: { type: Scratch.ArgumentType.STRING, menu: "WHAT5" },
            WHO: { type: Scratch.ArgumentType.STRING, defaultValue: "griffpatch" },
          },
        },
        {
          opcode: "projectgrab",
          blockType: Scratch.BlockType.REPORTER,
          text: Scratch.translate("grab [WHAT] count of project id [WHO]"),
          arguments: {
            WHAT: { type: Scratch.ArgumentType.STRING, menu: "WHAT3" },
            WHO: { type: Scratch.ArgumentType.STRING, defaultValue: "60917032" },
          },
        },
      ];
    }

    defineMenus() {
        WHAT5: { acceptReporters: true, items: [{ text: Scratch.translate("follower"), value: "follower" }] },
    }

    async usergrab(args) {
      const jsonData = await fetchData(`https://example.com/api/user/info/${args.WHO}`);
      switch (args.WHAT) {
        case "follower": return jsonData.statistics.followers ?? "";
        case "following": return jsonData.statistics.following ?? "";
        default: return "";
      }
    }

    async projectgrab(args) {
      const jsonData = await fetchData(`https://example.com/api/projects/${args.WHO}`);
      switch (args.WHAT) {
        case "love": return jsonData.stats.loves ?? "";
        case "favorite": return jsonData.stats.favorites ?? "";
        case "view": return jsonData.stats.views ?? "";
        default: return "";
      }
    }
  }

  Scratch.extensions.register(new fcuresScratchPull());

})(Scratch);
