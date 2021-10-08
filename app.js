// 載入 express 並建構應用程式伺服器
const express = require('express')
// 引用 body-parser
const bodyParser = require('body-parser')
//express-handlebars
const exphbs = require('express-handlebars')
// load generateShortURL method
const generateShortURL = require('./generate_short_URL')
//mongoose
require('./config/mongoose')

const app = express()

const URLModel = require('./models/webAddress') // 載入 URL model

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

const baseURL = `http://localhost:3000/`

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/short', (req, res) => {
    const completed_URL = req.body.URL
    URLModel.findOne({ compeleted_URL: completed_URL }, function (err, URL) {
        if(!URL){
            const shortURL = generateShortURL(completed_URL)
            URLModel.create({
                compeleted_URL: completed_URL, 
                shorten_URL: shortURL,
            })
            return res.render('index', { shortURL: `${baseURL}` + shortURL, completedURL: completed_URL})
        }else
            return res.render('index', { shortURL: `${baseURL}` + URL.shorten_URL, completedURL: completed_URL})
    })
})

app.get('/:shortURL', (req, res) => {
    URLModel.findOne({ shorten_URL: req.params.shortURL}, function (err, URL) {
        if (err)
            console.log(err)
        else
            return res.redirect(`${URL.compeleted_URL}`)
    })
})

// 設定 port 3000
app.listen(3000, () => {
    console.log('short web address is running on ' + `${baseURL}`)
})