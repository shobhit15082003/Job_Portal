import React, { useEffect, useState } from 'react'
import Sort from '../FindJobs/Sort'

import TalentCard from './TalentCard';
import { getAllProfile } from '../../Services/ProfileService';

const Talents = () => {
  const [talents,setTalents]=useState<any>();
  useEffect(()=>{
    getAllProfile().then((res)=>{
      setTalents(res);
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  return (
     <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold ">Talents</div>
        <Sort />
      </div>
      <div className="mt-10 flex flex-wrap gap-5 justify-around">
        {
          talents.map((talent:any,index:any)=><TalentCard key={index} {...talent}/>)
        }
      </div>
      
    </div>
  )
}

export default Talents
