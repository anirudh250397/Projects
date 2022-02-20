const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response){

  response.sendfile(__dirname + "/index.html");
});


app.post("/", function(request,response){

  var num1= Number(request.body.num1);
  var num2= Number(request.body.num2);

  var result = num1 + num2;

  response.send("The result of the calculation is "+ result);
});

//bmi calculator code
app.get("/bmicalculator", function(request, response){

  response.sendfile(__dirname + "/bmiCalculator.html");
});



app.post("/bmicalculator", function(request,response){

  var height= parseFloat(request.body.height);
  var weight= parseFloat(request.body.weight);

  var bmi = weight/(height*height);

  response.send("Your BMI is "+ bmi);
});

app.listen(3000, function(){

console.log("server started on port 3000");

});
