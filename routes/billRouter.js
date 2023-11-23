const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Bill = require('../models/billSchema');

// สร้างบิลพร้อมกำหนดวันเริ่มและวันสิ้นสุด
router.post('/createBillWithDates', async (req, res) => {
  try {
    const { start_date, end_date } = req.body;

    // สร้าง instance ของ Bill model
    const newBill = new Bill({
      start_date,
      end_date,
    });

    // บันทึกลงในฐานข้อมูล
    await newBill.save();

    res.status(201).json({ message: 'Bill created successfully with dates', newBill });
  } catch (error) {
    console.error('Error creating bill with dates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ดึงข้อมูลบิลทั้งหมด
router.get('/getBills', async (req, res) => {
  try {
    // ดึงข้อมูลบิลทั้งหมดจากฐานข้อมูล
    const bills = await Bill.find();

    // ส่งข้อมูลบิลกลับไปในรูปแบบ JSON
    res.json(bills);
  } catch (error) {
    console.error('Error fetching bills:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ดึงข้อมูลบิลตาม ID
router.get('/getBills/:id', async (req, res) => {
  const billId = req.params.id;

  try {
    // ตรวจสอบว่า billId เป็น ObjectID ที่ถูกต้องหรือไม่
    if (!mongoose.Types.ObjectId.isValid(billId)) {
      return res.status(400).json({ error: 'Invalid ObjectID' });
    }

    // ดึงข้อมูลบิลจากฐานข้อมูล
    const bill = await Bill.findById(billId);

    if (!bill) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    // ส่งรายละเอียดบิลเป็น response
    res.json(bill);
  } catch (error) {
    console.error('Error fetching bill details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
