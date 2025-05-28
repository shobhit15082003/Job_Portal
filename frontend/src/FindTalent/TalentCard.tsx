import { Avatar, Button, Divider, Modal, Text } from '@mantine/core'
import {IconCalendarMonth, IconHeart, IconMapPin } from '@tabler/icons-react'
import React, { useRef, useState } from 'react'
import avataricon from '../assests/avatar-8.png';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { DateInput, TimeInput } from '@mantine/dates';

const TalentCard = (props:any) => {
  const [opened,{open,close}]=useDisclosure(false);
  const [value,setValue]=useState<Date | null>(null);
  const ref=useRef<HTMLInputElement>(null);
  return (
     <div className='bg-mine-shaft-900 p-4 w-96  flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400  '>
      <div className='flex justify-between '>
        <div className='flex gap-2 items-center'>
          <div className='p-2 bg-mine-shaft-800 rounded-full '>
            <Avatar size="lg" src={`${props.image}.png`} alt=''/>
          </div>
          <div>
            <div className='font-semibold text-lg '>{props.name}</div>
            <div className='text-sm text-mine-shaft-300 '>{props.role} &bull; {props.company}</div>
          </div>
        </div>
        <IconHeart className='text-mine-shaft-300 cursor-pointer'/>
      </div>
      <div className='flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs'>
        {
            props.topSkills?.map((skill:any,index:any)=><div key={index}>{skill}</div>)
        }
      </div>
      <Text className='!text-xs text-justify !text-mine-shaft-300 '  lineClamp={2}>
        {props.about}
      </Text>
      <Divider size="xs" color='mineShaft.7' />
      <div className='flex justify-between '>
        <div className='font-semibold text-mine-shaft-200 '>
          {props.expectedCtc}
        </div>
        <div className='flex gap-1 text-xs items-center text-mine-shaft-400'>
          <IconMapPin stroke={1.5} className='h-5 w-5 '/> {props.location}
        </div>
      </div>
      <Divider size="xs" color='mineShaft.7' />
      <div className='flex [&>*]:w-1/2 [&>*]:p-1 '>
        <Link to="/talent-profile">
            <Button color='brightSun.4' variant='light' fullWidth>Profile</Button>
        </Link>
        <div>
          {
            props.posted?<Button onClick={open} rightSection={<IconCalendarMonth className='h-5 w-5'/>} color='brightSun.4' variant='outline' fullWidth>Schedule</Button>:
            <Button color='brightSun.4' variant='outline' fullWidth>Message</Button>
          }
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
        <div className='flex flex-col gap-4 '>
          <DateInput value={value} minDate={new Date()} onChange={(val) => setValue(val ? new Date(val) : null)} label="Date" placeholder='Enter date'/>
          <TimeInput label="Time" ref={ref} onClick={()=>ref.current?.showPicker()} />
           <Button color='brightSun.4' variant='outline' fullWidth>Schedule</Button>
        </div>
      </Modal>
    </div>
  )
}

export default TalentCard
