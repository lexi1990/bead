
module.exports = {
    identity: 'animal',
    connection: 'default',
    attributes: {
        date: {
            type: 'datetime',
            defaultsTo: function () { return new Date(); },
            required: true,
        },
        status: {
            type: 'string',
            enum: ['new', 'sick', 'adoptable', 'adopted'],
            required: true,
        },
        name: {
            type: 'string',
            required: true,
        },
        kenel: {
            type: 'string',
            required: true,
        },

        user: {
            model: 'user',
        },
    }
}

