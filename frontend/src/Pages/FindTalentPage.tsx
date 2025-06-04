import { Divider } from '@mantine/core'
import React from 'react'
import SearchBar from '../Component/FindTalent/SearchBar'
import Talents from '../Component/FindTalent/Talents'



const FindTalentPage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
        
        <SearchBar/>
        <Divider size="xs" mx="md"/>
        <Talents/>
    </div>
  )
}

export default FindTalentPage
