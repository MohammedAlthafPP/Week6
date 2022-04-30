var express = require('express');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
const { response } = require('../app');
var router = express.Router();
var productHelper = require('../helpers/product-helpers');


/* GET users listing. */
router.get('/', function(req, res, next) {
  //tacking product from database and displaying as table,passing databse to admin page
    productHelper.getAllProducts().then((products)=>{
      console.log(products);
      res.render('admin/view-products',{admin:true,products})
    }) 
//  let products = [
//   {
//     name: "Iphone 11",
//     category: "Mobile",
//     Description:
//       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
//     images:
//       "https://imageio.forbes.com/specials-images/imageserve/6154f2bcfa303d3c7e6e35e9/Apple--iPhone--new-iPhone--new-iPhone-release--iPhone-14--iPhone-14-Pro--iPhone-13-/960x0.jpg?fit=bounds&format=jpg&width=960",
//     Price: 86900,
//     },
//   {
//     name: "Iphone 12",
//     category: "Mobile",
//     Description:
//       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
//     images:
//       "https://images.unsplash.com/photo-1526045612212-70caf35c14df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       Price: 90900,
//     },
//   {
//     name: "Iphone 13",
//     category: "Mobile",
//     Description:
//       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
//     images:
//       "https://images.unsplash.com/photo-1513595207829-9f414c0665f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       Price: 86900,
//     },
//   {
//     name: "Iphone 14",
//     category: "Mobile",
//     Description:
//       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
//     images:
//       "https://images.unsplash.com/photo-1514417034809-c7b296354f07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
//       Price: 86900,
//     },
//   {
//     name: "Iphone 13 256 GB",
//     category: "Mobile",
//     Description:
//       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
//     images:
//       "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       Price: 86900,
//     },
//   {
//     name: "Iphone 12 256 GB ",
//     category: "Mobile",
//     Description:
//       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
//     images:
//       "https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       Price: 96900,
//     },
//   {
//     name: "Iphone 11 128 GB",
//     category: "Mobile",
//     Description:
//       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
//     images:
//       "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       Price: 76900,
//     },
//   {
//     name: "Iphone X 64 GB",
//     category: "Mobile",
//     Description:
//       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
//     images:
//       "https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       Price: 66900,
//     },
// ];

  //res.render('admin/view-products',{admin:true,products})
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
