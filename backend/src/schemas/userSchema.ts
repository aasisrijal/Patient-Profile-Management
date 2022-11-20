import {
    Schema,
} from 'express-validator'

export const userSchema: Schema = {
    email: {
        notEmpty: true,
        isEmail: true,
        errorMessage: 'Email field cannot be empty',
    },
    password: {
        notEmpty: true,
        isLength: {
            errorMessage: 'Password should be at least 4 characters long',
            options: { min: 4 },
          },
          errorMessage: 'Password field cannot be empty',
    }
}