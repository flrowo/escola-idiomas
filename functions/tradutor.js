exports.traduzir = function(texto, lngSource, lngTarget, callback){
    const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
    const tradutor_API_KEY = require('../API_KEYs').tradutor_API_KEY;
    const languageTranslator = new LanguageTranslatorV3({
    iam_apikey: tradutor_API_KEY,
    url: 'https://gateway.watsonplatform.net/language-translator/api/',
    version: '2018-08-07',
    });

    languageTranslator.translate({
        text: texto,
        source: lngSource,
        target: lngTarget
    })
    .then(translation => {
        callback(translation.translations[0].translation);
    })
    .catch(err => {
    console.log('error:', err);
    });
}