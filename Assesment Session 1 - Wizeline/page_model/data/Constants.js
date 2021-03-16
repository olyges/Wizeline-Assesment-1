import dotenv from 'dotenv'
dotenv.config()

export const CREDENTIALS = {
    VALID_USER:{
        USERNAME: 'standard_user',
        PASSWORD: 'secret_sauce'
    },
    INVALID_USER:{
        USERNAME: 'invalid_user',
        PASSWORD: 'invalid_password'
    }
}