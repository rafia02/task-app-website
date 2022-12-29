
import { useContext, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AddTask from './Components/AddTask/AddTask';
import CompliteTask from './Components/CompliteTask/CompliteTask';
import Login from './Components/Login/Login';
import Mytask from './Components/MyTask/Mytask';
import Registar from './Components/Registar/Registar';
import Main from './Layout/Main';
import toast, { Toaster } from 'react-hot-toast';
import UpdateTask from './Components/MyTask/UpdateTask';


function App() {
 const router = createBrowserRouter([
    {path: '/', element: <Main></Main>, children: [
      {path: '/', element: <AddTask></AddTask>},
      {path: '/mytask', element: <Mytask></Mytask>},
      {path: '/completetask', element: <CompliteTask></CompliteTask>},
      {path: '/login', element: <Login></Login>},
      {path: '/registar', element: <Registar></Registar>},
      {path: '/update', element: <UpdateTask></UpdateTask>}
    ] }
  ])





  return (
    <div className='max-w-screen-lg mx-auto'>

      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
      
    </div>
  );
}

export default App