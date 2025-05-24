import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconAdjustments, IconBookmark, IconMapPin } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";
import { card, skills } from "../Data/JobDescData";

const JobDesc = () => {
  return (
    <div className="w-2/3">
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-800 rounded-xl ">
            <img className="h-14" src={`/Icons/Google.png`} alt="" />
          </div>
          <div>
            <div className="font-semibold text-2xl">Software Engineer III</div>
            <div className="text-lg text-mine-shaft-300 ">
              Google &bull; 3 days ago &bull; 48 Applicants
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center ">
          <Link to="/apply-job">
            <Button color="brightSun.4" size="sm" variant="light">
              Apply
            </Button>
          </Link>
          <IconBookmark className="text-bright-sun-400 cursor-pointer" />
        </div>
      </div>
      <Divider my="xl" />
      <div className="flex justify-between ">
        {card.map((item: any, index: number) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="flex flex-col items-center gap-1">
              <ActionIcon
                variant="light"
                size="lg"
                radius="xl"
                aria-label="Settings"
                className="!h-12 !w-12"
                color="brightSun.4"
              >
                <IconComponent className="h-4/5 w-4/5" stroke={1.5} />
              </ActionIcon>
              <div className="text-mine-shaft-300 text-sm">{item.name}</div>
              <div className="font-semibold">{item.value}</div>
            </div>
          );
        })}
      </div>
      <Divider my="xl" />
      <div>
        <div className="text-xl font-semibold mb-5">Required Skills</div>
        <div className="flex flex-wrap gap-2 ">
            {
                skills.map((skill:any,index:any)=><ActionIcon key={index}
                variant="light"
                size="lg"
                radius="xl"
                aria-label="Settings"
                className="!h-fit !w-fit font-medium !text-sm "
                color="brightSun.4"
                p="xs"
              >
                {skill}
              </ActionIcon>
                
                )
            }
              
        </div>
      </div>
      <Divider my="xl" />
      
    </div>
  );
};

export default JobDesc;
