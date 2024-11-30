const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

// prettier-ignore
const search = 'class=\"author-details\"';

const singleAuthor = async () => {
  const files = await glob("**/*.html", {
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
    )?.[1];

    if (!author) {
      return;
    }

    const folderPath = path.join("sorted", author);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    // get just the final part of the file
    const fileName = file.split("/").pop();
    const newPath = path.join(folderPath, fileName);

    fs.rename(file, newPath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
};

singleAuthor();
