import mongoose from "mongoose"
import { config } from "dotenv";
config();

const url = process.env as {
  DATABASE_URL: string
}

export async function initializeDatabase() {

 await mongoose.connection

    .on("error", (error) => {
      console.log("ERROR: connection to mongo failed: ", error)
    })

    .on("close", () => {
      console.log("Connection to mongo ended")
    })

    .once("open", () => {
      console.log("Connection to mongo")
    })

   await mongoose.connect(url.DATABASE_URL)
}

export async function disconnectDatabase() {  
  
 await mongoose.disconnect()
}
