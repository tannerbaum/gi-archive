const fs = require("fs");
const { glob } = require("glob");
const cheerio = require("cheerio");

const contentOnly = async () => {
  const files = await glob("**/*.html", {
    ignore: ["node_modules/**"],
  });

  files.forEach((file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const $ = cheerio.load(data);
      const title = $("h1").text();
      const subtitle = $(".subtitle").text();

      $(".inline-image-gallery-source-content").remove();
      $("style").remove();

      let content = $(".ds-main").text();
      content = content.replace(/\t+/g, "");

      // Trying to reduce large newline sequences
      content = content.replace(/\n(\s*\n)+/g, "\n\n");

      //  Some crazy \n\t\t\t\t\n sequences are in there
      //   content = content.replace(/\n(\n|\t)+/g, "\n");

      // replace file with title, subtitle, and content as a .txt file
      fs.writeFile(
        file.replace(".html", ".txt"),
        `${title}\n\n${subtitle}\n\n${content}`,
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
        }
      );

      // remove the original file
      fs.unlink(file, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });
  });
};

contentOnly();
