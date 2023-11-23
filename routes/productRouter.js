const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/productSchema')


router.post('/products', async (req, res) => {
    try {
        const {
            name,
            price,
            amount,
            details,
            startDate,
            endDate,
            address,
            image,
        } = req.body;

        const newProduct = new Product({
            name,
            price,
            amount,
            details,
            startDate,
            endDate,
            address,
            image,
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put('/products/:id', async (req, res) => {
    const id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedProduct);
});

router.delete('/products/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(deletedProduct);
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/products/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        // Check if productId is a valid ObjectID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: 'Invalid ObjectID' });
        }

        // Fetch product data from the database
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Send product details as a response
        res.json(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;