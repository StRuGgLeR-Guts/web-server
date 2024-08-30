const request = require("request")


const geocode = (address,callback)=>{
    const url = "https://api.tomtom.com/search/2/geocode/"+encodeURIComponent(address)+".json?key=WNaNpmoNLjJ5EjUYRlbxfsVOeuJGxtv7&limit=1"
    request({url,json:true},(err,res)=>{
       if(err){
          callback("Unable to connect to the server",undefined)
       }
       else if(res.body.results[0]===undefined){
          callback("Unable to find the location...Enter the accurate location!!!",undefined)
       }
       else{
          callback(undefined,{
             location:res.body.results[0].address.freeformAddress,
             latitude:res.body.results[0].position.lat,
             longitude:res.body.results[0].position.lon
          })
       }
    })
 }

 const forecast = (cordiantes,callback)=>{
   const url = "https://api.weatherapi.com/v1/current.json?key=a35164f8c92a4c2da94152445241807&q="+cordiantes
   request({url,json:true},(err,res)=>{
      if(err){
         callback("Unable to connect to the server",undefined)
      }
      else if(res.body.error){
         callback("Unable to detect cordinates....Check your input",undefined)


      }
      else{
         const body = res.body.current
         callback(undefined,body.condition.text+"....Currently the temp is "+body.temp_c+" but it feels like "+ body.feelslike_c+" and has a probability of "+body.humidity+"% to pour")
      }

   })
 }






 module.exports = {
    geocode:geocode,
    forecast:forecast
 }
 