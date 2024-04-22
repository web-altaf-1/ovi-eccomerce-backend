const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            trim: true,
            minLength: [3, "Name is too small"],
            maxLength: [100, "Name is too long"],
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
        },
        gender: {
            type: String
        },
        paymentMethod: {
            type: String
        },
        password: {
            type: String,
        },
        contactNumber: {
            type: String,
        },
        profilePicture: {
            type: String,
        },
        address: String,

        status: {
            type: String,
            default: "active",
        },
        providerId: {
            type: String,
            default: "custom",
            enum: {
                values: ["custom", "firebase"],
                message: "{VALUE} can't be a provider id",
            },
        },
        role: {
            type: String,
            default: "customer",
        }
    },
    {
        timeStamps: true,
    }
);


userSchema.pre("save", function (next) {
    if (this.password) {
        const password = this.password;
        const hash = bcrypt.hashSync(password);
        this.password = hash;
        next();
    }
});

userSchema.methods.comparePassword = function (password, hash) {
    const isValidPassword = bcrypt.compareSync(password, hash);
    return isValidPassword;
};


const User = mongoose.model("User", userSchema);

module.exports = User;