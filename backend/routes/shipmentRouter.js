import express from 'express';
import { addShipment, addHop } from '../controllers/shipmentcontroller.js';
import { addFlight, updateStatus } from '../controllers/flightController.js';

const shipmentRouter = express.Router();

shipmentRouter.post('/create', addShipment);
shipmentRouter.post('/:shipment_number/hops/add', addHop);
shipmentRouter.post('/:id/flights/add', addFlight);
shipmentRouter.post('/flights/:flight_number/status', updateStatus);

export default shipmentRouter