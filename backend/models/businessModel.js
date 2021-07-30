import mongoose from 'mongoose'

const businessSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    services: [{
      desc: {
        type: String,
        required: true
      },
      price: {
        type: String,
        required: true
      }
    }],
    isBusy: {
      type: Boolean,
      required: true,
      default: false,
    },

  },
  {
    timestamps: true,
  }
)

const business = mongoose.model('Business', businessSchema)

export default business