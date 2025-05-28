import React from "react";
import avatar2 from "../assests/avatar-9.png";
import avatar1 from "../assests/avatar-7.png";
import avatar3 from "../assests/avatar-8.png";

import { Avatar, AvatarGroup, Button, Divider, Tabs } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import AboutComp from "./AboutComp";
import CompnayJobs from "./CompnayJobs";
import CompanyEmployees from "./CompanyEmployees";
const Company = (props: any) => {
  return (
    
    <div className="w-3/4 ">
      <div className="relative">
        <img className="rounded-t-2xl " src="/Profile/banner.jpg" alt="" />
        <img
          className="rounded-3xl bg-mine-shaft-950  w-36 h-36 -bottom-1/4 absolute left-5 p-2  border-mine-shaft-950 border-8"
          src="/Icons/Google.png"
          alt=""
        />
      </div>
      <div className="px-3 mt-12 ">
        <div className="text-3xl font-semibold flex justify-between ">
          Google
          <Avatar.Group>
            <Avatar src={avatar2} />
            <Avatar src={avatar1} />
            <Avatar src={avatar3} />
            <Avatar>+10K</Avatar>
          </Avatar.Group>
        </div>
        <div className="flex gap-1 text-lg items-center text-mine-shaft-300">
          <IconMapPin stroke={1.5} className="h-5 w-5 " /> New York, USA
        </div>
        <Divider mx="xs" size="xs" my="xl" />
        <div>
          <Tabs variant="outline" radius="lg" defaultValue="about">
            <Tabs.List className="[&_button]:!text-lg font-semibold mb-5  [&_button[data-active='true']]:text-bright-sun-400 ">
              <Tabs.Tab value="about">About</Tabs.Tab>
              <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
              <Tabs.Tab value="employees">Employees</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="about"><AboutComp/></Tabs.Panel>
            <Tabs.Panel value="jobs"><CompnayJobs/></Tabs.Panel>
            <Tabs.Panel value="employees"><CompanyEmployees/></Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Company;
