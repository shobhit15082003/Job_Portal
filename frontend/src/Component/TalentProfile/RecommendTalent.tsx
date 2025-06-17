import React from 'react'
import { talents } from '../../Data/TalentData'
import TalentCard from '../FindTalent/TalentCard'
import { useParams } from 'react-router-dom'

const RecommendTalent = (props:any) => {
  const {id}=useParams();
  return (
    <div className=''>
      <div className='text-xl font-semibold mb-5 '>
        Recommended Talent
      </div>
      <div className='flex flex-col flex-wrap gap-5 justify-around'>
        {
            props?.talents?.map((talent:any,index:any)=>index<4 && id!=talent.id && <TalentCard {...talent}/>)
        }
      </div>
    </div>
  )
}

export default RecommendTalent
