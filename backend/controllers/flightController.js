import express from 'express'
import flightModel from '../models/flightModel.js'
import shipmentModel from '../models/shipmentModel.js';

const addFlight = async(req,res) =>{
    try {
        const {carrier, from, to, flight_number, departure, arrival} = req.body
        if(!carrier || !from || !to || !flight_number)
        {
            return res.json({success: false, message: "Unable to add a flight. The 'from' and 'to' locations are not consecutive hops for this shipment."});
        }

        const flightData = {
            carrier,
            from,
            to,
            flight_number,
            departure,
            arrival,
        }

        const newFlight = new flightModel(flightData);
        await newFlight.save();

        res.json({success: true, message: "Flight information added successfully.", newFlight});
    } catch (error) {
        
    }
}

const updateStatus = async(req, res) => {
    try {
        const {status} = req.body
        const data =await shipmentModel.findOneAndUpdate({flight_number: req.params.shipment_number}, {status});

        if(!data)
        {
            return res.json({success: false, message: `Flight with ID '${req.params.shipment_number}' not found.`});
        }

        res.json({success:true, message:"Flight status updated successfully."}, data.flight_number,data.status);

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export {addFlight, updateStatus}