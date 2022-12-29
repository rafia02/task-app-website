import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContex } from '../../Context/Contex';
import SingleComplete from './SingleComplete';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Spiner from '../Spiner/Spiner';

const CompliteTask = () => {
    const {user} = useContext(AuthContex)


    const {data: mycompletetasks =[], isLoading, refetch} = useQuery({
        queryKey: ["complete", user?.email],
        queryFn: async()=>{
            const res = await fetch(`http://localhost:5000/complete?email=${user?.email}`)
            const data = await res.json()
            return data
            isLoading()
        }
    
    })


    const handleComplete =(id)=>{
        fetch(`http://localhost:5000/complete/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({catagory: 'Not complete' })
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            toast.success("Task not completed")
            refetch()

        })
        .catch(e=> console.error(e))
    }



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



    return (
        <div className='px-10 md:px-0'>

        {
            isLoading && <div className='flex items-center justify-center'><Spiner></Spiner></div>
        }

        {mycompletetasks.length === 0 && <h1 className='text-3xl my-5 mx-auto w-1/2 p-5 text-center font-bold bg-purple-50'>You have no task</h1>}


            <div className='grid my-10 grid-cols-1 md:grid-cols-3 gap-14'>
            {
                mycompletetasks.map(task =><SingleComplete
                key={task._id}
                task={task}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
                ></SingleComplete>)
            }
        </div>
        </div>
    );
};

export default CompliteTask;