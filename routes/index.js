var express = require('express');
const { redirect } = require('express/lib/response');
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

//middleware to check verify Admin login or not
const verifyAdmin=(req,res,next)=>{
  if( req.session.adminloggedIn){
    next()
  }else{
    res.redirect('/')
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.header('Cache-control','no-cache,private, no-store, must-revalidate,max-stale=0,post-check=0,pre-check=0');
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
  res.header('Cache-control','no-cache,private, no-store, must-revalidate,max-stale=0,post-check=0,pre-check=0');
  req.session.destroy()
  res.redirect('/')
})

router.get('/cart',verifyLogin,(req,res)=>{


  res.render('cart')
})


router.get('/admin-login',(req,res)=>{
  res.render('admin-login',{layout:null,adminLogErr:req.session.adminLoginErr})
  req.session.adminLoginErr=false
})

router.post('/admin-panel',(req,res)=>{
 // console.log(req.body);
  userHelper.doLoginAdmin(req.body).then((response)=>{
    if(response.status){
      req.session.adminloggedIn=true
      req.session.admin=response.admin
     console.log(req.session.admin);
      res.redirect("/admin")
    } else{
      req.session.adminLoginErr="Invalid Username or Password"  //passing error to intex.hbs
      res.redirect('/admin-login')
    }
  })
})

//admin signup
router.get('/admin-signup',verifyAdmin,(req,res)=>{

 
  res.render('admin-signup',{layout:null})
  
  
})


router.post('/abc',(req,res)=>{
 
  console.log(req.body);
  userHelper.doSignupAdmin(req.body).then((response)=>{
    // console.log("dosingup========="+userData);
     req.session.adminSignUp=true
     req.session.admin=req.body
    res.redirect('/admin')
    console.log(req.body);
     
   })
})




module.exports = router;
