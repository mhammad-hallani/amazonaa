import express from 'express';
import data from './data.js';

const app  = express();

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

const port  = process.env.PORT || 5000;
// Y3ne eza ma a5dt hayde l free port btrooh al port 5000

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
});

