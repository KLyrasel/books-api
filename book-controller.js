//dependencies
const express = require('express')
const books = express.Router()
const Book = require(`./model`)
const bookSeed = require(`./book-seed`)

//seed
books.get(`/seed`, (req, res) => {
    console.log("seeded!")
    Book.insertMany(bookSeed)
        .then(createdBooks => {
            res.json({
                message: "Seed successful."
            })
        })
        .catch(err => {
            res.status(404).json({
                "errorCode": "SEED_UNSUCCESSFUL",
                "errorMessage": "Seed protocol did not fulfill."
            })

        })
})

//find all the books
books.get(`/`, (req, res) => {
    Book.find()
        .then(foundBooks => {
            res.status(200).json(foundBooks)
        })
        .catch(err => {
            res.status(404).json({
                "errorCode": "LIST_NOT_FOUND",
                "errorMessage": "The list of books isn't at this address."
            })

        })
})

//create new
books.post(`/`, (req, res) => {
    Book.create(req.body)
        .then(() => {
            res.status(201).redirect(`/books`)
        })
        .catch(err => {
            res.status(404).json({
                "errorCode": "BOOK_NOT_ADDED",
                "errorMessage": "Your book was not added to the list."
            })

        })
})

//find an individual book by id
books.get('/:id', (req, res) => {
    Book.findById(req.params.id)
        .then(foundBook => {
            if (foundBook == null) {
                res.status(400).json({
                    "errorCode": "BOOK_NOT_FOUND",
                    "errorMessage": "The book you're looking for doesn't exist. Please check your information and try again."
                })
            } else {
                res.status(200).json(foundBook)
            }
        })
})

//update the book
books.put(`/:id`, (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.status(201).json({
                message: "Update successful."
            })
        })
        .catch(err => {
            res.status(400).json({
                "errorCode": "EDIT_NOT_ACCEPTED",
                "errorMessage": "This edit was not processed."
            })

        })
})

//delete books
books.delete(`/:id`, (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(deletedBook => {
            res.json({
                message: "Delete successful."
            })
        })
        .catch(err => {
            res.status(404).json({
                "errorCode": "DELETE_UNSUCCESSFUL",
                "errorMessage": "This delete was not processed."
            })

        })
})


module.exports = books