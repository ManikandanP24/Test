import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "./style.css"

const Add = () => {
    const [book,setBook] = useState ({
        title : "",
        desc : "",
        price : null,
        cover : ""
    })

    const [error,setError] = useState(false)

    const navigate = useNavigate()

    const handleChange =(e) =>{
        setBook((prev)=>({...prev, [e.target.name]: e.target.value}))
    }
    console.log(book)

    // useEffect(()=>{
    const handleClick = async (e) =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8000/books",book)
            navigate("/")
        }catch(err){
            console.log(err)
            setError(true)
        }
    }
// })


  return (
    <div className='form'>
        <h1>Add new book</h1>
        <h1>Test for Push</h1>
        <input type="text" placeholder='title' onChange={handleChange} name='title' />      
        <input type="text" placeholder='desc' onChange={handleChange} name='desc'/>      
        <input type="number" placeholder='price' onChange={handleChange} name='price'/>      
        <input type="text" placeholder='cover' onChange={handleChange} name='cover'/>   
        <button onClick={handleClick}>Add Book</button>   
    </div>
  )
}

export default Add
