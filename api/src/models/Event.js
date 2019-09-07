import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema(
  {
    title: String,
    start: String,
    end: String,
    className: {
      type: String,
      default: 'btn-primary',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Event', EventSchema)
