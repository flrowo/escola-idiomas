var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/test/:id', (req, res) => {
    res.send(req.query);
});

app.get('/gameSubmit', (req, res) => {
    res.send(req.query);
});

app.get('/game', (req, res) => {
    res.redirect('game.html');
});

app.get('/chat', (req, res) => {
    res.redirect('chat.html');
});

app.get('/imagens', (req, res) => {
    res.redirect('game.html');
});

var port = process.env.PORT || 3000;
app.listen(port, () => console.log("App Iniciada: http://localhost:" + port));