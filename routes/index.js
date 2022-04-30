var express = require('express');
const res = require('express/lib/response');
const { response } = require('../app');
var router = express.Router();
const userHelper = require('../helpers/user-helpers')

//middleware to check verify user login or not
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/')
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedIn){
    res.redirect('/homepage')
  } else{
    res.render('index',{LoginErr:req.session.LoginErr,layout:false})
    req.session.LoginErr=false
  }
  
});

router.get('/signup',(req,res)=>{
  
  res.render('signup',{layout:false})
})

//signup page data inserting to database
router.post('/registration',(req,res)=>{
 
// userHelper.doSignup(req.body).then((response)=>{
//   //console.log(req.body);
//   //console.log("###########"+response);
//   res.redirect('/homepage')
// })

 userHelper.doSignup(req.body).then((response)=>{
     // console.log("dosingup========="+userData);
      req.session.loggedIn=true
      req.session.user=req.body
     res.redirect('/homepage')
     console.log(req.body);
      
    }) 
});

router.post('/login',(req,res)=>{
  userHelper.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
     
      res.redirect("/homepage")
    } else{
      req.session.LoginErr="Invalid Username or Password"  //passing error to intex.hbs
      res.redirect('/')
    }
  })

  
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})


router.get('/cart',verifyLogin,(req,res)=>{


  res.render('cart')
})
module.exports = router;
