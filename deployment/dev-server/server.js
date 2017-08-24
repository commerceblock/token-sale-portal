
// imports
import express from 'express';
import webpack from 'webpack';
import opn from 'opn';
import bodyParser from 'body-parser';

// local imports
import webpackConfig from '../webpack/webpack.dev';
import graphQLHandler from '../../backend/lib/graphql';


// default port where dev server listens for incoming traffic
const DEFAULT_APP_PORT = 3000;
const port = process.env.PORT || DEFAULT_APP_PORT;

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use((req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
});

app.use(bodyParser.json());

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
app.use('/static', express.static('./frontend/static'))

app.post('/graphql', (req, res) => {
  graphQLHandler(req.body.query, req.body.variables)
    .then(result => {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(result, null, 2));
    })
    .catch(err => res.end(err));
});

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  const uri = 'http://localhost:' + port
  console.log(`Listening at ${uri}\n`)
  opn(uri)
})
