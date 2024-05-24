const {info} = require('./logger')
const requestLogger = (request, response, next) => {
    info('New request detected!')
    info('Method: ', request.method)
    info('Path: ', request.path)
    info('Body: ', request.body)
    info('---')
    next()
}

const notFound = (request, response, next) => {
    response.status(404).json({error: 'Unknown url'})
}
const handleError = (error, request, response, next) => {
    switch(error.name){
        case 'CastError':
            return response.status(400).json({error: 'Incorrect Id'})
        case 'ValidationError':
            return response.status(400).json({error: `${error.name}: the body of your request is not valid. ${error.message}`})
        default:
            return response.status(500).json({error: `${error.name}: ${error.message}`})
    }
}

module.exports = {notFound, handleError, requestLogger}