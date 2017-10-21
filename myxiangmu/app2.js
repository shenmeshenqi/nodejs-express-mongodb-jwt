var express=require("express");
var app=express();
var path=require("path");
var  mongoose = require("mongoose");
var bodyParser = require('body-parser');
var jwt=require('jwt-simple');
 //var jwt= require('jsonwebtoken');
global.db=mongoose.connect("mongodb://localhost:27017/my");
global.db.connection.on("open",function(err,j)
{
  if(err)
  {console.log("连接出错");}
  else
  console.log("数据库连接成功");
});
global.modelone=require("./common/modelone");
//app.set('superSecret', 'myjwttest');

app.set('jwtTokenSecret', '/');

app.set('views', path.join(__dirname, 'views'));
app.set( 'view engine', 'html' );
app.engine( '.html', require( 'ejs' ).__express );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
/*app.post('/', (req, res) => {
  let user = req.body;
  // 产生token过期时间，这里设置
  let expires = Date.now() + 7*24*60*60*1000;
  let token = jwt.encode({
    iss: user.id, // issuer 表明请求的实体
    exp: expires, // expires token的生命周期
    aud: 'jser'
  }, app.get('jwtTokenSecret'));

  res.json({
    token: token,
    expires: expires
  });
});*/



/*
app.get('/', (req, res) => {
  // 获取token,这里默认是放在headers的authorization
  let token = req.headers.authorization;
  if (token) {
    let decoded = jwt.decode(token, app.get('jwtTokenSecret'));
    // 判断是否token已过期以及接收方是否为自己
    if(decoded.exp <= Date.now() || decoded.aud !== 'jser') {
      res.sendStatus(401)
    } else {
      res.sendStatus(200)
    }
  } else {
    res.sendStatus(401)
  }
});*/

console.log("da")

//var luyou=require('./routes/luyou');
//app.use('/',luyou);
var luyou=express.Router();

luyou.use(function(req,res,next)
{  console.log(req.headers.authorization);
let token = req.headers.authorization;
if (token) {
  let decoded = jwt.decode(token, app.get('jwtTokenSecret'));
  // 判断是否token已过期以及接收方是否为自己
  if(decoded.exp <= Date.now() || decoded.aud !== 'jser') {
    res/*.sendStatus(401)*/.send.json({message:'token无效'});
  } else {
    //res.sendStatus(200);
    next();
  }
} else {

  //res./*sendStatus(401)*/json({message:'没有token'});
  luyou.get('/',function(req,res)
{
  console.log("进入登陆界面");
  res.render('login');
});
}
});


luyou.get('/',function(req,res)
{
console.log("成功进入到主页");
res.render('my');

});
require('./routes')(app);


/*
  // 拿取token 数据 按照自己传递方式写
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    // 解码 token (验证 secret 和检查有效期（exp）)
  jwt.verify(token, app.get('superSecret'), function(err, decoded) {

      if (err) {
        return res.json({ success: false, message: '无效的token.' });
      } else {
        // 如果验证通过，在req中写入解密结果
        req.decoded = decoded;
        //console.log(decoded)  ;
        next(); //继续下一步路由
      }
    });
  } else {
    // 没有拿到token 返回错误
    return res.status(403).send({
        success: false,
        message: '没有找到token.'
    });

  }
});*/
app.get('/',function(req,res)
{
  res.render('login');
});
app.use('/api',luyou);
app.listen(3000);
