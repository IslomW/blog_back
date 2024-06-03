import express from 'express';
import mongoose from "mongoose";
import multer from 'multer';

import cors from 'cors';
import {loginValidation, postCreateValidation, registerValidation} from './validations.js';

import checkAuth from "./utils/checkAuth.js";
import {getMe, login, register} from "./controllers/UserController.js";
import {create, getAll, getLastTags, getOne, remove, update} from "./controllers/PostController.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";


mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.cioyvnj.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0'
)
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err));

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (_, __, cb) =>{
        cb(null, 'uploads');
    },
    filename: (_, file, cb) =>{
        cb(null, file.originalname);
    },

});
const upload = multer({storage});

app.post('/auth/login', loginValidation, handleValidationErrors, login);
app.post('/auth/register', registerValidation, handleValidationErrors, register);
app.get('/auth/me', checkAuth, getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) =>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
})

app.get('/tags', getLastTags);
app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post('/posts',checkAuth, postCreateValidation, handleValidationErrors, create);
app.delete('/posts/:id',checkAuth, remove);
app.patch('/posts/:id', checkAuth, handleValidationErrors, update);


app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server ok")
});

