const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:3002',
            'http://localhost:8080',
            'http://localhost:5173',
            'https://www.ovisshop.com',
            'https://admin.ovisshop.com',
        ],
    })
);
app.use(express.json());
app.use(cookieParser());

// import routes
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const orderRoute = require('./routes/order.route');
const adminRoute = require('./routes/admin.route');
app.get('/', (req, res) => {
    res.send('Hurrey Server is working! YaY!');
});

app.use('/api/v1/user', userRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/order', orderRoute);


app.use((err, req, res, next) => {
    console.error('Global Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});
module.exports = app;

