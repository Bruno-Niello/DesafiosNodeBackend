const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    })
);

app.set('view engine', 'hbs');
app.set('views', './views');

fakeApi = () => [
    { name: 'katarina', lane: 'midlaner'},
    { name: 'jayce', lane: 'toplaner'},
    { name: 'teemo', lane: 'jungle'}
]

app.get('/', (req, res)=>{
    res.render('main', { suggestedChamps: fakeApi(), listExist: true });
});

app.listen(3002)