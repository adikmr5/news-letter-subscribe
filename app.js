const request = require('request');
const express = require('express');
const bodyparser = require('body-parser');

const app=express();

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));

app.get('/',function(req,res) {
  res.sendFile(__dirname+"/index.html");
});

app.post('/',function (req,res) {
  var fname=req.body.fname;
  var lname=req.body.lname;
  var email=req.body.email;

  var data={
    members:[{
      email_address:email,
      status:'subscribed',
      merge_fields:{
        FNAME:fname,
        LNAME:lname,
      }
    }
    ]
  };

  var jSONData=JSON.stringify(data);
  var options={
    url:'https://us10.api.mailchimp.com/3.0/lists/763000260c',
    method:'POST',
    headers : {
            "Authorization" : 'Aditya bfb52b29bc8a8cc4295a35db4910a0da-us10'
        },
    body:jSONData,
  };



  request(options,function(error,response,body){
    if (error){
      console.log(error);
    }
    else {
      console.log(response.statusCode);
      alert('done');
    }
  });
});

app.listen(3000,function() {
  console.log("Server Started at 3000");
});


//api key
//bfb52b29bc8a8cc4295a35db4910a0da-us10

//list id
//763000260c
