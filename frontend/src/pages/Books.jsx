import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './style.css'

const Books = () => {

    const [books,setBooks] = useState([])

    useEffect(()=>{
        const fetchAllBooks = async ()=>{
            try{
                const res = await axios.get("http://localhost:8000/books")
                setBooks(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    },[])

    console.log(books)

    const handleDelete = async (id)=> {
        try{
            console.log("id ", id)
            await axios.delete(`http://localhost:8000/books/${id}`)
            // await axios.delete('http://localhost:8000/books/'+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
      <h1> Online Book Shop </h1>
        <div className="books">
            {books.map(book=>(
                <div className="book" key={book.id}>
                    {book.cover && <img src='' alt=''/>}
                    <h2>{book.title}</h2>
                    <p>{book.desc}</p>
                    <span>{book.price}</span>
                    <button className='delete'  onClick={()=>handleDelete(book.id)}>Delete</button>
                    <button className='update'><Link to={`/update/${book.id}` } className='updateLink'>Update</Link></button>
                </div>
            ))}
        </div>
        <button className='addButton'><Link to='/add' className='addLink'>Add new user</Link></button>
    </div>
  )
}

export default Books
