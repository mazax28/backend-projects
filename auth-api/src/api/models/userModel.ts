import {Schema, model, Model} from 'mongoose'

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true,select:false},
    lastLogin: {type: Date, required: true,default: Date.now},
    isVerified: {type: Boolean, required: true,default: false},
    resetPasswordToken: {type: String, required: false,select:false},
    resetPasswordExpires: {type: Date, required: false,select:false},
    verificationToken: {type: String, required: false,select:false},
    verificationTokenExpire: {type: String, required: false,select:false},
},{
    timestamps:true,
    versionKey: false,
    // toJSON: {
    //     transform: (doc, ret) => {

    //         ret.id = ret._id;
    //         delete ret._id;
    //         delete ret.password;
    //         delete ret.verificationCode;
    //         delete ret.resetPasswordCode;
    //     }
    // }
}
)


const userModel = model('User', userSchema)

export {userModel}