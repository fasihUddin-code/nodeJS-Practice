const express = require('express')

const quoteController = require('../controller/quote')
const router = express.Router()

router
.post('/',quoteController.createQuote)
.get('/ssr',quoteController.getAllQuotesSSR)
.get('/add',quoteController.getAddform)
.get('/',quoteController.getAllQuotes)
.delete('/:id',quoteController.deleteQuote)

exports.router = router