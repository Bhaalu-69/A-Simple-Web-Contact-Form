const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
