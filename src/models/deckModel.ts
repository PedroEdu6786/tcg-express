import mongoose from 'mongoose'


// @desc Deck Mongoose Schema
const deckSchema = new mongoose.Schema(
  {
    cards: { type: Array, required: true },
    name: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
)

export const Deck = mongoose.model('Deck', deckSchema)
