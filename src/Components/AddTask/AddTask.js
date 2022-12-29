import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import {Link, useNavigate} from 'react-router-dom'
import { AuthContex } from '../../Context/Contex';
import Spiner from '../Spiner/Spiner';

const AddTask = () => {
    const [loading, setLoading] = useState()
    const {user} = useContext(AuthContex)
    const [img, setimg] = useState(null)
    const navigate = useNavigate()
    const imageHostingKey = process.env.REACT_APP_IMGBB_API_KEY



       
    const handlepic=(e)=>{
        const imgfile = e.target.files[0]
        setimg(imgfile)
    }


    const handaAddTask =(e)=>{
        e.preventDefault()
        const form = e.target 
        const text = form.textinp.value 
   
        const formData = new FormData()
        formData.append('image', img)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
        setLoading(true)
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imageData =>{
            console.log(imageData)

            if(imageData.success){
                const addTask = {
                    text,
                    img: imageData.data.url,
                    email: user?.email,
                    catagory: 'Not complete'  
                }
        
                fetch('http://localhost:5000/addtask', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(addTask)
                })
                .then(res => res.json())
                .then(data =>{
                    console.log(data)
                    setLoading(false)
                    e.target.reset()
                    toast.success("Task added successfuly")
                    navigate('/mytask')
                })
                .catch(e=> console.error(e))
            }
        
        })


    }




  


    return (
        <div className='border'>
            <div className='my-10 mx-auto w-5/6 md:w-1/2 bg-purple-100 p-5 rounded shadow-lg'>
        <h1 className="text-center text-3xl font-bold py-3">Add A Task</h1>


        {
            loading && <div className='flex items-center justify-center'><Spiner></Spiner></div>
        }

            <form onSubmit={handaAddTask} className='flex flex-col mx-auto w-10/12 p-4'>
                <textarea type="text" name="textinp" className='border mb-4 p-3 rounded' required/>
                <input type="file" name="files" onChange={handlepic}    className='border mb-4 p-3 rounded bg-white' required />
                {/* <button type="submit" className='border  p-3 mb-6 text-white font-bold text-xl rounded bg-gradient-to-r from-violet-400 to-fuchsia-400'>Add a task</button> */}

                {
                    user?.uid ?  <button type="submit" className='border  p-3 mb-6 text-white font-bold text-xl rounded bg-gradient-to-r from-violet-500 to-fuchsia-400'>Add a task</button>
                    :
                    <Link to="/login" type="submit" className='border  p-3 mb-6 text-white text-center font-bold text-xl rounded bg-gradient-to-r from-violet-500 to-fuchsia-400'>Add a task</Link>
                }

                
            </form>
        </div>
        </div>
    );
};

export default AddTask;