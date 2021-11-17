import path from "path";
import cors from "cors";
import fs from "fs";

import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { ChunkExtractor } from "@loadable/server";
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheet } from "styled-components";

import App from "../src/App";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());

app.use(express.static(path.resolve("build/web")));

const webStats = path.resolve("build/web/loadable-stats.json");

app.get("/", async (req, res) => {
  const componentData = {
    meta: {
      type: "homepage",
    },
    title: "Home",
    blocks: [
      { type: "text1", data: "some data for text1" },
      { type: "text2", data: "some data for text2" },
      { type: "text3", data: "some data for text3" },
      { type: "text2", data: "some data for text2" },
      { type: "text1", data: "some data for text1" },
    ],
  };

  let indexHTML = fs.readFileSync(path.resolve("./build/web/template.html"), {
    encoding: "utf8",
  });

  const webExtractor = new ChunkExtractor({
    statsFile: webStats,
  });

  const sheet = new ServerStyleSheet();

  const jsx = webExtractor.collectChunks(
    <StaticRouter context={componentData} location={req.url}>
      <App serverData={componentData} />
    </StaticRouter>
  );

  const scriptTags = webExtractor.getScriptTags();
  const linkTags = webExtractor.getLinkTags();
  const styleTags = webExtractor.getStyleTags();

  const appHtml = ReactDOMServer.renderToString(sheet.collectStyles(jsx));
  const styledStyleTags = sheet.getStyleTags();

  indexHTML = indexHTML.replace(
    "{{initial_data}}",
    `<script>var initial_data = ${JSON.stringify(componentData)};</script>`
  );

  res.set("content-type", "text/html");

  indexHTML = indexHTML.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  indexHTML = indexHTML.replace(
    "{{HEAD}}",
    `${linkTags}
    ${styleTags}
    ${styledStyleTags}`
  );

  indexHTML = indexHTML.replace("{{SCRIPT}}", `${scriptTags}`);

  res.send(indexHTML);
});

app.use(express.static("./build"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
