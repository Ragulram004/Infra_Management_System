import mongoose from 'mongoose'
const {Schema} = mongoose;

const reportSchema = new Schema(
  {
    //name,phone,email,role
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Personnel',
      required: true,
    },
    status:{
      type:String,
      default:'pending'
    },
    //area
    reportedAreaId:{
      type:Schema.Types.ObjectId,
      ref:'AuditTask',
      required:true
    },
    imagepath: {
      type: String,  // Store the path to the uploaded image
      required: true,
    },
    CompletedReportImagePath:{
      type: String,
    },
    //name,phone,email,role
    fixerId:{
      type:Schema.Types.ObjectId,
      ref:'Personnel',
    }
  },
  {timestamps : true}
)

export default mongoose.model('Report',reportSchema)