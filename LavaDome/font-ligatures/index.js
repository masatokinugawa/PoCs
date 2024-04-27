const http = require('http');
const express = require('express');
const svg2ttf = require('svg2ttf');

const app = express();
app.get("/", function(req, res) {
  const target = req.query.target;
  const ttf = svg2ttf(`<svg>
<defs>
<font horiz-adv-x="0">
<font-face font-family="hack" units-per-em="1000" />
<glyph unicode="${escape(target)}" horiz-adv-x="99999" d="M1 0z"/>;
</font>
</defs>
</svg>`, {});
  res.header('Content-Type', 'font/ttf');
  res.header('Access-Control-Allow-Origin', '*');
  return res.send(new Buffer(ttf.buffer));
});

function escape(str) {
  return str.replace(/"/g, '&quot;');
}
const server = http.createServer(app);
server.listen(3000);