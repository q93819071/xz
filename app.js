const express=require('express');
const bodyParser=require('body-parser');
//引入用户路由器
const userRouter=require('./router/user.js');
const productRouter=require('./router/product.js');
//创建web服务器
const app=express();
app.listen(8080);
app.use(bodyParser.urlencoded({
    extended:false
}))

//挂载路由器,添加前缀/v1/uers
app.use('/v1/users',userRouter);
app.use('/v1/products',productRouter);
//http://127.0.0.1:8080/v1/users/reg