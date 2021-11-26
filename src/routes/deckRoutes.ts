import express, { Router } from 'express'
import { addDeck, getDeckById, getMyDecks } from '../controllers/deckController'
import { protect } from '../middleware/authMiddleware'

const router: Router = express.Router()
//post new deck
router.route('/').post(protect, addDeck)
//get user decks
router.route('/mydecks').get(protect, getMyDecks)
//get deck by id
router.route('/:id').get(protect, getDeckById)

export { router as deckRoutes }
