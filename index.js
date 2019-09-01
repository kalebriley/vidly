const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
  res.send(JSON.stringify({ hello: 'world' }));
});

app.listen(8080, () => {
  console.log(`Listening on PORT: ${8080}...`);
});
