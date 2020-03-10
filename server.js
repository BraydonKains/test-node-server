const http = require('http');
const PORT = 8000;

const GET = 'GET';
const POST = 'POST';

const sleep = (m) => {
	return new Promise(resolve => setTimeout(resolve, m)); 
}

http.createServer((req, res) => {
	if(req.method === 'GET' && req.url === '/') {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('you found me!');
		res.end();
	} 
	if(req.method === 'POST' && req.url === '/timeout') {
		sleep(3000).then(() => {
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.write('Boom, you lookin for this?');
			res.end();
		})
	}
}).listen(PORT, () => {
	console.log(`listening on ${PORT}`);
});
