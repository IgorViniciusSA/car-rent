const express = require('express')
const app = express()
const port = 8080

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })  

app.get('/', (req, res) => {
    res.render('home');
  });
  