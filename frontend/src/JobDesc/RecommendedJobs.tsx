import React from 'react'
import { jobList } from '../Data/JobsData'
import JobCard from '../FindJobs/JobCard'

const RecommendedJobs = () => {
  return (
     <div className=''>
      <div className='text-xl font-semibold mb-5 '>
        Recommended Jobs
      </div>
      <div className='flex flex-col flex-wrap gap-5 justify-between'>
        {
            jobList.map((job:any,index:any)=>index<6 && <JobCard {...job}/>)
        }
      </div>
    </div>
  )
}

export default RecommendedJobs
