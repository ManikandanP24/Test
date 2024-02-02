import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "./style.css"
import { useLocation } from 'react-router-dom'

const Update = () => {
    const [book,setBook] = useState ({
        title : "",
        desc : "",
        price : null,
        cover : ""
    })

    const [error,setError] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    const bookId = location.pathname.split('/')[2]

    console.log("loction",location.pathname.split('/')[2])

    const handleChange =(e) =>{
        setBook((prev)=>({...prev, [e.target.name]: e.target.value}))
    }
    // console.log(book)

    // useEffect(()=>{
    const handleClick = async (e) =>{
        e.preventDefault()

        try{
            await axios.put("http://localhost:8000/books"+bookId,book)
            navigate("/")
        }catch(err){
            console.log(err)
            setError(true)
        }
    }
// })


  return (
    <div className='form'>
        <h1>Add Update book</h1>
        <input type="text" placeholder='title' onChange={handleChange} name='title' />      
        <input type="text" placeholder='desc' onChange={handleChange} name='desc'/>      
        <input type="number" placeholder='price' onChange={handleChange} name='price'/>      
        <input type="text" placeholder='cover' onChange={handleChange} name='cover'/>   
        <button onClick={handleClick}>Update Book</button>   
    </div>
  )
}

export default Update
