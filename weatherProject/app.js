const express = require("express");

const https= require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){

   res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res){



  const query = req.body.cityName;

  const apikey = "344c79def2fe2168db41df7b5b4b39d6" ;

  const unit = "metric" ;

   const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+unit+"&id=524901&appid=" + apikey;

  https.get(url, function(response){

      console.log(response.statusCode);

      response.on("data", function(data){
       const weatherData = JSON.parse(data)
       const temp = weatherData.main.temp
       const des = weatherData.weather[0].description
       const img= weatherData.weather[0].icon
       const imgUrl = "http://openweathermap.org/img/wn/" + img+"@2x.png"
       console.log(temp);
       console.log(des);
       res.write("<h1>The temperatur in "+ query +" is " + temp + " degree celsius</h1>")
       res.write("<p>The weather is currently   " + des + "  </p>")
       res.write("<img src="+ imgUrl + ">")
       res.send()
     })
  })

});






app.listen(3000, function(){

  console.log("Server is running on port 3000.")

})
