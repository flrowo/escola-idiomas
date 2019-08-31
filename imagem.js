function reconhecerImagem(caminho){
	var VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
	const API_KEYs = require('API_KEYs');
	var fs = require('fs');

	var visualRecognition = new VisualRecognitionV3({
	url: 'https://gateway.watsonplatform.net/visual-recognition/api',
	version: '2018-03-19',
	iam_apikey: API_KEYs.imagem_API_KEY,
	});

	var params = { images_file: fs.createReadStream(caminho) };
	visualRecognition.classify(params)
	.then(result => {
	console.log(JSON.stringify(result, null, 2));
	})
	.catch(err => {
	console.log(err);
	});
}