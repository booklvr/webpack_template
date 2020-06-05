import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.dev.config.js';

const   app = express(),
        DIST_DIR = __dirname,
        HTML_FILE = path.join(DIST_DIR, 'index.ejs'),
        compiler = webpack(config);
        console.log(HTML_FILE);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('index.ejs', {msg: 'hello from index.ejs'});
})


app.get('*', (req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
        if (err) {
            return next(err)
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    })
})

// app.get('/test', (req, res) => {
//     res.render('test', {msg: 'hello from test'})
// })

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listenning to ${PORT}....`)
    console.log('Press Ctr + C to quit.')
})


