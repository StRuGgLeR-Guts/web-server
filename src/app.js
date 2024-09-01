const express = require("express")
const app = express()
const path = require("path")
const hbs= require("hbs")
const util = require("./utils/geocode.js")


const { title } = require("process")
const port = process.env.PORT || 3000


//paths for dirs
const publicDir = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname,"../templates/partials")


//setting static dir
app.use(express.static(publicDir))

//setting paths of dirs so that express can find
app.set("view engine","hbs")
app.set("views", viewsPath);
hbs.registerPartials(partialPath)


app.get("",(req,res)=>{
    res.render("index",{
        credit:"Shows forecast",
        title:"Weather-app",
        footer:"Jst for fun"
    })
})

app.get("/about",(req,res)=>{
        res.render("about",{
                name:"Sanpreeth",
                age:"19",
                title:"About me",
                footer:"footer"
        })
})


app.get("/help",(req,res)=>{
        res.render("help",{
                msg:"Please check your input throughly...if the problem persists please contact our helpline number which is show below",
                num:"123456789",
                title:"Help-desk",
                footer:"footer"
        })
})

app.get("/weather",(req,res)=>{
        if(!req.query.address){
                return res.send({err:"Provide address"})
        }
        util.geocode(req.query.address,(err,{location,latitude,longitude}={})=>{
                if(err){
                        return res.send({err})
                }
                util.forecast((latitude,longitude),(err,forecastdata)=>{
                        if(err){
                                return res.send({err})
                        }
                        res.send({
                                location,
                                Data:JSON.stringify(forecastdata),
                                address:req.query.address
                        })
                })
        })
}

                

   
)
app.get("/help/*",(req,res)=>{
        res.render("inter404",{
                title:"404 page",
                footer:"Check your route"
        })
})

app.get("*",(req,res)=>{
    res.render("404",{
        title:"404 page",
        footer:"Check your route"
    })
})



app.listen(port,()=>{
    console.log("Server running on port :"+port)
})
