import app from './app'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const MONGO_URI = `mongodb+srv://admin:${process.env.MONGO_PASS}@attendex.qis1mds.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=attendex`
const PORT = process.env.PORT || 8000

mongoose.connection.once('open' , () => {
    console.log(`MONGO DB connected successfully !`)
})

async function startServer() {
    await mongoose.connect(MONGO_URI)
    app.listen(PORT , () => {
        console.log(`Listening on url http://localhost:${PORT}`)
    })
}

startServer()