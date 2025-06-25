import { ActionIcon } from '@mantine/core'
import { IconDeviceFloppy, IconPencil, IconPlus, IconX } from '@tabler/icons-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ExpCard from './ExpCard'
import ExpInput from './ExpInput'
import { useMediaQuery } from '@mantine/hooks'

const Experience = () => {
    const profile=useSelector((state:any)=>state.profile);
const matches=useMediaQuery('(max-width:475px)');
    const [edit,setEdit]=useState(false);
    const [addExp,setAddExp]=useState(false);

    const handleEdit=()=>{
        setEdit(!edit);
        console.log(edit);
    }
    
  return (
     <div className="px-3 ">
        <div className="text-2xl font-semibold mb-5 flex justify-between">
          Experience
          <div className="flex gap-2">
            <ActionIcon
              onClick={() => setAddExp(true)}
              variant="subtle"
              color="brightSun.4"
              size={matches?"md":"lg"}
            >
              <IconPlus className="h-4/5 w-4/5" />
            </ActionIcon>
            <ActionIcon
              onClick={handleEdit}
              variant="subtle"
              color={edit?"red.8":"brightSun.4"}
              size={matches?"md":"lg"}
            >
              {edit ? (
                <IconX  className="h-4/5 w-4/5" />
              ) : (
                <IconPencil className="h-4/5 w-4/5" />
              )}
            </ActionIcon>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {profile?.experiences?.map((exp: any, index: any) => (
            <ExpCard index={index} {...exp} key={index} edit={edit} />
          ))}
          {addExp && <ExpInput add setEdit={setAddExp} />}
        </div>
      </div>
  )
}

export default Experience
