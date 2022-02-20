const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req,res){

  res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req,res){


   const firstName = req.body.fname;
   const lastName = req.body.lname;
   const email = req.body.email;

   const data = {

  members: [

    {
      email_address:email,
      status : "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};
const jsonData = JSON.stringify(data);

const url = "https://us14.api.mailchimp.com/3.0/lists/f0a748756f";

const options = {
  method: "POST",
  auth:"anirudh1:55b293b9225ea5beb1f630f5229aa240-us14"

}
 const request = https.request(url, options, function(response){

  if(response.statusCode===200){
    res.sendFile(__dirname + "/success.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
  }


  response.on("data",function(data){
    console.log(JSON.parse(data));
  })

})

request.write(jsonData);

request.end();
});

app.post("/failure",function(req,res){

   res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){

  console.log("Server is up and running at 3000.");

});


//Apikey
// 55b293b9225ea5beb1f630f5229aa240-us14

//unique id
//f0a748756f