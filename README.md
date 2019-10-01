# escola-idiomas
college cloud computing homework, node.js with express application using image recognition, translator, and watson assistant from ibm cloud services
disclaimer: some variables and text in portuguese...

log
it isn't working now (31/08)
now it is working (1/10)

you need to create the file API_KEYs.js with your api keys like this:

1 exports.imagem_API_KEY = "<YOUR_API_KEY>";
2 exports.tradutor_API_KEY = "<YOUR_API_KEY>";
3 exports.watson = {
4     "API_KEY": "<YOUR_API_KEY>",
5     "workspace_id": "<YOUR_API_KEY>",
6     "assistant_id": "<YOUR_API_KEY>",
7 };
8 

and add bodyParser if there is an error about 'middleware no longer bundled with Express'