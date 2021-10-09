// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 載入 URL model
const URLModel = require('../../models/webAddress') 
const baseURL = `http://localhost:3000/`

// load generateShortURL method
const generateShortURL = require('../../generate_short_URL')

// 設定首頁路由
router.get('/', (req, res) => {
    res.render('index')
})

router.post('/short', (req, res) => {
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

router.get('/:shortURL', (req, res) => {
    URLModel.findOne({ shorten_URL: req.params.shortURL}, function (err, URL) {
        if (err)
            console.log(err)
        else
            return res.redirect(`${URL.compeleted_URL}`)
    })
})

// 匯出路由器
module.exports = router