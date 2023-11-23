const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Customer = require('../models/customerSchema');

// สร้างลูกค้า
router.post('/customers', async (req, res) => {
  try {
    const { name, address, email, telephoneNumber } = req.body;

    // สร้างลูกค้าใหม่
    const newCustomer = new Customer({
      name,
      address,
      email,
      telephoneNumber,
    });

    // บันทึกลูกค้าลงในฐานข้อมูล
    await newCustomer.save();

    res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ดึงข้อมูลลูกค้าทั้งหมด
router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// อัปเดตข้อมูลลูกค้า
router.put('/customers/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // อัปเดตข้อมูลลูกค้า
    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ลบข้อมูลลูกค้า
router.delete('/customers/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // ลบข้อมูลลูกค้า
    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(deletedCustomer);
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ดึงข้อมูลลูกค้าตาม ID
router.get('/customers/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // ดึงข้อมูลลูกค้า
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    console.error('Error retrieving customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
