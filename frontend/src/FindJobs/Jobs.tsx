import React from 'react'
import Sort from './Sort'
import JobCard from './JobCard'

const Jobs = () => {
  return (
    <div className='p-5'>
      
      <div className='flex justify-between'>
        <div className='text-2xl font-semibold '>
            Recommended Jobs
        </div>
        
            <Sort/>
       
      </div>
      <JobCard/>
    </div>
  )
}

export default Jobs
