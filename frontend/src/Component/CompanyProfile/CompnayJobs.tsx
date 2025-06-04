import React from 'react'
import { jobList } from '../Data/JobsData'
import JobCard from '../FindJobs/JobCard'

const CompnayJobs = () => {
  return (
    <div className='flex mt-10 flex-wrap gap-3'>
      {
        jobList.map((job,index)=><JobCard key={index} {...job}/>)
      }
    </div>
  )
}

export default CompnayJobs
