var express = require('express');
var app = express();
var tradutor = require('./functions/tradutor');
var fs = require('fs');
app.use(express.static(__dirname + '/public'));


var objeto = { "images": [ { "classifiers": [ { "classifier_id": "default", "name": "default", "classes": [ { "class": "sushi", "score": 0.999, "type_hierarchy": "/food/nutrition/dish/sushi" }, { "class": "dish", "score": 0.999 }, { "class": "nutrition", "score": 0.999 }, { "class": "food", "score": 0.999 }, { "class": "reddish orange color", "score": 0.998 } ] } ], "image": "0.jpg" } ], "images_processed": 1, "custom_classes": 0 };


app.get('/test/:id', (req, res) => {
    res.send(req.query);
});

app.get('/gameSubmit', (req, res) => {/*
    var t = String(req.query.entrada);
    var from = 'en';
    var to = 'pt';

    var traducao = tradutor.traduzir(t, from, to);
    res.send(String(traducao));*/
/*
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
        res.send(translation.translations[0].translation + " || " + JSON.stringify(objeto.images[0].classifiers[0].classes[0].class));
    })
    .catch(err => {
    console.log('error:', err);
    });
    */
    //visual recognition
    var VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
    const imagem_API_KEY = require('./API_KEYs').imagem_API_KEY;

	var visualRecognition = new VisualRecognitionV3({
        url: 'https://gateway.watsonplatform.net/visual-recognition/api',
        version: '2018-03-19',
        iam_apikey: imagem_API_KEY,
    });

    var params = { images_file: fs.createReadStream("public/imagens/"+req.query.imgID+".jpg") };
    visualRecognition.classify(params)
    .then(result => {
        res.send(JSON.stringify(result.images[0].classifiers[0].classes[0].class));
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