const express=require('express');
const pool=require('../pool.js');
product=express.Router();
product.post('/add',(req,res)=>{
    var obj=req.body;
    var i=400;
    for(var k  in obj){
        i++;
        if(!obj[k]){
            res.send({code:i,msg:k+"不能为空"});
            return;
        }
    }
    pool.query('insert into xz_laptop set ?',[obj],(err,result)=>{
          if(err){
              res.send({code:201,msg:'服务器端错误'});
          }
          res.send({code:200,msg:'添加成功'});
    })
})
product.put('/:lid',(req,res)=>{
    var obj1=req.params;
    var obj2=req.body;
    var i=400;
    for(var k  in obj2){
        i++;
        if(!obj2[k]){
            res.send({code:i,msg:k+"不能为空"});
            return;
        }
    }
    pool.query('update xz_laptop set ? where ?',[obj2,obj1],(err,result)=>{
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
product.delete('/:lid',(req,res)=>{
    var obj=req.params;
    pool.query('delete from xz_laptop where ?',[obj],(err,result)=>{
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
product.get('/',(req,res)=>{
    var obj1=req.query.pno;
    var obj2=parseInt(req.query.count) ;
    if(!obj1){
        obj1=1;
    }
    if(!obj2){
        obj2=2;
    }
    var obj3=parseInt((obj1-1)*obj2);
    pool.query('select * from xz_laptop limit ?,?',[obj3,obj2],(err,result)=>{
        if(err){
            res.send({code:500,msg:'服务器端错误'});
            return;
        }
            res.send({code:200,msg:'查询成功！',data:result});
    })
})
module.exports=product;