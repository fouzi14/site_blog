const express=require("express")
const connect_db = require("./config/connectTdata")
const { errorHandler, notFound } = require("./midalwares/error")
const cors = require("cors")
require("dotenv").config()
connect_db()
const app = express()
app.use(express.json())

app.use(cors({
    origin :"http://localhost:3000"
}))
app.use("/api/auth",require("./routes/authRoute"))
app.use("/api/users",require("./routes/usersRoute"))
app.use("/api/post",require("./routes/postRoute"))
app.use("/api/comment",require("./routes/commentRoute"))
app.use("/api/category",require("./routes/categoryRoute"))

app.use(notFound)

app.use(errorHandler)



PORT=process.env.PORT
app.listen(PORT,()=>console.log(`connection to db is succeful port${PORT}`))

