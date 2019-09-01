var express = require('express');
var app = express();
var tradutor = require('./functions/tradutor');

app.use(express.static(__dirname + '/public'));

app.get('/test/:id', (req, res) => {
    res.send(req.query);
});

app.get('/gameSubmit', (req, res) => {/*
    var t = String(req.query.entrada);
    var from = 'en';
    var to = 'pt';

    var traducao = tradutor.traduzir(t, from, to);
    res.send(String(traducao));*/

    //language translator
    const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
    const tradutor_API_KEY = require('./API_KEYs').tradutor_API_KEY;
    const languageTranslator = new LanguageTranslatorV3({
    iam_apikey: tradutor_API_KEY,
    url: 'https://gateway.watsonplatform.net/language-translator/api/',
    version: '2018-08-07',
    });

    languageTranslator.translate({
        text: String(req.query.entrada),
        source: 'en',
        target: 'ja'
    })
    .then(translation => {
        res.send(translation.translations[0].translation);
    })
    .catch(err => {
    console.log('error:', err);
    });
    
    //visual recognition
    var VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
    const imagem_API_KEY = require('./API_KEYs').imagem_API_KEY;
	var fs = require('fs');

	var visualRecognition = new VisualRecognitionV3({
        url: 'https://gateway.watsonplatform.net/visual-recognition/api',
        version: '2018-03-19',
        iam_apikey: imagem_API_KEY,
	});

	var params = { images_file: fs.createReadStream("imagens/"+req.query.imgID+".png") };
	visualRecognition.classify(params)
	.then(result => {
	    console.log(JSON.stringify(result, null, 2));
	})
	.catch(err => {
	    console.log(err);
	});

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