var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers');

/* GET users listing. */
router.get('/', function(req, res) {
  if(req.session.loggedIn){

  
let user=req.session.user;
console.log(user);

  let products_hm = [
    {
      name: "Iphone 11",
      category: "Mobile",
      Description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
      images:
        "https://imageio.forbes.com/specials-images/imageserve/6154f2bcfa303d3c7e6e35e9/Apple--iPhone--new-iPhone--new-iPhone-release--iPhone-14--iPhone-14-Pro--iPhone-13-/960x0.jpg?fit=bounds&format=jpg&width=960",
      Price: 86900,
      },
    {
      name: "Iphone 12",
      category: "Mobile",
      Description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
      images:
        "https://images.unsplash.com/photo-1526045612212-70caf35c14df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        Price: 90900,
      },
    {
      name: "Iphone 13",
      category: "Mobile",
      Description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
      images:
        "https://images.unsplash.com/photo-1513595207829-9f414c0665f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        Price: 86900,
      },
    {
      name: "Iphone 14",
      category: "Mobile",
      Description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
      images:
        "https://images.unsplash.com/photo-1514417034809-c7b296354f07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
        Price: 86900,
      },
    {
      name: "Iphone 13 256 GB",
      category: "Mobile",
      Description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
      images:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        Price: 86900,
      },
    {
      name: "Iphone 12 256 GB ",
      category: "Mobile",
      Description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
      images:
        "https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        Price: 96900,
      },
    {
      name: "Iphone 11 128 GB",
      category: "Mobile",
      Description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
      images:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        Price: 76900,
      },
    {
      name: "Iphone X 64 GB",
      category: "Mobile",
      Description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
      images:
        "https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        Price: 66900,
      },
  ];

 //res.render('homepage',{products_hm});

//user page data showing as list -data tacking from database

productHelper.getAllProducts().then((products)=>{
  //console.log(products);
  res.render('homepage',{products,products_hm,user})
}) 


  }else{
    res.redirect('/')
  }


});

module.exports = router;
