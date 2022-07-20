const http= require('http');
const fs= require("fs");
var requests = require('requests');


const homefile=fs.readFileSync("home2.html", "utf-8");

const replaceval=(temp,org)=>{
  org.main.temp=(org.main.temp-273.15).toFixed(2);;
  org.main.temp_min=(org.main.temp_min-273.15).toFixed(2);;
  org.main.temp_max=(org.main.temp_max-273.15).toFixed(2);;

    let temperature=temp.replace("{%tempval%}",org.main.temp);
     temperature=temperature.replace("{%tempmin%}",org.main.temp_min);

   temperature=temperature.replace("{%tempmax%}",org.main.temp_max);

     temperature=temperature.replace("{%location%}",org.name);
     temperature=temperature.replace("{%country%}",org.sys.country);
    return temperature; 


};

const server = http.createServer((req,res)=>{
    if(req.url=="/"){
        requests('https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=dc35a840d689f4fe5381661d8c4cec43')
.on('data',  (chunk) =>{
    const jsdata=JSON.parse(chunk);
    const arr=[jsdata];
    
 // console.log(arr[0].main.temp);
  const realdata=arr.map((val)=>{
   
    return replaceval(homefile,val);
  });

   const realdata1=realdata.join("");
  
  res.write(realdata1);
 //console.log(realdata1);
})

.on('end', function (err) {
  if (err) return console.log('connection closed due to errors', err);
 
  res.end();
});
}
});

    



server.listen(8080,"127.0.0.1");

