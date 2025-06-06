import React, { useEffect } from 'react'
import PostJob from '../Component/PostJob/PostJob';
import PostedJob from '../Component/PostedJob/PostedJob';
import PostedJobDesc from '../Component/PostedJob/PostedJobDesc';

const PostedJobPage = () => {
  
    useEffect(()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    },[])
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4">
          
         
        <div className='flex gap-5 '>
         <PostedJob/>
         <PostedJobDesc/>
        </div>
    </div>
  )
}

export default PostedJobPage
