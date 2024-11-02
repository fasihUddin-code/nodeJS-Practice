//const fs = require("fs");
//const { error } = require("console");
const model = require('../model/product');
const mongoose = require('mongoose');
const Product = model.Product;
const ejs = require('ejs')
const path = require('path')

//View
exports.getAllProductsSSR = async (req,res) =>{
  const products = await Product.find({})
  ejs.renderFile(path.resolve(__dirname,'../pages/index.ejs'),{products:products},function(err,str){

    res.send(str)
  });
;
}

//View
exports.getAddForm = async (req,res) =>{
  ejs.renderFile(path.resolve(__dirname,'../pages/add.ejs'),function(err,str){

    res.send(str)
  });
};


//Create
exports.createProduct = (req,res)=>{
    const product = new Product(req.body);

    product.save()
    .then((doc)=>{
      console.log({doc});
      res.status(201).json(doc)
    })
    .catch((err)=>{
      console.log({err});
      res.status(500).json({error: err})
    })

  }
  
 //Read 
exports.getAllProducts = async (req,res) =>{
    const products = await Product.find({})
    res.json(products)
  }
  
exports.getProduct = async (req,res)=>{
    const id = req.params.id;
    console.log(id);
    const product = await Product.findById(id).exec()
    res.json(product)
  }
  
exports.replaceProduct = async (req,res)=>{
  const id = req.params.id;
  try {
    const product = await Product.findOneAndReplace({_id:id},req.body,{new:true})
    console.log(product);
    res.status(201).json(product)
  } catch (error) {
    console.log(error);
    res.status(400).json(error)
  }
  }
  
exports.updateProduct = async (req,res)=>{
    const id = req.params.id;
   try {
    const product = await Product.findOneAndUpdate({_id:id},req.body,{new:true})
    res.status(201).json(product)

   } catch (error) {
    res.status(400).json(error)
   }
    
  }
  
exports.deleteProduct = async (req,res)=>{
    const id = req.params.id;
    try {
      const product = await Product.findOneAndDelete({_id:id})
      console.log(product);
      res.status(201).json(product)
    } catch (error) {
      res.status(400).json(error)
    }
  }