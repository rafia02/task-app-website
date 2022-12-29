import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContex } from '../../Context/Contex';
import Task from './Task';
import toast from 'react-hot-toast'
import Spiner from '../Spiner/Spiner';



const Mytask = () => {
    const {user} = useContext(AuthContex)

    const {data: mytasks =[], isLoading, refetch} = useQuery({
        queryKey: ["addtask", user?.email],
        queryFn: async()=>{
            const res = await fetch(`http://localhost:5000/addtask?email=${user?.email}`)
            const data = await res.json()
            return data
            isLoading()
        }
    
    })



    
    const handleDelete = (id)=>{
        console.log(id)
        fetch(`http://localhost:5000/addtask/${id}`,{
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            refetch()
        })
        .catch(e => console.error(e))
    }





    const handleUpdate =(id)=>{
        console.log(id)
      const isupdate =  window.prompt('Update your task')
      console.log(isupdate)

        if(isupdate){
            fetch(`http://localhost:5000/addtask/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({message: isupdate})
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                toast.success("Task updated")
                refetch()

            })
            .catch(e=> console.error(e))
        }
     
    }


    const handleComplete =(id)=>{
        fetch(`http://localhost:5000/complete/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({catagory: 'Complete' })
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            toast.success("Task Completed")
            refetch()

        })
        .catch(e=> console.error(e))
    }





    return (
       <div className='px-10 md:px-0'>

        {
            isLoading && <div className='flex items-center justify-center'><Spiner></Spiner></div>
        }

        {mytasks.length === 0 && <h1 className='text-3xl my-5 mx-auto w-1/2 p-5 text-center font-bold bg-purple-50'>You have no complete task</h1>}

         <div className='grid my-10 grid-cols-1 md:grid-cols-3 gap-14'>
            {
                mytasks.map(task =><Task
                key={task._id}
                task={task}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                handleComplete={handleComplete}
                ></Task>)
            }
        </div>
       </div>
    );
};

export default Mytask;