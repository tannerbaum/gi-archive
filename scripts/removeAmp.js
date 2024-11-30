const fs = require("fs");
const { glob } = require("glob");

const removeAmp = async () => {
  // find all files thats name end with "﹖amp.html" and delete them
  const files = await glob("**/*﹖amp.html", {
    ignore: ["node_modules/**"],
  });

  files.forEach((file) => {
    fs.unlink(file, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
};

removeAmp();
