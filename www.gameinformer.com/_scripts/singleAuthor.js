// Search all files in project for "='author-details'". If the file only has one, put into a folder under the name of the contents of the proceeding anchor tag.
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const { exec } = require("child_process");

const search = "='author-details'";
const searchResults = [];
const folders = [];

glob(
  "**/*.html",
  { ignore: ["node_modules/**", "public/**"] },
  (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      const contents = fs.readFileSync(file, "utf8");
      if (contents.includes(search)) {
        searchResults.push(file);
      }
    });
    searchResults.forEach((result) => {
      const folder = result.split("/")[0];
      folders.push(folder);
    });
    folders.forEach((folder) => {
      const folderPath = path.join("public", folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
    });
    searchResults.forEach((result) => {
      const folder = result.split("/")[0];
      const newPath = path.join("public", folder, result);
      fs.copyFile(result, newPath, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });
    exec("git add .", (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
    exec('git commit -m "Added single author file"', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
    exec("git push", (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  }
);
