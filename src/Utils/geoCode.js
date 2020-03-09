const req=require('request')

const geoCode=(address,callback)=>{

const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic3VuZGFydGF0YWRvY29tbzAxMDUxOTk0IiwiYSI6ImNrN2V4Mnh5MzBvMG8zZm80bDdvNWtkY3EifQ.ra-b61lZY9_HEvZsUcF7XQ'


req({url:url,json:true},(error, response)=>{
  if(error){
    callback('Unable to connect to the internet',undefined)
  }
  else if (response.body.features.length===0){
    callback('Unable to fetch the location please try other location', undefined)
  }
  else{
    callback(undefined,{
      longitude:response.body.features[0].center[0],
      latitude:response.body.features[0].center[1],
      location:response.body.features[0].place_name
    })
  }

})

}


module.exports=geoCode
