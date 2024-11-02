const model= require('../model/quote')
const Quote = model.Quote
const ejs = require('ejs')
const path = require('path')

//View for Add Quotes
exports.getAddform = async(req,res) =>{
ejs.renderFile(path.resolve(__dirname,'../pages/addQuote.ejs'),function(err,str){
    res.send(str)
})
}


//View for Read All Quotes
exports.getAllQuotesSSR = async (req,res)=>{
    try {
        const quotes = await Quote.find();
        ejs.renderFile(path.resolve(__dirname,'../pages/quotes.ejs'),
        {quotes},
        function(err,str){
            if(err) {
                console.log("Error rendering EJS File:",err);
                return res.status(500).send("Server error while rendering page")
            }   
            res.send(str)
    
        }
        );
        
    } catch (error) {
            console.log("Error Fetching quotes:",error);
            res.status(500).send("Server Error")
    }
    

};



//Create
exports.createQuote = (req,res) =>{
    const quote = new Quote(req.body)

    quote.save()
    .then((doc)=>{
        console.log({doc})
        res.status(201)
        res.redirect('/quotes/ssr')
    }).catch((err)=>{
        console.log({err})
        res.status(500).json({errr:err})
    })
}

//Read 
exports.getAllQuotes = async (req,res)=>{
    console.log("getAllQuotes chala");
    const quotes = await Quote.find({})
    res.json(quotes)
}


//Delete
exports.deleteQuote = async (req,res)=>{
    const id = req.params.id
    try {
        const quote = await Quote.findOneAndDelete({_id:id})
        res.status(201).json(quote)
        
    } catch (error) {
        res.status(400).json(error)
    }

}