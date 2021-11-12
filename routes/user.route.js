const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDB = require('../model/user.model');

const adminjwtauth = require('../services/jwtverify');

let route = express.Router();


route.get("/login", async (req,res) => {



    try{
        let {Email , Password} = req.body;
    
    
         userDB.findOne({"Email" :Email},function(err,doc){
    
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
    
      userDB.findOne({"Email" :Email},function(err,doc){
    
        if(err){
    
        
        }else{
           
            if(doc === null|| doc === ''){
    
                bcrypt.hash(Password, 10, function(err, hash) {
                    
               
    
    
    
            const dat = new userDB({
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
           userDB.findOne({_id : req.info},(err,doc)=>{
            if(!err){
    
                res.status(200).json({msg:true,
                                        data : {Email : doc.Email, _id : doc._id, Route : doc.Route}});

            }
           })
                
    
              
    
    
    
        
        }catch(e){
    
            res.status(200).json({msg:false});
    
    
        }
    
    
    });

    route.post('/newRoute',adminjwtauth ,(req ,res) =>{

        const {WEEKEND_NAME ,DATE, FORM  , TO} = req.body;
        let  data = {
            WEEKEND_NAME  ,
            DATE  ,
            WORK_ROUTE : {
                FORM  ,
                TO 
            }
        }

        try{

            userDB.findOneAndUpdate({_id : req.info },{$push : {
                Route : [data]
            }}, (err , doc)=>{

                if(err){

                }else{
                    res.status(200).json({msg : true});
                }

            })

        }catch(e){
            res.status(200).json({msg:false});
        }



    } );
    

    module.exports = route;