import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    ruc: {
        type: String,
        unique: true,
        required: true
    },
    business_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

userSchema.methods.validatePassword = async function (password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
}

const User = model('User', userSchema);

export default User;