const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/ekart', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

  const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:[true,'username is required field']
    },
    name:{
        type:String,
        required:[true,'name is required field']
    },
    password:{
        type:String,
        required:[true,'password is required field']
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
  )

const UserModel = mongoose.model('user',userSchema);
module.exports = UserModel