const request=require('request')
const forecast =((lat,long,callback)=>{
const url ='http://api.weatherstack.com/current?access_key=6bb1599dcea070e793013da418e5b431&query='+encodeURIComponent(lat)+','+encodeURIComponent(long)

request({url,json:true},(error,{body})=>{
   if(error){
       callback('Unable to connect to weather service!',undefined)
   }else if(body.error){
       callback('Unable to find location!',undefined)
   }
   else{
    callback(undefined, {
        temperature:body.current.temperature,
        feelslike :body.current.feelslike
   })
   }
})
})
module.exports=forecast
