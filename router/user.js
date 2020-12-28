const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
reg=express.Router();
reg.post('/reg',(req,res)=>{
    var obj=req.body;
     var i=400;
     for(var k in obj){
        i++;
        if (!obj[k]) {
            res.send({code:i,msg:k+'不能为空！'})
            return;
        }
    }
   pool.query('insert into xz_user set ?',[obj],(err,result)=>{
       if(err){
           res.send({code:500,msg:'服务器端错误'});
           return;
       }
       res.send({code:200,msg:'注册成功'})
   })
    }
)

reg.post('/login',(req,res)=>{
    var obj=req.body;
    var i=400;
    for(var k in obj){
        i++;
        if(!obj[k]){
            res.send({code:i,msg:k+'不能为空'});
        }
    }
    pool.query('select * from xz_user where uname=? and upwd=?',[obj.uname,obj.upwd],(err,result)=>{
        if(err){
            res.send({code:500,msg:'服务器端错误'});
            return;
        }
       if(result.length===0){
           res.send({code:201,msg:'用户名或密码错误'});
       }else{
           res.send({code:200,msg:'登录成功'});
       }
    })
})

reg.put('/:uid',(req,res)=>{
   obj1=req.params;
   obj2=req.body;
   var i=400;
   for(var k in obj2){
     i++;
     if(!obj2[k]){
       res.send({code:i,msg:k+'不能为空'});
       return;
     }
   }
   pool.query('update xz_user set ? where uid=?',[obj2,obj1.uid],(err,result)=>{
       if(err){
            res.send({code:500,msg:'服务器端错误'});
           return;  
       }
       if(result.affectedRows===0){
        res.send({code:201,msg:'修改失败'});
       }else{
        res.send({code:200,msg:'修改成功'});
       }
   
       
   })
})

reg.get('/',(req,res)=>{
    var obj1=req.query.pno ;
    var obj2=parseInt( req.query.count) ;
    if(!obj1){
        obj1=1;
    }
    if(!obj2){
        obj2=2;
    }
    var obj3=parseInt((obj1-1)*obj2);
    pool.query('select * from xz_user limit ?,?',[obj3,obj2],(err,result)=>{
             if(err){
                  res.send({code:500,msg:'服务器端错误'});
                 return; 
             }
            
                 res.send({code:200,msg:'查询成功',data:result});
          
    })
})
//检测用户名是否被占用(get /checkuname)
reg.get('/checkuname/:uname',(req,res)=>{
    var obj=req.params;
    pool.query('select uid,uname from xz_user where uname=?',[obj.uname],(err,result)=>{
        if(err){
            console.log(err);
            res.send({code:500,msg:'服务器端错误'});
        }
        if(result.length===0){
            res.send({code:200,msg:'该用户名未被注册'});
        }else{
            res.send({code:201,msg:'该用户名已被注册'});
        }
    })
})

reg.delete('/:uid',(req,res)=>{
    var obj=req.params;
    pool.query('delete from xz_user where ?',[obj.uid],(err,result)=>{
        if(err){
            res.send({code:500,msg:'服务器端错误'});
            return;
        }
       if(result.affectedRows===0){
        res.send({code:201,msg:'删除失败'});
       }else{
        res.send({code:200,msg:'删除成功'});
       }
       
    })
})
//导出路由器对象
module.exports=reg;