import express from "express";
import { createBook, getAllBooks, getBookByID, deleteBookByID } from '../controller/booksController.js';

const router = express.Router();

router.post('/api/create', createBook);

router.get('/api/', getAllBooks);

router.get('/api/:id', getBookByID);

router.delete('/api/delete/:id', deleteBookByID);

router.use((req, res) => {
    res.status(404).send({ error: 'CRUD operation did not work!' });
});

export default router;
