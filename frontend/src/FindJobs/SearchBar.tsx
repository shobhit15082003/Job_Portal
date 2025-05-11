
import React from 'react'
import MultiInput from './MultiInput'
import { dropdownData } from '../Data/JobsData'
import { Divider } from '@mantine/core'

const SearchBar = () => {
  return (
    <div className='flex px-5 py-8 '>
      {
        dropdownData.map((item,index)=><><div key={index} className='w-1/5'>
          <MultiInput {...item}/>
        </div>
        <Divider size="sm" orientation='vertical' mr="xs" />
        </>)
      }
    </div>
  )
}

export default SearchBar
