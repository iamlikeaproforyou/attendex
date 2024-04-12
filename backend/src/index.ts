import app from './app'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 8000

async function startServer() {
    app.listen(PORT , () => {
        console.log(`Listening on url http://localhost:${PORT}`)
    })
}

startServer()