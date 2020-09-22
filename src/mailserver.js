const express = require('express');
const app = express();
const cors = require('cors');
const sendMail = require('./mail');

app.use(express.urlencoded({
    extended : false
}));
app.use(express.json());
app.use(cors());

app.get('/',(req,res) => {
    console.log("hdhhd");
    res.send("hetyyytyty");
})
app.post('/feedback' , (req,res) => {
    const {subject,email,text} = req.body;
    sendMail(email,subject,text,function(err,data){
        if(err){
            res.status(500).json({message:'Internal Error'});
        }
        else{
            res.json({message:'Email sent !!!!!!'});
        }
    });
    console.log('data:',req.body);
    
})

app.listen(8080 , ()=> console.log("mailserver running on 8080"));