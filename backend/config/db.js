import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL_LOCAL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const url = `${connection.connection.host} - puerto: ${connection.connection.port}`
        console.log(`MongoDB conectado en : ${url}`)
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}
export default conectarDB;