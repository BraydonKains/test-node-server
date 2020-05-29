const http = require('http');
const fs = require('fs');
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
	if(req.method === 'POST' && req.url === '/') {
		let ip = req.headers['x-forwarded-for'] || 
			     req.connection.remoteAddress || 
			     req.socket.remoteAddress ||
			     (req.connection.socket ? req.connection.socket.remoteAddress : null);
		let message = `Request made from ${ip}\n`;
		console.log(message);
		fs.appendFile('log.txt', message, (err) => console.log(err));	
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write('Boom, you lookin for this?');
		res.end();
	}
}).listen(PORT, () => {
	console.log(`listening on ${PORT}`);
});
