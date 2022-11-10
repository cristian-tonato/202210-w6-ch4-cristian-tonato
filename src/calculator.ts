import http from 'http';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import url from 'url';

dotenv.config();

const port = process.env.PORT || 3000;
const server = http.createServer((request, response) => {
    const queryObject = url.parse(request.url as string, true).query;

    const add = Number(queryObject.a) + Number(queryObject.b);
    const subt = Number(queryObject.a) - Number(queryObject.b);
    const mult = Number(queryObject.a) * Number(queryObject.b);
    const div = Number(queryObject.a) / Number(queryObject.b);

    response.writeHead(200, { 'Context-Type': 'text/html' });
    if (url.parse(request.url as string, true).pathname !== '/calculator.js') {
        return response.end('<h1>Error:404</h1>');
    } else if (!queryObject.a || !queryObject.b) {
        response.end('<p>numbers are not detected</p>');
    } else {
        response.write(`<p>${queryObject.a}+${queryObject.b}=${add}</p>`);
        response.write(`<p>${queryObject.a}-${queryObject.b}=${subt}</p>`);
        response.write(`<p>${queryObject.a}*${queryObject.b}=${mult}</p>`);
        response.write(`<p>${queryObject.a}/${queryObject.b}=${div}</p>`);
    }
});

server.listen(port);

//http://localhost:3000/calculator?a=6&b=3
