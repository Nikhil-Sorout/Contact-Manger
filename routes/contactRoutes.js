const express = require('express');
const router = express.Router();

const {getContact,getContacts,updateContact,deleteContact,addContact} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');
// both methods can be used

router.use(validateToken);
router.route('/').get(getContacts).post(addContact)

router.route('/:id').get(getContact).delete(deleteContact).put(updateContact)

// router.get('/', (req, res)=>{
//     res.status(200).json({message: "Get all contacts"})
// })



module.exports = router;