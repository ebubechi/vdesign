import asyncHandler from 'express-async-handler'
import Business from '../models/businessModel.js'
// import Product from '../models/ProductModel.js'

// @desc    Fetch all business
// @route   GET /api/business
// @access  Public
const getBusinesses = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Business.countDocuments({ ...keyword })
  const business = await Business.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ business, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single business
// @route   GET /api/businesses/:id
// @access  Public
const getBusinessById = asyncHandler(async (req, res) => {
  const business = await Business.findById(req.params.id)

  if (business) {
    res.json(business)
  } else {
    res.status(404)
    throw new Error('Business not found')
  }
})

// @desc    Delete a business
// @route   DELETE /api/businesses/:id
// @access  Private/Admin
const deleteBusiness = asyncHandler(async (req, res) => {
  const business = await Business.findById(req.params.id)

  if (business) {
    await business.remove()
    res.json({ message: 'Business removed' })
  } else {
    res.status(404)
    throw new Error('Business not found')
  }
})

// @desc    Create a business
// @route   POST /api/business
// @access  Private/Admin
const createBusiness = asyncHandler(async (req, res) => {
  const business = new Business({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdBusiness = await business.save()
  res.status(201).json(createdBusiness)
})

// @desc    Update a business
// @route   PUT /api/business/:id
// @access  Private/Admin
const updateBusiness = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const business = await Business.findById(req.params.id)

  if (business) {
    business.name = name
    business.price = price
    business.description = description
    business.image = image
    business.brand = brand
    business.category = category
    business.countInStock = countInStock

    const updatedBusiness = await business.save()
    res.json(updatedBusiness)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness
}