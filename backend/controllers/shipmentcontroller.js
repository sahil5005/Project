import express from 'express';
import shipmentModel from '../models/shipmentModel.js';

const addShipment = async (req, res)=> {
    try {
        const {origin, destination, shipment_number} = req.body

        if(!origin || !destination || !shipment_number)
        {
            return res.json({success: false, message: 'Origin and destination are required fields.'});
        }

        let hops =[origin, destination]

        // hops.push_back(origin);
        // hops.push_back(destination);

        const shipmentData = {
            shipment_number,
            hops,
        }

        const newShipment = new shipmentModel(shipmentData);
        await newShipment.save() 

        res.json({success: true, message: "Shipment created successfully.", newShipment});

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const addHop = async (req, res) =>{
    try {
        const {previous_hop, next_hop, new_hop} = req.body

        const data = await shipmentModel.findOne({shipment_number:req.params.shipment_number})
        const hops = data.hops

        let ind= -1
        for(let i=0;i<hops.length;i++)
        {
            if(next_hop==hops[i])
            {
                ind=i;
                break
            }
        }
        if(ind==-1)
        {
            return res.json({success: false, message: "Shipment with ID not found."});
        } 

        hops.splice(ind,0, new_hop);

        await shipmentModel.findOneAndUpdate({shipment_number:req.params.shipment_number}, {hops})

        const arr = await shipmentModel.findOne({shipment_number:req.params.shipment_number});

        res.json({success: true, message: "Hop added successfully.", arr});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export {addShipment, addHop}