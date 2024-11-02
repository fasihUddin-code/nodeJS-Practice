//const fetch = require("node-fetch");
//import fetch from 'node-fetch';
require('dotenv').config()

const express = require("express");
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors') 
const path = require('path')
const server = express();
const productRouter = require('./routes/products')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
const quoteRouter = require('./routes/quote')

console.log('env',process.env.DB_PASSWORD);
//db connection
main().catch(err => console.log(err));

async function main() {
 await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
 //await mongoose.connect('mongodb://127.0.0.1:27017/todolist')
// await mongoose.connect('mongodb://127.0.0.1:27017/user')
  console.log("Database connected")
}

//schema



//bodyParser
server.use(cors())
server.use(express.json());
server.use(express.urlencoded());
server.use(morgan('default'))
server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)))
server.use('/products',productRouter.router)
server.use('/users',userRouter.router)
server.use('/tasks',taskRouter.router)
server.use('/quotes',quoteRouter.router)
server.use('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'build','index.html'))
})


//server.use('/users',)

// async function fetchData(url) {
//   try {
//     const response = await fetch(url);
//     const Data = await response.json();
//     return Data;
//   } catch (error) {
//     console.error("Error fetching data", error);
//   }
// }

// url = "https://dummyjson.com/quotes";
// (async () => {
//   const Data = await fetchData(url);
//   //console.log(Data);

//   //Ensure Data is not null and has quotes property
//   if (Data && Data.quotes) {
//     const quotesData = Data.quotes;

//     //C R U D
//     //quotes Data API's
//     //Create API
//     server.post("/quotes", (req, res) => {
//       //  Push the new quote into the quoesData array
//       quotesData.push(req.body);
//       res.status(201).json(req.body);
//     });

//     //Read Get API
//     server.get("/quotes",(req,res)=>{
//         res.json(quotesData)
//     })

//     server.get("/quotes/:id",(req,res)=>{
//         const id = +req.params.id;
//         const specQuote = quotesData.find(q=>q.id===id);
//         res.json(specQuote)
//     })

//     //UPDATE PUT /quotes/:id
//     server.put('/quotes/:id',(req,res)=>{
//         const id = +req.params.id;
//         const quoteIndex = quotesData.findIndex(q=>q.id===id);
//         quotesData.splice(quoteIndex,1,{...req.body,id:id})
//         res.status(201).json()
//     })

//       //UPDATE PATCH /quotes/:id
//       server.patch('/quotes/:id',(req,res)=>{
//         const id = +req.params.id;
//         const quoteIndex = quotesData.findIndex(q=>q.id===id);
//         const specQuote = quotesData[quoteIndex]
//         quotesData.splice(quoteIndex,1,{...specQuote,...req.body})
//         res.status(201).json()
//     })
    
//     //DELETE delete /quotes/:id
//     server.delete('/quotes/:id',(req,res)=>{
//         const id = +req.params.id;
//         const quoteIndex = quotesData.findIndex(q=>q.id===id);
//         const specQuote = quotesData[quoteIndex]
//         quotesData.splice(quoteIndex,1)
//         res.status(201).json(specQuote)
//     })


//   } else{
//     console.error("Failed to fetch quotes data")
//   }
// })();

//MVC Model-View-Controller


//C R U D
//Create API

server.listen(process.env.PORT, () => {
  console.log("server started");
});
