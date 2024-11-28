// Search all files in project for "='author-details'". If the file only has one, put into a folder under the name of the contents of the proceeding anchor tag.
const fs = require("fs");
const path = require("path");
const { glob } = require("glob");
const { exec } = require("child_process");

// prettier-ignore
const search = 'class=\"author-details\"';
const searchResults = [];
const folders = [];

const test = async () => {
  const files = await glob("**/valorant-first-impressions.html", {
    ignore: ["node_modules/**", "sorted/**"],
  });

  files.forEach((file) => {
    let contents = fs.readFileSync(file, "utf8");
    if (!contents.includes(search)) {
      return;
    }

    // Get the Author's name from the contents by grabbing the contents of the anchor tag that will be in this format: <div class="author-details">by <a href="../../../../user/daniel-tack.html">Daniel Tack</a>
    const author = contents.match(
      /<div class="author-details">by <a href=".*">(.*)<\/a>/
    )[1];

    const folderPath = path.join("sorted", author);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    const newPath = path.join("public", folder, file);

    fs.rename(file, newPath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
};

test();
