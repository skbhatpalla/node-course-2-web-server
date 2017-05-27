const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(error) => {
        console.log('Unable to log to file server.log');
    });
    next();
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screemIt', (text) => {
    return text.toUpperCase();
});

app.get('/',(req,res) => {
    // res.send('Hello Express');
    // res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name:'Sharan',
    //     likes:['Biking','Travel']
    // });
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMsg:'Welcome Page Here'
    })
});

app.get('/about',(req,res) => {
    // res.send('About Page');
    res.render('about.hbs',{
        pageTitle:'About Page'
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage:'Unable to precess your request'
    });
});

// app.listen(3000);
app.listen(port,() => {
    console.log(`Server is up and running on port ${port}`);
});