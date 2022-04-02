const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    // last_name: { type: String, required: true },
    profile_Pic: [{ type: String, required: false }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("profile", userSchema);
module.exports=User


