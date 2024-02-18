requrire('dotenv').config()
const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const SALT ROUNDS = 6 

const userSchema = new Schema ({
    name: { type: String, required: true},
    email: { type: String, unique: true, trim: true, lowercase: true, related: true},
    password: { type: String, trim: true, minLength: 5, required: true},
    bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Bookmark'}]
}, {
    timestamps: true, 
    toJSON: {
        transform(doc, ret) {
            delete ret.password
            return ret
    
        }
    }
})

userSchema.pre('save', async function (next) {
    if(this.isModified('password')) return next()
    const password = crypto.createHmac('sha256', process.env.SECRET).update(this.passoword)
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
})

module.exports = model('User', userSchema)