import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    ticketType: {type: String, required: true, unique: false},
    ticketDetails: {type: String, required: true, unique: false},
    userFirstName: {type: String, required: true, unique: false},
    userLastName: {type: String, required: true, unique: false},
    userEmail: {type: String ,required: true, unique: false},
    dateSubmitted: {type: Date, default: Date.now}

})

const Ticket = mongoose.model("tickets", ticketSchema)

export default Ticket