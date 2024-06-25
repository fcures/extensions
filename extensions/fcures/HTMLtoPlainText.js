// Name: HTMLtoPlainText
// ID: fcuresHTMLtoPlainText
// Description: Allows you to use convert html text to plain text for ease of use.
// By: fcures <https://scratch.mit.edu/users/fcures> (Main account is sev18 <https://scratch.mit.edu/users/sev18>)
// License: MIT

(function (Scratch) {
  'use strict'

  // Add icon and menuIcon later?
  // const icon = 
  // const menuIconURI =

  // Use if needed for unpackaged extentions
  // const requireNonPackagedRuntime = (blockName) => {
  //   if (Scratch.vm.runtime.isPackaged) {
  //     alert(
  //       `To use the ${blockName} block, the creator of the packaged project must uncheck "Remove raw asset data after loading to save RAM" under advanced settings in the packager.`
  //     );
  //     return false;
  //   }
  //   return true;
  // };

  class HTMLtoPlainText {
    getInfo() {
      return {
        id: "fcuresHTMLtoPlainText",
        name: Scratch.translate("HTMLtoPlainText"),
        color1: "#9966FF",
        color2: "#855CD6",
        color3: "#774DCB",
        // menuIconURI: menuIconURI,
        blocks: [
          {
            opcode: "ParseHTMLtoPlainText",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("HTML to Plain Text [textToParse]"),
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
        ],
        ParseHTMLtoPlainText({textToParse}) {
          
        } 
      }


   Scratch.extensions.register(new HTMLtoPlainText())
})(Scratch)
