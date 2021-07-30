import express from 'express'
const router = express.Router()
import {
  getBusinesses,
  getBusinessById,
  deleteBusiness,
  createBusiness,
  updateBusiness,
} from '../controllers/businessController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getBusinesses).post(protect, admin, createBusiness)
router
  .route('/:id')
  .get(getBusinessById)
  .delete(protect, admin, deleteBusiness)
  .put(protect, admin, updateBusiness)

export default router
