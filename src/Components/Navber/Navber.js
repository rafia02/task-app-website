import React, { useContext, useState } from 'react';
import { Bars3Icon, BeakerIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';
import { AuthContex } from '../../Context/Contex';
import { FaBeer, FaDraft2Digital, FaMoon, FaSun } from 'react-icons/fa';

const Navber = () => {
    const [open, setOpen] = useState(false)
    const {user, logout, dark, setDark} = useContext(AuthContex)



    const handleLogout =()=>{
        logout()
        .then(()=>{})
        .catch(e =>console.error(e))
    }




    return (
        <div className={` p-5 flex justify-between shadow ${dark ? 'bg-black text-white' : 'bg-purple-200 text-black'}`}>
            <div className='flex justify-center items-center'>
                <h1 className="font-bold  mr-2 text-center">TASK APP</h1>

                <div onClick={()=>setDark(!dark)}>  
                    {
                        dark ? <FaMoon></FaMoon> : <FaSun></FaSun>
                    }
                </div>

               

                {/* {
                    open ? <Bars3Icon className="h-6 w-6 text-gray-800" />
                    :
                    <XMarkIcon className="h-6 w-6 text-gray-800"></XMarkIcon>
                    
                  
                } */}


                
               
            </div>
            <ul className='flex justify-center'>

                <Link to="/" className='mr-5 font-semibold '>Add Task</Link>
                <Link to="/mytask" className='mr-5 font-semibold' >My Task</Link>
                <Link to="/completetask" className='mr-5 font-semibold' >Completed Tasks</Link>
                
                {
                    user?.uid ? <button onClick={handleLogout} className='mr-5 font-semibold' >Logout</button>
                    :
                    <Link to="/login" className='mr-5 font-semibold' >Login</Link>
                }
            </ul>
        </div>
    );
};

export default Navber;