import React from "react";
import avatar from "../assests/avatar-9.png";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import { Button, Divider } from "@mantine/core";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";

const Profile = (props: any) => {
  return (
    <div className="w-2/3">
      <div className="relative">
        <img className="rounded-t-2xl " src="/Profile/banner.jpg" alt="" />
        <img
          className="rounded-full w-48 h-48 -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8"
          src={avatar}
          alt=""
        />
      </div>
      <div className="px-3 mt-16 ">
        <div className="text-3xl font-semibold flex justify-between ">
          {props.name}{" "}
          <Button color="brightSun.4" variant="light">
            Message
          </Button>{" "}
        </div>
        <div className="text-xl flex gap-1 items-center">
          <IconBriefcase className="h-5 w-5" stroke={1.5} /> {props.role} &bull;{" "}
          {props.company}
        </div>
        <div className="flex gap-1 text-lg items-center text-mine-shaft-300">
          <IconMapPin stroke={1.5} className="h-5 w-5 " /> {props.location}
        </div>
      </div>
      <Divider mx="xs" size="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3 ">About</div>
        <div className="text-sm text-mine-shaft-300 text-justify ">
          {props.about}
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3 ">Skills</div>
        <div className="flex flex-wrap gap-2 ">
          {props.skills.map((skill: any, index: any) => (
            <div
              key={index}
              className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1 "
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
      <Divider my="xl" mx="xs" />
      <div className="px-3 ">
        <div className="text-2xl font-semibold mb-5 ">Experience</div>
        <div className="flex flex-col gap-8">
          {props.experience.map((exp: any, index: any) => (
            <ExpCard {...exp} key={index} />
          ))}
        </div>
      </div>

      <Divider my="xl" mx="xs" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5 ">Certifications</div>
         <div className="flex flex-col gap-8">
          {props.certifications.map((certificate: any, index: any) => (
            <CertiCard {...certificate} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
