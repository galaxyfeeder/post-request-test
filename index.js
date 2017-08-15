const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let requests = [];

app.get('/', (req, res) => {
  res.render('index', {requests: requests});
});

app.get('/clean', (req, res) => {
  requests = [];
  res.sendStatus(200);
});

app.post('/', (req, res) => {
  let date = new Date();
  requests.push({
    timestamp: date.toString(),
    body: JSON.stringify(req.body)
  });
  res.sendStatus(201);
});

app.listen(process.env.PORT, function () {
  console.log('Server listening on port '+process.env.PORT);
});
