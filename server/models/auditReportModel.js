import mongoose from 'mongoose'
const {Schema} = mongoose;

const auditreportSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      enum: [
        'Main Auditorium Stage',
        'Learning Centre Backside Restroom',
        'Football Playground Restroom',
        'SF Block VIP Lounge',
        'Vedanayagam Auditorium VIP Lounge',
        'Indoor Stadium',
        'Main Parking Restrooms',
        'Hostel Canteen Premises',
        'Chairman\'s Room and Chief Executive Room - Old Mech Seminar Hall',
        'New Store Room',
        'Tennis Ground',
        'Quarters',
        'Board Room - SF Block (First Floor)'
      ],
      required: true,
    },
    imagepath: {
      type: String,  // Store the path to the uploaded image
      required: true,
    },
  },
  {timestamps : true}
)

export default mongoose.model('AuditReport',auditreportSchema)