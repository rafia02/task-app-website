import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContex } from '../../Context/Contex';
import toast from 'react-hot-toast';

const Registar = () => {
    const {registar, updateUserProfile} = useContext(AuthContex)


    const handleRegister =(e)=>{
        e.preventDefault()
        const form = e.target 
        const name = form.name.value 
        const email = form.email.value 
        const password = form.password.value 
        console.log(name, email, password)


        registar(email, password)
        .then(res => {
            const user = res.user
            console.log(user)

            const profile = {
                displayName: name
            }

            updateUserProfile(profile)
            .then(()=>{})
            .catch(e => console.error(e))
            form.reset()
            toast.success('Successfully register')
        })
        .catch(e => console.error(e))
    }


    return (
       <div className='border'>
         <div className='my-10 mx-auto w-5/6 md:w-1/2 bg-purple-100 p-5 rounded shadow-lg'>
        <h1 className="text-center text-3xl font-bold py-3">Register</h1>


        <form onSubmit={handleRegister} className='flex flex-col mx-auto w-10/12 p-4'>

            <label>Name</label>
            <input type="text" placeholder='name' name="name"  className='border mb-4 p-3 rounded bg-white' />

            <label>Email</label>
            <input type="email" placeholder='email' name="email"  className='border mb-4 p-3 rounded bg-white' />

            <label>Password</label>
            <input type="password" placeholder='password' name="password" className='border mb-4 p-3 rounded bg-white' />

           

            <button type="submit" className='border  p-3 mb-6 text-white font-bold text-xl rounded bg-gradient-to-r from-violet-400 to-fuchsia-400'>Register</button>
            
            <p className='text-center'>Already have an account? Please <Link  className='font-bold text-violet-600 ' to="/login">Login</Link></p>

        </form>
    </div>
       </div>
    );
};

export default Registar;