const path=require('path')
const express=require('express')
const hbs= require('hbs')

//from weather app.js
const req = require('request')
const geoCode=require('./Utils/geoCode.js')
const forecast=require('./Utils/forecast.js')

const app=express()
//Static
const pathname = path.join(__dirname,'../public')
app.use(express.static(pathname))

// app.get('',(req,res)=>{
//
//   res.render('index')
// })
//



//dynamic
const viewPath=path.join(__dirname,'../templates/views')
app.set('views', viewPath);
app.set('view engine','hbs')


const partialPath=path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialPath)






app.get('',(req,res)=>{
  res.render('default',{
    title:'Home',
    name:'Sundara Krishnan',
    heading:'Weather Application'
  })
})



app.get('/index',(req,res)=>{
  res.render('index',{
    title:'Help',
    name:'Sundara Krishnan',
    heading:'Weather Application'
  })
})





app.get('/about',(req,res)=>{
  res.render('about',{
    title:'about',
    name:'Sundara Krishnan',
    heading:'Weather Application'
  })
})







app.get('/weather',(req,res)=>{

  const givenLocation=req.query.address

  if(!givenLocation){
      res.send({
      error:'Please provide valid location'
    })
  }

  else
  {

    geoCode(givenLocation,(error,responseData={})=>{

      const {latitude, longitude,location}=responseData     // Destructring objects

      if (error){
        console.log(error)
      }
      else{
        console.log('Sundara')
        console.log(responseData)

          console.log('Hi')
        forecast(latitude,longitude,(error,responseForecast)=>{
          if(error){console.log(error)}
          else{
            console.log(responseForecast)
            res.render('weather',{

                heading:'Weather Application',
                latitude : responseData.latitude,
                longitude :responseData.longitude,
                location:responseData.location,
                temperature:responseForecast.temperature,
                humidity:responseForecast.humidity

            })






        }
        })


      }

    })



    // res.render('weather',{
    //   title:'weather',
    //   name:'Sundara Krishnan',
    //   location:req.query.address
    // })

  }

})

// app.get('/help/*',(req,res)=>{
//   res.render('404err',{
//     error:'404 error from help aritcle'
//   })
// })

app.get('*',(req,res)=>{
  res.render('404err')
})

// app.get('',(req,res)=>{
//
//   res.send('Hello you are in Home Page')
// })
//
// app.get('/about',(req,res)=>{
//   res.send('<h1>This is about me</h1>')
// })
//
// app.get('/weather',(req,res)=>{
//   res.send({
//     location: 'Chennai',
//     temperature:32
//   })
// })



app.listen(3000,()=>{
  console.log('The server is Up you can check your browser')
})
