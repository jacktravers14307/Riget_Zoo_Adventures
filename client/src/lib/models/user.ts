import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema({
    total: { type: Number, required: true }, 
    standardAmount: { type: Number, default: 0 },
    familyAmount: { type: Number, default: 0 },
    premiumAmount: { type: Number, default: 0 },
    purchasedAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tickets: [ticketSchema]
});

const User = mongoose.model("users", userSchema);

export default User;
