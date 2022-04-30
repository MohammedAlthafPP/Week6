var express = require('express');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
const { response } = require('../app');
var router = express.Router();
var productHelper = require('../helpers/product-helpers');


/* GET users listing. */
router.get('/', function(req, res, next) {
 
if( req.session.adminloggedIn){

var admin= req.session.admin

  //tacking product from database and displaying as table,passing databse to admin page
    productHelper.getAllProducts().then((products)=>{
      console.log(products);
      res.header('Cache-control','no-cache,private, no-store, must-revalidate,max-stale=0,post-check=0,pre-check=0');
      res.render('admin/view-products',{admin,products})
    
    }) 
  } else{
    res.redirect('/')
  }
});

router.get('/add-product',function(req,res){
  res.render('admin/add-product')
});

router.post('/add-product',(req,res)=>{
//console.log(req.body);

productHelper.addProduct(req.body,(result)=>{
  //console.log(req.body);
  res.render('admin/add-product')  
  
})

})

//delete product button setting
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIDDDDDDDDDDDDDDDDDDDD"+proId);
productHelper.deleteProducts(proId).then((response)=>{
  res.redirect('/admin')
})
})

//edit product button setting
router.get('/edit-product/:id',async(req,res)=>{
  let product=await productHelper.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product',{product})
})

router.post('/edit-product/:id',(req,res)=>{
  console.log(req.params.id);

  productHelper.updateproduct(req.params.id,req.body).then(()=>{

    res.redirect('/admin')
  })
})


router.get('/user-Details',(req,res)=>{
  res.render('admin/users-details')
})



module.exports = router;
