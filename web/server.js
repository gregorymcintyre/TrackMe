//express module and initialise a new instance
const express = require('express');
const app = express();

//port for the web server to listen to and a base url
const port = 3000;
const base = `${__dirname}/public`;

//middleware to server static files
app.use(express.static('public'));

//route middleware for the root URI path
app.get('/', (req, res) => {
	res.send('hello world');
});

//start the web server and listen to requests on the specified port
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});