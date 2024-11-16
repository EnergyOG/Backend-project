import booksModel from "../model/booksModel.js";

export const createBook = async (req, res) => {
    try {
        const { tags, isPublished, price, author } = req.body;
        if (!tags || price == null || !author) {
           return res.status(400).json({ message: "Missing required fields: tags, price, or author" });
        }
        const newBook = await booksModel.create({ tags, isPublished, price, author });
        return res.status(201).json(newBook);
    } catch (err) {
        console.error("Error creating book:", err);
        res.status(500).json({ message: "Error creating book", error: err.message });
    }
};

export const getAllBooks = async (req, res) => {
    try {
        const books = await booksModel.find();
        return res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching books" });
    }
};

export const getBookByID = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid book ID format" });
        }

        const book = await booksModel.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });`   `
        }

        res.status(200).json(book);
    } catch (err) {
        console.error("Error fetching book by ID:", err);
        res.status(500).json({ message: "Error fetching book by ID", error: err.message });
    }
};

export const deleteBookByID = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedBook = await booksModel.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).send({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting book" });
    }
};