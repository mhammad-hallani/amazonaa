import express from 'express';
import data from './data.js';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

dotenv.config()

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to db')
    })
    .catch(err => {
        console.log(err.message)
    })

const app  = express();

app.use('/api/seed', seedRouter)

//app.get('/api/products', (req, res) => {
//    res.send(data.products);
//}); ==> badel hayde ha n3me : 

app.use('/api/products', productRouter)


const port  = process.env.PORT || 5000;
// Y3ne eza ma a5dt hayde l free port btrooh al port 5000

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
});

