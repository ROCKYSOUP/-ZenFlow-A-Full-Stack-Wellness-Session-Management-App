const express=require("express")
const cors=require("cors")
const sessionRoutes=require("./routes/AddNewOrUpdateSessionOrDeleteSession")
const draftRoutes=require("./routes/DraftSession")
const publishedRoutes=require("./routes/PublishedSession")
const loginRoutes=require("./routes/Login")
const registerRoutes=require("./routes/Register")
const userRoutes=require("./routes/User")
const connectdb=require("./Data/db")
const dotenv=require("dotenv")

dotenv.config()

const app=new express();

app.use(cors({origin: "*", // or "http://localhost:3001" for tighter security
  credentials: true}));
app.use(express.json());

connectdb();

app.use('/api/auth',loginRoutes)
app.use('/api/auth',userRoutes)
app.use('/api/session',sessionRoutes)
app.use('/api/draft',draftRoutes)
app.use('/api/publish',publishedRoutes)
app.use('/api/auth',registerRoutes)

app.listen(process.env.PORT || 5000 , async ()=>{

    try{
        console.log("Server is running")
    }catch(err){
        console.log(err,"There is a problem ")
    }
    
})

