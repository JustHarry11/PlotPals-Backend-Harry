export class UnprocessableEntity extends Error {
    constructor ( message, field = 'message' ) {
        super(message)
        this.name = 'UnprocessableEntity'
        this.status = 422
        this.field = field
    }
}

export class Unauthorized extends Error {
    constructor ( message = 'Unauthorized') {
        super(message)
        this.name = "Unauthorized"
        this.status = 401
        this.field = "message"
    }
}