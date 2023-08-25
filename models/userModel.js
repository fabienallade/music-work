const {mongoose, Schema} = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {
        default: 2,
        required: true,
        type: Number,
    },
}, {timestamps: true});
userSchema.methods.hashPassword = async function () {
    this.password = await bcrypt.hash(this.password, 10);
};
userSchema.methods.comparePassword = async function (oldPassword) {
    return bcrypt.compare(oldPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
