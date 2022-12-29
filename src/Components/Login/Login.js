import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import {Link, useNavigate} from 'react-router-dom'
import { AuthContex } from '../../Context/Contex';


const Login = () => {
    const {login, googleSignin} = useContext(AuthContex)
    const navigate = useNavigate()




    const handleLogin =(e)=>{
        e.preventDefault()
        const form = e.target 
        const name = form.name.value 
        const email = form.email.value 
        const password = form.password.value 
        console.log(email, password)


        login(email, password)
        .then(res => {
            const user = res.user
            console.log(user)
            toast.success('Login successfuly ')
            navigate("/")
        })
        .catch(e => console.error(e))
    }



    const handleGoogle =()=>{
        googleSignin()
        .then(res => {
            console.log(res.user)
            toast.success('login succesfully')
            navigate('/')
        })
        .catch(e => console.error(e))
    }




    return (
        <div className='border'>
            <div className='my-10 mx-auto w-5/6 md:w-1/2 bg-purple-100 p-5 rounded shadow-lg'>
            <h1 className="text-center text-3xl font-bold py-2">Login</h1>

            <div className=' mx-auto w-10/12 p-4'>
            <form onSubmit={handleLogin} className="flex flex-col" >

            <label>Email</label>
            <input type="email" placeholder='email' name="email" className='border mb-4 p-3 rounded bg-white' />

            <label>Password</label>
            <input type="password" placeholder='password' name="password"  className='border mb-4 p-3 rounded bg-white' />



                <button type="submit" className='border  p-3 mb-3 text-white font-bold text-xl rounded bg-gradient-to-r from-violet-400 to-fuchsia-400'>Login</button>

                <p className='text-2xl font-bold text-center'>Or</p>


                </form>

                <button onClick={handleGoogle} type="submit" className='border w-full  p-3 mt-3 mb-6 text-white font-bold text-xl rounded bg-gradient-to-r from-violet-500 to-fuchsia-400'>Google sign in</button>

                <p className='text-center'>Do you have no account? Please <Link  className='font-bold text-violet-600 ' to="/registar">Register</Link></p>
              </div>
            
        </div>
        </div>
    );
};

export default Login;