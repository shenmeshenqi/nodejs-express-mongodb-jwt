module.exports=function(app){
  app.get('/register',function(req,res)
{
  res.render('register');
});
app.post('/register',function(req,res){
  var uname=req.body.uname;
  var upwd=req.body.upwd;
  console.log(uname,upwd)
  var sjkyh=global.modelone.getmodel('user');
  console.log(sjkyh);
  sjkyh.findOne({name:uname},function(err,ol)
{
  if(err){res.send(500);
    console.log("错误");}
  else if(ol){res.send(500);
    console.log("用户名已存在")}
  else{
    console.log("awdd");
console.log(uname,upwd);
var content={name:uname,password:upwd}
var mmm=new sjkyh(content);
    mmm.save(function(err,oo)
  {
    console.log(oo);
    if(err){res.send(500);
      console.log("出错");}
    else{console.log("我又对了");
      res.send(200);}
  });
  }
});
});
}
