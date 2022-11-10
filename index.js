
const cookieSession = require('cookie-session')
const express = require('express')
const app = express()
const port = 8080

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

// Middlewares
//  - Coockies
app.use(cookieSession({
  name: 'cookieName',
  keys: [
    'cookieKey'
  ],
  httpOnly: true,
  maxAge: 60 * 1000 // 1 minute
}))

app.use((req, res, next) => {
  if(req.path == '/'){
    if(req.session.user)
      res.redirect('/home')
    else next()
  } else next()
});






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })  

app.get('/', (req, res) => {
    res.render('home', {dbcar:dbcar});
  });

app.get('/signup', (req, res) => {
    res.render('signup')
});
app.post('/user/signUp', (req, res) => {
  let newCient = req.body
  
  newClient.nome = req.body.nome
  newClient.dataNasc = req.body.dataNasc
  newClient.genero = req.body.genero
  newClient.telefone = req.body.telefone
  newClient.email = req.body.email

  if(req.body.senha == confirmSenha){
    newClient.senha = req.body.senha
  }

  console.log(newClient)

  mongoRepository.saveProd(req.body).then((insertedProd) => {
    console.log('Inserted Product')
    console.log(insertedProd)
    res.redirect('/prod/list')
  })
});

app.get('/signin', (req, res) => {
  res.render('signin');
});

app.get('/loja', (req, res) => {
    res.render('loja');
});

app.get('/loja/alugar', (req, res) => {
  res.render('alugar');
});

app.get('/admin', (req, res) => {
  res.render('admin');
});

app.get('/loja/aluguel', (req, res) => {
  res.render('aluguel');
});