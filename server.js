let http = require('http');

const PORT = 8000;

const sleepy_time = async () => {
	await sleep(3000);
}

http.createServer((req, res) => {
	if(req.method === 'GET' && req.url === '/') {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('you found me!');
		res.end();
	} 
	if(req.method === 'POST' && req.url === '/timeout') {
		sleepy_time();
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end();
	}
	res.writeHead(404, {'Content-Type': 'text/html'});
	res.write("Not a thing I've made yet");
	res.end();
}).listen(PORT, () => {
	console.log(`listening on ${PORT}`);
});
