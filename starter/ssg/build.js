import { renderToStaticMarkup } from "react-dom/server";
import { createElement as h } from "react";
import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  unlinkSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";
import App from "./App.js";

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distPath = path.join(__dirname, "dist"); // This is where we want to export the finished files to

const shell = readFileSync(path.join(__dirname, "index.html"), "utf-8");

const app = renderToStaticMarkup(h(App)); // Now this is a string
const html = shell.replace("<!--ROOT-->", app);

// If directory does not exist create it if it does exist delete everything in it
if (!existsSync(distPath)) {
  mkdirSync(distPath);
} else {
  const files = readdirSync(distPath);
  for (const file of files) {
    unlinkSync(path.join(distPath, file));
  }
}

writeFileSync(path.join(distPath, "indexes.html"), html);
