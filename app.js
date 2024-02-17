const express = require('express');
const ejs = require('ejs');
//const nunjucks = require('nunjucks');
//const exphbs = require('express-handlebars');
const app = express();
const port = 3000;

/*
nunjucks.configure('views', {
  autoescape:true,
  express:app
});*/

/*var hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');*/


app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/echo', (req, res) => {
  const msg = req.query.msg;
  ejs.renderFile(
    __dirname + '/views/echo.ejs', {msg: msg}, (err, html) => {
      if(err){
        console.error(err);
        if(msg === undefined)
          res.status(400).send('Missing required parameter(s)');
        else
          res.status(500).send('Internal Server Error');
        return;
      }
      res.send(html);
  });

  //res.render('echo.html', {msg: msg});
  //res.render('echo', {msg: msg});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
