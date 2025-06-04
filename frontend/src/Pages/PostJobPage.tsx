import { Button, Divider } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import PostJob from '../Component/PostJob/PostJob'

const PostJobPage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
        
        <PostJob/>
    </div>
  )
}

export default PostJobPage
