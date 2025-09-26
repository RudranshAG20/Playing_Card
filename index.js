const express = require('express');
const router = express.Router();

// In-memory array to store cards
let cards = [];
let nextId = 1;

// List all cards
router.get('/cards', (req, res) => {
  res.json(cards);
});

// Add a new card
router.post('/cards', (req, res) => {
  const { suit, value } = req.body;
  if (!suit || !value) {
    return res.status(400).json({ error: 'Suit and value are required' });
  }
  const card = { id: nextId++, suit, value };
  cards.push(card);
  res.status(201).json(card);
});

// Get a specific card by ID
router.get('/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const card = cards.find(c => c.id === id);
  if (!card) {
    return res.status(404).json({ error: 'Card not found' });
  }
  res.json(card);
});

// Delete a card by ID
router.delete('/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = cards.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Card not found' });
  }
  cards.splice(index, 1);
  res.json({ message: 'Card deleted successfully' });
});

module.exports = router;
