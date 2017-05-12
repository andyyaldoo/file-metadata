var express = require('express');
var app = express();
var multer  = require('multer')

app.use(express.static('static'))
var upload = multer().single('avatar')
const BASE_URL = ''

app.set('view engine', 'pug');

app.get('/', function (req, res) {
     res.render('index');
})

app.post('/get-file-size', (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(503).json(err)
        } else {
            if (req.file) {
                res.status(200).json({size: req.file.size})
            } else {
                res.status(400).json({error: "Please upload a file before submitting"})
            }
        }
    })
})

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Server listening ")
});