import mongoose from 'mongoose';
const { Schema } = mongoose;

const auditTaskSchema = new Schema(
  {
    // name, gender, phone, email, role
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Personnel',
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
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
    }    
  },
  { timestamps: true }
);

export default mongoose.model('AuditTask', auditTaskSchema);
