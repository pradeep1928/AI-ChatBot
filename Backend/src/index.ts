import app from "./app.js"
import { connectToDatabase } from "./db/connection.js"

const PORT = process.env.PORT || 5000

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
  })
}).catch((err) => console.log(err))

