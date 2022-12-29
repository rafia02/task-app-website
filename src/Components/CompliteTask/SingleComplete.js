import React from 'react';

const SingleComplete = ({task, handleComplete, handleDelete}) => {
    const {text, img, _id} = task
    return (
        <div className='shadow-xl flex flex-col relative rounded mb-5 bg-purple-50'>
        <div className='w-full h-48'>
           <img src={img} className="w-full h-full rounded" alt="" />
        </div>
        <p className='text-justify mb-10 text-lg pt-3 px-5'><small className='font-bold'>Task :</small> <small>{text}</small></p>
 
      
        
        
       
        <div className='flex justify-between px-5 mb-5 top-40 bottom-0'>
            <button onClick={()=>handleComplete(_id)} className='border outline-none text-sm text-white font-bold p-2 bg-violet-500 hover:bg-violet-700 rounded'>Not Complete</button>
            <button onClick={()=>handleDelete(_id)} className='border outline-none text-sm text-white font-bold p-2 bg-red-500 hover:bg-red-700 rounded'>Delete</button>
            
        </div>

    </div>
    );
};

export default SingleComplete;