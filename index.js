const express = require('express')
const cookieSession = require('cookie-session')
const nodemailer = require("nodemailer");
const app = express()
const port = 8080

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

const mongoRepository = require('./repository/mongo-repository')

app.listen(port, () => {
    console.log(`sistema rodando na porta ${port}`)
})

// metodos GET
app.get('/', (req, res) => {
  mongoRepository.getCars().then((carros) => {
    res.render('home', {dbcar: carros})
  })
})

app.get('/signup', (req, res) => {
    res.render('signup')
})


app.get('/signin', (req, res) => {
  res.render('signin', { erro: 10});
});

//  - Coockies
app.use(cookieSession({
  name: 'cookieCarsCenter',
  secret: 'hfaj30s2435adj32d8s',
  maxAge: 5 * 60 * 1000
}))

app.get('/loja', (req, res) => {
  mongoRepository.getCars().then((carros) => {
    res.render('loja', {dbcar: carros})
  })
});

app.get('/loja/alugar', (req, res) => {
  res.render('alugar');
});

app.get('/admin', (req, res) => {
  res.render('admin', {erro: ''});
});

app.get('/loja/aluguel', (req, res) => {
  res.render('aluguel');
});

app.get('/admin/loja', (req, res) => {
  mongoRepository.getCars().then((carros) => {
    res.render('loja', {dbcar: carros})
  })
});


// metodos POST
app.post('/signin', async(req, res) => {
  const { email, senha } = req.body

  const user = await mongoRepository.getUser(email, senha)
  
  if (user) {
      user.password = null;
      req.session.user = user;

      return res.redirect('loja')
  }
  
  return res.render('signin', { erro : 20});
})

app.post('/admin/signin', async(req, res) => {
  const { email, senha } = req.body

  const user = await mongoRepository.getUser(email, senha)
  console.log(user);
  if (user.isadmin == '1') {
      user.password = null;
      req.session.user = user;

      return res.render('/admin/loja')
  }
  else {
    return res.render('admin');
  }
})

app.post('/user/signUp', async(req, res) => { 
  let newClient = req.body
  console.log(newClient)
  if(req.body.senha == req.body.confirmSenha){
    newClient.senha = req.body.senha
  }
  
  let newAux = {
    nome: newClient.nome,
    dataNasc: newClient.dataNasc,
    genero:newClient.genero,
    telefone:newClient.telefone,
    email: newClient.email,
    senha: newClient.senha
  }
  
  mongoRepository.saveUser(newAux).then((insertedUser) => {
    res.redirect('/')
  })
});

app.post('/car/new', async(req, res) => {
  let carro = req.body


  // envio de emial via SMTP
  // transporter 
  // https://programandosolucoes.dev.br/2020/10/27/enviar-email-com-nodemailer/#:~:text=O%20Nodemailer%20%C3%A9%20uma%20biblioteca,entre%20outras%20milhares%20de%20possibilidades. 
  
  console.log('antes do sendMail')
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "104cb14ddc1e1f",
      pass: "f25189324c2fe8"
    }
  });

  console.log('antes do sendMail')
  // configuracao do email
  let message = transport.sendMail({
    from: '"Cars Center Mail" <carcenterCliente@carcenter.com>',
    to: "newClient.email", 
    subject: "Confirmação de cração de email",
    text: "Estamos passando para confirmar a cricao de um usuario no nosso sistema.",
    html: "<p>Essa é uma mensagem automatica, não responda.</p>"
  })

  mongoRepository.saveCar(carro).then((result) => {
    res.render('home', {dbcar: result})
  })
})