export default function errorHandler(err, res) {
    console.log(err)
    let { name, status, field, message, code, kind } = err

    if( name === "ValidationError" ){
        const fields = Object.keys(err.errors)
        const responseBody = {}
        fields.forEach(field => {
            responseBody[field] = err.errors[field].message
        })
        return res.status(422).json(responseBody)
    }

    if ( name === "MongoServerError" && code === 11000 ) {
        const field = Object.keys(err.keyValue)[0]
        return res.status(422).json({ [field]: `${field} is already taken` })
    }

    if ( name === "JsonWebTokenError" ) {
        return res.status(401).json({ message: 'Unauthorized'})
    }

    if (name === 'CastError' && kind === 'ObjectId') {
        return res.status(422).json({ message: 'Invalid ObjectId'})
    }

    if (!status) {
        status = 500
    }

    if (!field) {
        field = 'message'
    }

    return res.status(status).json({ [field]: message })
}
