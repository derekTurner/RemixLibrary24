import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()
// eslint-disable-next-line no-undef
const connectionString:string = process.env.DB_STRING ?? "no connection string";
console.log(connectionString);

const db = async () => {
    try {
        await mongoose.connect(connectionString!, {
            autoIndex: true
        })
        console.log('Connected to Mongodb Atlas');} catch (error) {
        console.error(error);
    }
}
export default db;