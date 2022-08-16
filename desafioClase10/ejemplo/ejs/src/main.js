const express = require('express');
const app = express();

app.set('views', '../views');
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    const pets = [
        {name: "pepito", raza: "perro", edad: 7},
        {name: "pepe", raza: "gato", edad: 17},
        {name: "pepon", raza: "loro", edad: 2}
    ];
    const tangline = 'ningun mefe es muy mefardo'

    res.render('pages/index', {
        pets, 
        tangline
    })
});
app.get('/about', (req, res) => {
    res.render('pages/about');
})

app.listen(8080);
