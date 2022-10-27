const router = require('express').Router();
const { getCards, deletCard, createCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.delete('/cards/:cardId', deletCard);
router.post('/cards', createCard);

module.exports = router;
