const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/greenwatch', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// MongoDB Schema
const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  priority: String,
  location: String,
  image: {
    type: String,
    default: 'https://via.placeholder.com/100'
  },
  status: {
    type: String,
    default: 'OPEN'
  },
  votes: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/100'
  }
});

const Item = mongoose.model('Item', itemSchema);

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new item
app.post('/api/items', async (req, res) => {
  const newItem = new Item(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an item
app.put('/api/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(item => item.id == id);
  
  if (index !== -1) {
    const deletedItem = items.splice(index, 1);
    return res.json(deletedItem[0]);  // Respond with the deleted item
  } else {
    return res.status(404).json({ message: `Item with id ${id} not found.` });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
