
const app=require("./index")
const connect=require("./configs/db")
app.listen(2022,async()=>{
    try {
        await connect()
        console.log("live at 2022")
    } catch (error) {
        console.log(error.message)
    }
})