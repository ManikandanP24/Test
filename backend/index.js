import express, { json, query } from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import cors from 'cors'

const app = express();
// const dotenv = require('dotenv');

app.use(express.json());
dotenv.config();

// console.log('..........', process.env.DB_HOST);

const db = mysql.createConnection({
    connectionLimit: 10, // Corrected typo here
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
db.connect();
// const db = mysql.createConnection({
//     host: "localhost",
//     user:"root",
//     password: "root",
//     database: "new"
//     })

app.use(cors())

app.get('/', (req, res) => {
    res.json("This is backend");
});

app.get('/books', (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        // console.log(res.json(data))
        return res.json(data);
    });
});

app.post('/books',(req,res)=>{
    const q = 'INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)';
    const values =[
       req.body.title,
       req.body.desc,
       req.body.price,
       req.body.cover
    ]

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json('book has been created successfull')
    })
})

// db.getConnection((err,connection)=>{
//     if(err) throw err
//     console.log("connection sucess")
// })
app.delete('/books/:id',(req,res)=>{
    const bookId = req.params.id;
    const q =`DELETE FROM books WHERE id = ${bookId}`
    console.log("test",q)
    
    db.query(q,bookId,(err,data)=>{

        console.log('bookId',bookId)
        
        if(err) return res.json(err)
        console.log('json', json)
        return res.json('book has been delete successfull')
    })

})

// app.patch('/books/:id',(req,res)=>{
//     const bookId = req.params.id
//     // const q =`UPDATE FROM books WHERE id = ${bookId}`
   
//     db.query(q,bookId,(err,date)=>{
//         if(err) return res.json(err)
//         // console.log('json', json)
//         return res.json('book has been update successfull')
//     })
// })

app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    // const { title, desc, price, cover } = req.body;

    const q = `UPDATE books SET title = ?, description = ?, price = ?, cover = ? WHERE id = ?`;
    const values =[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
     ]
 

    db.query(q, [...values,bookId], (err, data) => {
        if (err) {
            return res.json(err);
        }

        return res.json('Book has been updated successfully');
    });
});

app.listen(8000, () => {
    console.log('Connected to backend');
});
