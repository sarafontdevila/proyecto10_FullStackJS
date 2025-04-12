const mongoose = require("mongoose")
const bcrypt = require ("bcrypt")

const userSchema = new mongoose.Schema({
  email: {type: String, trim: true, required: true},
  password: {type: String, required: true},
  preferidos: [{type: mongoose.Types.ObjectId, required:false, ref: "eventos"}
  ],
},
{
  timestamps: true,
  collection: "users"
}
)
userSchema.pre("save", function() {
  this.password = bcrypt.hashSync(this.password, 10)})

const User = mongoose.model("users", userSchema, "users")
module.exports = User