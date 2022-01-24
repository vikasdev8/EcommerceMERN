const app = require('./app.js')
const connectdatabase = require('./config/database.js')
const cloudinary = require('cloudinary')

// handling uncaugh exception

process.on('uncaughtException', (err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`shutting down server due to uncaught Exception`)
    process.exit(1)
})


if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

connectdatabase()
cloudinary.config({
    
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API,
    api_secret : process.env.CLOUD_SECRET
   

})


const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server on http://localhost:${process.env.PORT}`)
})



//unhandle promise rejection

process.on('unhandledRejection', (err)=>{
    console.log(`Error ${err.message}`);
    console.log(`shutting down server due  unhandle promise rejection`)

    server.close(()=>{
        process.exit(1);
    })
})
