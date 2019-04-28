const app = require('./app');
const port = process.env.PORT || 5000;

const program = require('commander');
const fs = require('fs');
const https = require('https');

program
  .version('1.0.0')
  .option('-S, --https', 'Use HTTPS to serve localhost. Expects server.cert and server.key in root dir')
  .parse(process.argv);
exports.isUsingSsl = program.https;

const wrapAppWithSsl = a => exports.isUsingSsl
  ? https.createServer({
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert'),
    },
    a,
  )
  : a;

wrapAppWithSsl(app).listen(port, () => {
  console.log(`Listening on http${app.isUsingSsl ? 's' : ''}://localhost:${port}!`);
});
