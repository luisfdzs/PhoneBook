const {Schema, model} = require('mongoose')

const phoneValidator = (number) => {
    return /^\d{2,3}-\d+$/.test(number);
}
const contactSchema = new Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: phoneValidator,
            message: props => `${props.value} is not a valid phone number!`
        }
    }
})
contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Contact = model('Contact', contactSchema)
module.exports = Contact