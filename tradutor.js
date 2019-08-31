function traduzir(texto, lngSource, lngTarget){
    const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
    const API_KEYs = require('API_KEYs.js');
    const languageTranslator = new LanguageTranslatorV3({
    iam_apikey: API_KEYs.tradutor_API_KEY,
    url: 'https://gateway.watsonplatform.net/language-translator/api/',
    version: '2018-08-07',
    });

    languageTranslator.translate({
    text: texto,
    source: lngSource,
    target: lngTarget
    })
    .then(translation => {
    console.log(translation.translations[0].translation);
    })
    .catch(err => {
    console.log('error:', err);
    });
}