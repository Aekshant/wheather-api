const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true }));
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){

  const query=req.body.cityname;
  const appkey="0aea0e7d7648b288168b184f58d6ab5a";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appkey+"&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const wheatherData=JSON.parse(data);
      const temp=wheatherData.main.temp;
      const whetherDescription=wheatherData.weather[0].description;
      const icon=wheatherData.weather[0].icon;
      const iconurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<html><body> <h3> The wheather condition is currently "+whetherDescription+"</h3></body></html>");
    res.write("<h1> The Temperature in "+query+ " is "+temp+" degree celsius.</h1>");
    res.write("<img src="+iconurl+">");

    res.send();
  });
  });

});



app.listen(3000);
