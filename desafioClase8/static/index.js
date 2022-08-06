const express = require('express');
const app = express();

app.use('/static', express.static(__dirname + 'public')); //path absoluto 

app.listen(8080);