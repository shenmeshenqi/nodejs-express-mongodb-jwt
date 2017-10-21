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
  console.log(haha);
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
var jwt=require('jsonwebtoken');
console.log("模块导入成功");
console.log(haha);
var token = jwt.sign(haha, app.get('superSecret'), {
  expiresIn : 60*60*24// 授权时效24小时
});
res.json({
  success: true,
  message: '请使用您的授权码',
  token: token
});}}});});}
