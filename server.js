const express=require('express');
var app= express();
const hbs= require('hbs');
const fs= require('fs');
const port= process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
})

app.use((req, res, next)=>{
  res.render('maintenance.hbs');
})
app.use(express.static(__dirname+ '/public'));

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log= `${now}, ${req.ip}, ${req.protocol}, ${req.path}`;
  fs.appendFile('server.log', log + '\n' , (err)=>{
    if(err){
      console.log('Coudnt append!');
    }
  })
  next();
});


// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
// })

app.get('/', (req, res)=>{
  res.render('home.hbs', {
    pageTitle : 'Home page',
    welcomeMessage : 'Hey hey hey, Look who we have here. We have been waiting for you for quite a while now!'
  });
});

app.get('/about', (req, res)=>{
  res.render('about.hbs',{
    pageTitle: 'About page',

  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errormessage: 'Sorry, unable to handle request!'
  });
});



app.listen(port, ()=>{
  console.log(`Server initialised at port ${port}`);
});
