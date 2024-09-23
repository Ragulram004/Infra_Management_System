import mongoose from 'mongoose';
const { Schema } = mongoose;

const auditTaskSchema = new Schema(
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
    deadline: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
    role: {
      type: String,
      enum: ['auditor'],
      required: true
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
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model('AuditTask', auditTaskSchema);
