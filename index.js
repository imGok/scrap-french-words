import got from "got";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
import fs from "fs";

let urls = ["https://www.listesdemots.net/touslesmots.htm"];

for (let i = 2; i < 919; i++) {
  urls.push("https://www.listesdemots.net/touslesmotspage" + i + ".htm");
}
var promises = [];

urls.forEach((url) => {
  (async () => {
    promises.push(
      got(url)
        .then((response) => {
          const dom = new JSDOM(response.body);

          const wordsArray = dom.window.document
            .querySelector(".mot")
            .textContent.split(" ")
            .join("\n");

          fs.appendFile("french.txt", wordsArray + "\n", (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        })
        .catch((err) => {
          console.log(err);
        })
    );
  })();
});

Promise.all(promises).then(() => {});
