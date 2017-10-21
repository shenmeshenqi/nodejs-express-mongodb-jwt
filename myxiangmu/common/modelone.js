var mongoose=require("mongoose");
var shuju=require("./schema");
var Schema=mongoose.Schema;
var user
//mongoose.model('user',new Schema(shuju[user]),'user');
for (var m in shuju) {//遍历将models先给骨架化，然后用model模块化。
  console.log(m);
    mongoose.model(m, new Schema(shuju[m]),m);
    console.log("haha",m);
}
 function a(one){
   console.log("返回模块成功");
   console.log(one);return mongoose.model(one);}
module.exports={
  getmodel:function(one){console.log("传递数据成功");
  return a(one);
  }
}
