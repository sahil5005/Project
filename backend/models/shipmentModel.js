import mongoose from 'mongoose'

const shipmentSchema =new mongoose.Schema({
    shipment_number: {type: String, require: true},
    hops: {type: [String], require: true},
})

const shipmentModel = mongoose.models.shipment || mongoose.model('shipment', shipmentSchema)

export default shipmentModel;