import React, { useState } from 'react';
import toast from 'react-hot-toast'

const UpdateTask = () => {
    const [img, setimg] = useState(null)
    const imageHostingKey = process.env.REACT_APP_IMGBB_API_KEY

    const handlepic=(e)=>{
        const imgfile = e.target.files[0]
        setimg(imgfile)
    }

    const updateTask =(e, id)=>{
        e.preventDefault()
        const form = e.target 
        const text = form.textinp.value 
   
        const formData = new FormData()
        formData.append('image', img)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imageData =>{
            console.log(imageData)


            if(imageData.success){
                const updateTask = {
                    text,
                    img: imageData.data.url  
                }
        
                fetch(`http://localhost:5000/addtask/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(updateTask)
                })
                .then(res => res.json())
                .then(data =>{
                    console.log(data)
                    e.target.reset()
                    toast.success("Task added successfuly")

                })
                .catch(e=> console.error(e))
            }



        })
    

        

    }



    return (
        <div className='my-10 mx-auto w-5/6 md:w-1/2 bg-purple-100 p-5 rounded shadow-lg'>
           

            <form onSubmit={updateTask} className='flex flex-col mx-auto w-10/12 p-4'>
                <textarea type="text" name="textinp" className='border mb-4 p-3 rounded' required/>
                <input type="file" name="files" onChange={handlepic}    className='border mb-4 p-3 rounded bg-white' required />
                <button type="submit" className='border  p-3 mb-6 text-white font-bold text-xl rounded bg-gradient-to-r from-violet-500 to-fuchsia-400'>Update task</button>
               
            </form>
        </div>
    );
};

export default UpdateTask;