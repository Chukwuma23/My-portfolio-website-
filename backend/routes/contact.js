import express from 'express';
import Contact from '../models/contact.js';
import { validateContactForm } from '../middleware/validation.js';

const router = express.Router();

// Submit contact form
router.post('/submit', validateContactForm, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Get client IP address
    const ipAddress = req.ip || req.connection.remoteAddress;

    // Create new contact entry
    const newContact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      ipAddress
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: {
        id: newContact._id,
        name: newContact.name,
        email: newContact.email
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// Get all contacts (for admin panel - optional)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = status ? { status } : {};
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalContacts: total
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

export default router;