module.exports=function(app){
  app.set('superSecret', 'myjwttest');
  app.get('/login',function(req,res)
{
  res.render('login');
});
app.post('/login',function(req,res){
  var sjkyh=global.modelone.getmodel('user');
  var reqyh=req.body.uname;

  sjkyh.findOne({name:reqyh},function(err,haha)
{
  //console.log(haha);
  if(err){
    res.send(500);
    console.log("出错");}
    else if(!haha){
res.json({ success: false, message: '未找到授权用户' });}
      //res.send(404);}
    else
    {if(req.body.upwd!=haha.password)//这里要注意一下haha才是当前查找到的用户信息
      {
        console.log(req.body.password);
        //res.send(404,"密码错误");
        res.json({ success: false, message: '用户密码错误' });
      }

    else{
console.log("hahahah");
//var jwt= require('jsonwebtoken');
var jwt=require('jwt-simple');
console.log("模块导入成功");
console.log(haha);
 /*var token = jwt.sign(haha, app.get('superSecret'), {//我在这里说是playload出现问题，按到底haha是当前查询到的元素，无语
  expiresIn : 60*60*24// 授权时效24小时//我在下面的代码换了require('jsonwebtoken')的写法
});
res.json({
  success: true,
  message: '请使用您的授权码',
  token: token
});*/
let user = req.body;//我这里本来是应该写上面的代码的，但是，上面的代码执行不了
//我在下面的代码换了require('jsonwebtoken')的写法
// 产生token过期时间，这里设置
let expires = Date.now() + 7*24*60*60*1000;
let token = jwt.encode({
  iss: user, // issuer 表明请求的实体
  exp: expires, // expires token的生命周期
  //aud: 'jser'
}, app.get('jwtTokenSecret'));

res.json({
  token: token,
  expires: expires
});
}
    }
});
});
}
