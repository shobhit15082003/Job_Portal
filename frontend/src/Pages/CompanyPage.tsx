import { Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Company from '../Component/CompanyProfile/Company'
import SimilarCompanies from '../Component/CompanyProfile/SimilarCompanies'

const CompanyPage = () => {
    const navigate=useNavigate();
    useEffect(()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    },[])
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
          
          <Button onClick={()=>navigate(-1)} my="md" leftSection={<IconArrowLeft size={20}/>} color='brightSun.4' variant='light' >Back</Button>
        <div className='flex gap-5 justify-between '>
          <Company/>
          <SimilarCompanies/>
        </div>
    </div>
  )
}

export default CompanyPage
