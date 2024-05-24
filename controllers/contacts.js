const contactsRouter = require('express').Router()
const Contact = require('../models/Contact')

contactsRouter.get('/', (request, response, next) => {
    Contact
        .find({})
        .then(contacts => {
            return response.json(contacts)
        })
        .catch(error => next(error))
})
contactsRouter.get('/:id', (request, response, next) => {
    const id = request.params.id
    Contact
        .findById(id)
        .then(contact => {
            return response.json(contact)
        })
        .catch(error => next(error))
})
contactsRouter.post('/', (request, response, next) => {
    const name = request.body.name
    const number = request.body.number
    const newContact = new Contact({name: name, number:number})
    newContact
        .save({runValidators: true})
        .then(savedContact => {
            return response.json(savedContact)
        })
        .catch(error => next(error))
})
contactsRouter.put('/:id', (request, response, next) => {
    const id = request.params.id
    const changes = {number:request.body.number}
    Contact
        .findByIdAndUpdate(id, changes, {new: true, runValidators: true})
        .then(updatedContact => {
            return response.json(updatedContact)
        })    
        .catch(error => next(error))
})
contactsRouter.delete('/:id', (request, response, next) => {
    const id = request.params.id
    Contact
        .findByIdAndDelete(id)
        .then(() => {
            return response.json({Success: `Deleted contact ${id}`})
        })
        .catch(error => next(error))
})

module.exports = contactsRouter