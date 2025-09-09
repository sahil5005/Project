import express from 'express';
import {updateStatus } from '../controllers/flightController.js';

const flightRouter = express.Router();

flightRouter.post('/flights/:flight_number/status', updateStatus);

export default flightRouter