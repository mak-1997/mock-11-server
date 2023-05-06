const { BookModel } = require("../models/book.model");

const getBooks = async (req, res) => {
    const { category, author } = req.query;

    try {
        if (!author && !category) {
            let books = await BookModel.find();
            res.status(200).send(books);
        }
        if (author && category) {
            let books = await BookModel.find({ author, category });
            res.status(200).send(books);
        }
        if (category && !author) {
            let books = await BookModel.find({ category });
            res.status(200).send(books);
        }
        if (author && !category) {
            let books = await BookModel.find({ author });
            res.status(200).send(books);
        }
    } catch (error) {
        res.status(400).send({ "msg": error });
    }
}

const getSingleBook = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const book = await BookModel.findById({ _id: id });
        if (book) {
            res.status(200).send(book);
        }
        else {
            res.status(200).send({ "msg": "No book found with the matching ID" });

        }
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
}

const addBooks = async (req, res) => {
    const { title, author, category, price, quantity, isAdmin } = req.body;
    if (isAdmin) {
        try {
            let newBook = new BookModel({ title, author, category, price, quantity });
            await newBook.save();
            let updatedBooks = await BookModel.find();
            res.status(201).send(updatedBooks);
        } catch (error) {
            res.status(400).send({ "msg": error });
        }
    }
    else {
        res.status(400).send({ "msg": "Please Login from Admin Account" });
    }
}

const updateBooks = async (req, res) => {
    const { id } = req.params;
    if (req.body.isAdmin) {
        const payload = {
            title : req.body.title,
            author: req.body.author,
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity
        };
        console.log(payload);
        try {
            await BookModel.findByIdAndUpdate({ _id: id }, payload);
            let book = await BookModel.findById({ _id: id });
            res.status(201).send(book);
        } catch (error) {
            res.status(400).send({ "msg": error.message });
        }
    }
    else {
        res.status(400).send({ "msg": "Please Login from Admin Account" });
    }

}

const deleteBooks = async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    if (req.body.isAdmin) {
        try {
            await BookModel.findByIdAndDelete({ _id: id });
            res.status(201).send({ "msg": "Book deleted Successfully" });
        } catch (error) {
            res.status(201).send({ "msg": error.message });
        }
    }
    else {
        res.status(400).send({ "msg": "Please Login from Admin Account" });
    }
}


module.exports = { getBooks, getSingleBook, addBooks, updateBooks, deleteBooks };