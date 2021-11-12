const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminDb = require('../model/admin.model');

const Adminjwt = require('../services/jwtverify');
const adminjwtauth = require('../services/jwtverify');

let route = express.Router();


route.get("/login", async (req,res) => {



    try{
        let {Email , Password} = req.body;
    
    
         adminDb.findOne({"Email" :Email},function(err,doc){
    
            if(err){
        
            
            }else{
               
                if(doc != null){
        
                    bcrypt.compare(Password, doc.Password, function(err, result) {
                        
                   if(err){
    
                   }else{
                       
                    if(result){
                         const token = jwt.sign({id : doc._id },process.env.JWT_SECRET,{expiresIn : '1y'});
                        
                           const t = token.split(".");
                          
                           const c1 = t[0] + "." + t[1];
                           const c2 = t[2];
                    
                        // console.log(token);
                     
                        res.status(200).json({msg : true , token});
                                             
                       }else{
                        res.status(200).json({msg :false});
                       }
                   }
        
        
                    
                });
                
                }else{
                    res.status(200).send("invalid password and name");
                }
              
            }
            
          });
        }catch(e){
            console.log(e);
            res.status(400).json({msg: e.massage});
        }
    
    




});


route.post("/register", async (req, res) => {

    let {Email , Password} = req.body;
    
      adminDb.findOne({"Email" :Email},function(err,doc){
    
        if(err){
    
        
        }else{
           
            if(doc === null|| doc === ''){
    
                bcrypt.hash(Password, 10, function(err, hash) {
                    
               
    
    
    
            const dat = new adminDb({
                Email : Email,
                Password : hash
            });
    
    
    
                dat.save(function (err, doc) {
            
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        res.status(200).json({msg : true})
                    }
            
                });
    
            });
            
            }else{
                res.status(200).json({msg : false})
            }
          
        }
        
      });
        
    
    });
    
    route.get("/",adminjwtauth,(req ,res)=>{

        try{
            console.log(req.info)
           adminDb.findOne({_id : req.info},(err,doc)=>{
            if(!err){
    
                res.status(200).json({msg:true,
                                        data : doc.Email});

            }
           })
                
    
              
    
    
    
        
        }catch(e){
    
            res.status(200).json({msg:false});
    
    
        }
    
    
    });
    

    module.exports = route;