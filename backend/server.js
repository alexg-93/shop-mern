
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import morgan from 'morgan'
import productRoutes from './routes/productRoutes.js'
import brandRoutes from './routes/brandRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import colorRoutes from './routes/colorRoutes.js'
import sizeRoutes from './routes/sizeRoutes.js'


dotenv.config()

connectDB()

const app = express();

app.use(express.json())
app.use(cors({
  origin:"*"
}));
app.use('/api/products',productRoutes)
app.use('/api/sizes',sizeRoutes)
app.use('/api/brands',brandRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/colors',colorRoutes)



// if(process.env.NODE_ENV==='development'){
//   app.use(morgan('dev'))
// }


const port = process.env.PORT || 8000;
app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`.yellow.bold));

