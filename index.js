var express = require('express');
var app = express();
var fs = require('fs');
app.use(express.static(__dirname + '/public'));


var objeto = { "images": [ { "classifiers": [ { "classifier_id": "default", "name": "default", "classes": [ { "class": "sushi", "score": 0.999, "type_hierarchy": "/food/nutrition/dish/sushi" }, { "class": "dish", "score": 0.999 }, { "class": "nutrition", "score": 0.999 }, { "class": "food", "score": 0.999 }, { "class": "reddish orange color", "score": 0.998 } ] } ], "image": "0.jpg" } ], "images_processed": 1, "custom_classes": 0 };


app.get('/test', (req, res) => {
    res.send(objeto);
});

app.get('/gameSubmit/:img', (req, res) => {
    var VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
    const imagem_API_KEY = require('./API_KEYs').imagem_API_KEY;

	var visualRecognition = new VisualRecognitionV3({
        url: 'https://gateway.watsonplatform.net/visual-recognition/api',
        version: '2018-03-19',
        iam_apikey: imagem_API_KEY,
    });

    var params = { images_file: fs.createReadStream("public/imagens/"+req.params.img+".jpg") };
    visualRecognition.classify(params)
    .then(result => {
        res.send(JSON.stringify(result.images[0].classifiers[0].classes[0].class));
    })
    .catch(err => {
        console.log(err);
    });
    
});

app.get('/traduzir/:texto', (req, res) => {
    var texto = req.params.texto;

    const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
    const tradutor_API_KEY = require('./API_KEYs').tradutor_API_KEY;
    const languageTranslator = new LanguageTranslatorV3({
    iam_apikey: tradutor_API_KEY,
    url: 'https://gateway.watsonplatform.net/language-translator/api/',
    version: '2018-08-07',
    });

    languageTranslator.translate({
        text: texto,
        source: 'en',
        target: 'pt'
    })
    .then(translation => {
        console.log("translation.translations[0].translation: "+translation.translations[0].translation + '; texto:'+texto);
        var retorno = false;
        if(translation.translations[0].translation == "text"){
            retorno = true;
        }
        res.send('retorno: '+retorno)
    })
    .catch(err => {
    console.log('error:', err);
    });
});

app.get('/qtdImg', (req, res) => {
    fs.readdir('public/imagens', (err, files) => {
        res.send(JSON.stringify(files.length));
    });
});

app.get('/ajuda/:imgid', (req, res) => {
    
    var VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
    const imagem_API_KEY = require('./API_KEYs').imagem_API_KEY;

	var visualRecognition = new VisualRecognitionV3({
        url: 'https://gateway.watsonplatform.net/visual-recognition/api',
        version: '2018-03-19',
        iam_apikey: imagem_API_KEY,
    });

    var params = { images_file: fs.createReadStream("public/imagens/"+req.params.imgid+".jpg") };
    visualRecognition.classify(params)
    .then(result => {
        const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
        const tradutor_API_KEY = require('./API_KEYs').tradutor_API_KEY;
        const languageTranslator = new LanguageTranslatorV3({
        iam_apikey: tradutor_API_KEY,
        url: 'https://gateway.watsonplatform.net/language-translator/api/',
        version: '2018-08-07',
        });
        var tempstring = result.images[0].classifiers[0].classes[0].class;

        languageTranslator.translate({
            text: tempstring,
            source: 'en',
            target: 'pt'
        })
        .then(translation => {
            res.send(JSON.stringify(translation.translations[0].translation));
        })
        .catch(err => {
        console.log('error in translator: ', err);
        });
    })
    .catch(err => {
        console.log('error in visual recognition: '+err);
    });


    
});

var port = process.env.PORT || 3000;
app.listen(port, () => console.log("App Iniciada: http://localhost:" + port));