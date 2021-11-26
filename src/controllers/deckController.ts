import { Request, Response } from 'express'
import { Deck } from '../models/deckModel'

// @desc Post add deck to user
// @route POST /api/decks/
// @access Private
export const addDeck = async (req: Request, res: Response) => {
  const { name, userId, cards } = req.body

  if (cards.length === 0) {
    res.status(400)

    throw new Error('No cards on deck')
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
    res.status(404)
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
    res.status(404)
    throw new Error('Deck not found')
  }
}
