const express = require('express')
const path =require('path')
const hbs = require('hbs')

const app=express()

const pathDirectory=path.join(__dirname,'/public')
const viewsPath=path.join(__dirname,'/templatees/views')
const partialsPath=path.join(__dirname,'/templatees/views/partials')



app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)
app.use(express.static(pathDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Deep',
       
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'About',name:'Deep'})
})

app.get('/help',(req,res)=>{
    res.render('help',{title:'Help',name:'Deep'})
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'Please provide an address!'})
    }

const geocode=require('./utils/geocode')
const forecast = require('./utils/forecast')


geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
       return  res.send({error})
    }else{
       
        forecast(latitude, longitude,(error,{temperature,feelslike}={})=>{
            if(error){
                return res.send({error})
            }else{
                
                res.send({location:location, temperature: temperature, feelslike: feelslike})
            }
        
        
    })
    }
    
    
})


    
})

app.get('/help/*',(req,res)=>{
    res.render('help-error',{error:'Help article not found!',name:'Deep'})
})

app.get('*',(req,res)=>{
    res.render('help-error',{error:'Page not found!',name:'Deep'})
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000!')
})