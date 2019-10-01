var express = require('express');
var app = express();
var fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

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

app.post('/mandarmsg', (req, res) => {
    var input = req.body.msg;
    var contexto = (req.body.idconversa == 1 ? "" : req.body.idconversa);
    const watson = require('./API_KEYs').watson;

    var AssistantV1 = require('ibm-watson/assistant/v1');
    var assistant = new AssistantV1({
        iam_apikey: watson.API_KEY,
        url: 'https://gateway.watsonplatform.net/assistant/api/',
        version: '2018-09-19'
    });
    assistant.message( {
        input: { text: input },
        assistant_id: watson.assistant_id,
        workspace_id: watson.workspace_id,
        context: { conversation_id: contexto }
    })
    .then(result => {
        res.json(result, null, 2);
    })
    .catch(err => {
        console.log(err);
    });

});


var port = process.env.PORT || 3000;
app.listen(port, () => console.log("App Iniciada: http://localhost:" + port));