import {body} from 'express-validator';

export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
];
export const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    body('fullName').isLength({min: 3}),
    body('avatar').optional().isURL(),
];
export const postCreateValidation = [
    body('title').isLength({min: 3}).isString(),
    body('imageUrl').optional().isString(),
    body('tags').optional().isString(),
    body('text').isLength({min: 3}).isString(),
];