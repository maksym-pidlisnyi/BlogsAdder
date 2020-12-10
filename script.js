"use strict";
const express = require("express");
const app = express();
const fs = require('fs');
app.listen(8080);
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.sendFile('D:\\UNI\\F&B\\hw4\\index.html');
})

app.get('/admin', function (req, res) {
    res.sendFile('D:\\UNI\\F&B\\hw4\\admin.html');
})

app.get('/posts', async function (req, res) {
    res.writeHead(200, {"Content-type": "text/plain; charset=utf8"});
    await getData('D:\\UNI\\F&B\\hw4\\data.json').then(
        value => {
            res.write(value);
        });
    res.end();
})

app.post('/addPost', urlencodedParser, async function (req, res) {
    console.log(req.body);
    let title = req.body.titleName;
    let body = req.body.bodyText;
    let post = {title: title, body: body};
    await addToEnd('D:\\UNI\\F&B\\hw4\\data.json', post).then(
        () => {
            res.redirect('/')
        });
    res.end();
})

async function addToEnd(res, data) {
    return new Promise( (resolve) => {
        fs.readFile(res, 'utf8', ((err, data1) => {
           let json = JSON.parse(data1);
           json.push(data);
           let jsonString = JSON.stringify(json);
           fs.writeFileSync(res, jsonString, 'utf8');
           resolve(true);
        }))
    });
}

async function getData(resource) {
    return new Promise((resolve) => {
        fs.readFile(resource, 'utf8', (err, jsonString) => {
            resolve(jsonString);
        })
    });
}


