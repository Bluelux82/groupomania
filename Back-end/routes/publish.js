const express = require('express');
const router = express.Router();
const publishCtrl = require('../controllers/publish');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth')

// All routes
router.get('/', auth, publishCtrl.displayAll);
router.post('/create', auth, multer, publishCtrl.create);
router.put('/modify', auth, multer, publishCtrl.modify);
router.delete('/delete/:id', auth, publishCtrl.delete);
router.get('/:id', auth, publishCtrl.displayOne);
router.post('/like/:id', auth, publishCtrl.postLike);
router.post('/dislike/:id', auth, publishCtrl.postDislike);

module.exports = router;