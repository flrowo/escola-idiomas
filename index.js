var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.get('/game', function (req, res) {
    res.send('public/game.html');
});
app.get('/chat', function (req, res) {
    res.send('public/chat.html');
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("App Iniciada: http://localhost:" + port);
});