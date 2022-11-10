const express = require('express')
//const cookieSession = require('cookie-session')
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
/*app.use(cookieSession({
  name: 'cookieName',
  keys: ['cookieKey'],
  maxAge: 60 * 1000
}))

app.use((req, res, next) => {
  if(req.path == '/'){
    if(req.session.user)
      res.redirect('/home')
    else next()
  } else next()
});*/

const mongoRepository = require('./repository/mongo-repository')

app.listen(port, () => {
    console.log(`sistema rodando na porta ${port}`)
  })  


// metodos GET
app.get('/', (req, res) => {
  //let usuarios = mongoRepository.getUsers()
  let usuarios = {
    enderecoimg: 'https://revistacarro.com.br/wp-content/uploads/2021/04/Fiat-Toro-Ultra_1.jpg',
	  nome: 'Toro',
	  marca: 'Fiat',
	  cor: 'Vermelho',
	  preco: '160000',
	  diaria: '500',
	  status: '1',
	  datadisponivel: '',
	  datainicioaluguel: '',
	  datafinalaluguel: '',
	  proximasdatas:['','','']
  }
  console.log(usuarios)
  //res.render('signin', {dbcar : usuarios});

  res.render('home', {dbcar: usuarios})
})

app.get('/signup', (req, res) => {
    res.render('signup')
})


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


// metodos POST

app.post('/user/signUp', (req, res) => {
  let newClient = req.body
  
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