var express = require('express');
const res = require('express/lib/response');
const { response } = require('../app');
var router = express.Router();
const userHelper = require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
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
      res.redirect("/homepage")
    } else{
      res.redirect('/')
    }
  })

  
})



module.exports = router;
