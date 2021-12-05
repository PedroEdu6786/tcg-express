import { Request, Response } from 'express'
import { Deck } from '../models/deckModel'
import { writeOnCsv } from '../utils/csvWriter'
const fs = require('fs')

// @desc Post add deck to user
// @route POST /api/decks/
// @access Private
export const addDeck = async (req: Request, res: Response) => {
  const { name, userId, cards } = req.body

  if (cards.length === 0) {
    res.status(400).json({ message: 'No cards on deck' })
  } else {
    const deck = new Deck({
      name,
      userId,
      cards,
    })

    const createdDeck = await deck.save()

    res.status(201).json(createdDeck)
  }
}

// @desc Get deck by id
// @route GET /api/decks/:id
// @access Private
export const getDeckById = async (req: any, res: Response) => {
  const deck = await Deck.findById(req.params.id)

  if (deck) {
    res.json(deck)
  } else {
    res.status(404).json({ message: 'Deck not found' })
    throw new Error('Deck not found')
  }
}

// @desc Get logged in user decks
// @route GET /api/decks/mydecks
// @access Private
export const getMyDecks = async (req: any, res: Response) => {
  const decks = await Deck.find({ userId: req.user._id })

  if (decks) {
    res.status(200).json(decks)
  } else {
    res.status(404).json({ message: 'Deck not found' })
    throw new Error('Deck not found')
  }
}

// @desc Delete deck
// @route DELETE /api/decks/:id
// @access Private
export const deleteDeck = async (req: any, res: Response) => {
  const decks = await Deck.findById(req.params.id)

  if (decks) {
    await decks.remove()
    res.status(200).json({ message: 'Deck removed successfully' })
  } else {
    res.status(404).json({ message: 'Deck not found' })
    throw new Error('Deck not found')
  }
}

// @desc Update deck
// @route PUT /api/decks/:id
// @access Private
export const updateDeck = async (req: any, res: Response) => {
  const { name, cards } = req.body

  const decks = await Deck.findById(req.params.id)

  if (decks) {
    decks.name = name
    decks.cards = cards
    const updatedDeck = await decks.save()

    res.status(200).json(updatedDeck)
  } else {
    res.status(404).json({ message: 'Deck not found' })
    throw new Error('Deck not found')
  }
}

// @desc Get all orders
// @route GET /api/admin/decks
// @access Private/Admin
export const getAllDecks = async (req: any, res: Response) => {
  const orders: any = await Deck.find({}).select({
    _id: 1,
    name: 1,
    userId: 1,
  })

  await writeOnCsv(orders)

  let filePath = 'C:\\Users\\pedrc\Documents\src\school\web-api\tcg-express\decks.csv'
  res.json({ filePath })
}
