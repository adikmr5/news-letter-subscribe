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
    url:'https://us10.api.mailchimp.com/3.0/lists/enter-list-id-here',
    method:'POST',
    headers : {
            "Authorization" : 'Aditya enter-api-key-here'
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
