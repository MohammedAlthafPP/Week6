var express = require('express');
const res = require('express/lib/response');
const { response } = require('../app');
var router = express.Router();
const userHelper = require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedIn){
    res.redirect('/homepage')
  } else{
    res.render('index',{LoginErr:req.session.LoginErr})
    req.session.LoginErr=false
  }
  
});

router.get('/signup',(req,res)=>{
  
  res.render('signup')
})

//signup page data inserting to database
router.post('/registration',(req,res)=>{
 
userHelper.doSignup(req.body).then((response)=>{
  console.log(response);

})
res.redirect('/homepage')
//  userHelper.doSignup(req.body).then((userData)=>{
//       console.log("dosingup========="+userData);
//      // res.render('homepage')
//     }) 
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


router.get('/cart',(req,res)=>{

  
  res.render('cart')
})
module.exports = router;
