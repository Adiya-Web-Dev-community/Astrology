const express = require('express');
const { addEnquiry, getEnquiry } = require('../controllers/enquiry');
const { addEnquiryValidation } = require('../middleware/enquiryValidation');
const enquiryRouter = express.Router();


enquiryRouter.get('/', getEnquiry)

enquiryRouter.get('/:id', getEnquiry)

enquiryRouter.post('/add', addEnquiryValidation, addEnquiry)


module.exports = enquiryRouter