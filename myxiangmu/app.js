var express=require("express");
var app=express();
var path=require("path");
var  mongoose = require("mongoose");
var bodyParser = require('body-parser');
//var jwt=require('jwt-simple');
var jwt= require('jsonwebtoken');
global.db=mongoose.connect("mongodb://localhost:27017/my");
global.db.connection.on("open",function(err,j)
{
  if(err)
  {console.log("连接出错");}
  else
  console.log("数据库连接成功");
});
global.modelone=require("./common/modelone");
app.set('superSecret', 'myjwttest');

app.set('jwtTokenSecret', 'myjwttest');

app.set('views', path.join(__dirname, 'views'));
app.set( 'view engine', 'html' );
app.engine( '.html', require( 'ejs' ).__express );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

var apiRoutes = express.Router();

apiRoutes.use(function(req, res, next) {
  console.log("jdaj")

  // 拿取token 数据 按照自己传递方式写
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    // 解码 token (验证 secret 和检查有效期（exp）)
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      console.log("解码成功啊");
      console.log(decoded);//到这一步，我试过了，解码成了

      if (err) {console.log("失败的操作");
        return res.json({ success: false, message: '无效的token.' });
      } else {
        // 如果验证通过，在req中写入解密结果

        req.decoded = decoded;
        console.log("返回有效");
        //console.log(decoded)  ;
        next(); //next没用？
      }
    });
  } else {
    console.log("没有拿到token");
    // 没有拿到token 返回错误
    return res.status(403).send({
        success: false,
        message: '没有找到token.'
    });

  }
});
apiRoutes.get('/login',function(req,res){ console.log('ok');res.render('dui');})
require('./routes')(app);

app.get('/',function(req,res)
{
  res.render('login');
});
app.use('/api',apiRoutes);//我用来测试的api
app.listen(3000);
