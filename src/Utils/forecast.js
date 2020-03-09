const req=require('request')



const forecast=(latitude,longitude,callback)=>{
  const url='https://api.darksky.net/forecast/b96134f7d79e17385c97fac05ca98125/'+latitude+','+longitude+'?units=us&lang=ta'

  req({url:url,json:true},(error,response)=>{
    if(error){
      callback('Internet is down try checking your internet',undefined)
    }
    else if(response.body.code){
      callback('Poorly formatted request',undefined)
    }
    else{
      callback(undefined,{
        temperature:response.body.currently.temperature,
        humidity:response.body.currently.humidity,
        summary:response.body.currently.summary
      })
    }

  })
}




module.exports=forecast
