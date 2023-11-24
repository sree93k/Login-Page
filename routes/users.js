var express = require('express');
var router = express.Router();
var datas= require('../data.json')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  if(req.session.status)
  {
    res.set('Cache-control','no-store')
    res.render('main/mainindex', { title: 'MERN-signup'});
  }
  else{
    
    res.redirect('/signin')
  }
  console.log("hai")
});



router.get('/signin',(req,res)=>{
  if(req.session.status)
  {
    res.redirect('/')
  }
  else
  {
    res.set('Cache-control','no-store')
    var error=req.session.loginerror
    var logout_success=req.session.logout
    req.session.loginerror=false
    res.render('login/logindex',{error,logout_success})
  }
  
})


router.post('/signin',(req,res)=>{
  console.log(req.body);
  if(req.body.name===datas.user && req.body.password===datas.password)
  {
    req.session.user=req.body.name
    req.session.password_error=false
    req.session.username_error=false
    req.session.status=true
    res.redirect('/')
  }
  else{
    
      req.session.loginerror=true
    
   
    res.redirect('/signin')
  }
})


router.get('/mainpage',(req,res)=>{
  res.render('main/mainindex')
})


router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/signin')
  res.session.logout=true
})


module.exports = router;