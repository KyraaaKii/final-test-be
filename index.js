const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

const siswas = require('./src/routes/siswas');
const auth = require('./src/routes/auth');

// PAGES
app.get('/', (req, res) => {
  res.render('index', {})
})

// ROUTES
app.use('/siswas', siswas)
app.use('/auth', auth, (req, res) => {
  res.render('register', {})
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});