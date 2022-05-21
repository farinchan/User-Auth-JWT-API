const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
// import auth routes
const authRoutes = require("./routes/auth")
const exampleRoutes = require("./routes/example")

//dotenv (.env) config
dotenv.config()

//connect to Mongodb Database
mongoose.connect(process.env.DB_CONNECT, () => {
    console.log("connected to mongodb");
})

//middleware
app.use(bodyParser.json());
// app.use(express.json)

//routes middleware
app.use("/api/users", authRoutes)
app.use("/api/example", exampleRoutes )

app.listen(3000, () => {
    console.log("Server is running on example http://localhost:3000");
});
