import express, { Router } from 'express'
import {
  addDeck,
  deleteDeck,
  getAllDecks,
  getDeckById,
  getMyDecks,
} from '../controllers/deckController'
import { admin, protect } from '../middleware/authMiddleware'

const router: Router = express.Router()
//post new deck
router.route('/').post(protect, addDeck)

router.route('/admin').get(protect, admin, getAllDecks)
//get user decks
router.route('/mydecks').post(protect, getMyDecks)
//get deck by id
router.route('/:id').get(protect, getDeckById).delete(protect, deleteDeck)

export { router as deckRoutes }
