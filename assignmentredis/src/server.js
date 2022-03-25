
const app=require("./index")
const connect=require("./configs/db")
app.listen(4000,async()=>{
    try {
        await connect()
        console.log("live at 4000")
    } catch (error) {
        console.log(error.message)
    }
})