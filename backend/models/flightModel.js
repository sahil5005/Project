import mongoose from "mongoose"

const flightSchema= new mongoose.Schema({
    carrier: {type: String, require: true},
    from: {type: String, require: true},
    to: {type: String, require: true},
    flight_number: {type: String, require: true},
    departure: {type: String, default: 'not mentioned'},
    arrival: {type: String, default: 'not mentioned'},
    status: {type: String, default: 'not landed'},
})

const flightModel = mongoose.models.flight || mongoose.model('flight', flightSchema)
export default flightModel