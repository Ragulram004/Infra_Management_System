import mongoose from 'mongoose'

const {Schema} = mongoose;

const personnelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['auditor', 'handyman','admin'],
        required: true,
    },
    dept: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others'],
        required: true,
    }
  },{timestamps:true}
)

//static login method
personnelSchema.statics.login = async function(email){

  const user = await this.findOne({email})
  
  if(!user){
    throw Error('Incorrect email')
  }

  return user

}

export default mongoose.model('Personnel',personnelSchema)