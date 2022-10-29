const express = require('express', 'views')
const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })  

app.get('/', (req, res) => {
    res.render('home');
  });
  