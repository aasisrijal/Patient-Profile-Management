import {
    Schema,
} from 'express-validator'

export const patientSchema: Schema = {
    full_name: {
        notEmpty: true,
        errorMessage: 'Full Name field cannot be empty',
    },
    dob: {
        notEmpty: true,
        isDate: true,
        errorMessage: 'Date of birth cannot be empty',
    },
    email: {
        notEmpty: true,
        isEmail: true,
        errorMessage: 'Email field cannot be empty',
    },
    image_url: {
        optional: true,
    },
    contact: {
        notEmpty: true,
        isLength: {
            errorMessage: 'Contact number should be between 10 and 20',
            options: { min: 10, max:20 },
        },
        errorMessage: 'Contact cannot be empty',
    },
    is_special: {
        notEmpty: true,
        isBoolean: true,
        errorMessage: 'Special value cannot be empty',
    },
}