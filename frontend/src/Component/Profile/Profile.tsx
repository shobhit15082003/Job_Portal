import React, { useEffect, useState } from "react";
import avatar from "../../assests/avatar-9.png";
import {
  IconAdjustments,
  IconBriefcase,
  IconDeviceFloppy,
  IconEdit,
  IconMapPin,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  FileInput,
  Overlay,
  TagsInput,
  Textarea,
} from "@mantine/core";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import SelectInput from "./SelectInput";
import fields from "../../Data/Profile";
import { profile } from "../../Data/TalentData";
import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Services/ProfileService";
import Info from "./Info";
import { changeProfile, setProfile } from "../../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { successNotification } from "../../Services/NotificationService";

const Profile = (props: any) => {
  const dispatch = useDispatch();

  const profile = useSelector((state: any) => state.profile);
  const notFromVideo = profile;
  const [edit, setEdit] = useState([false, false, false, false, false]);
  const [about, setAbout] = useState(notFromVideo.about);
  const [addExp, setAddExp] = useState(false);
  const [addCerti, setAddCerti] = useState(false);
  const [skills, setSkills] = useState<string[]>(notFromVideo.skills);
  const handleEdit = (index: any) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
  };
 


  const { hovered, ref } = useHover();

  const handleFileChange=async(image:any)=>{
    let picture:any=await getBase64(image);
    let updatedProfile={...profile,picture:picture.split(',')[1]};
    dispatch(changeProfile(updatedProfile));
    successNotification("Success","Profile Picture Updated Successfully.");
  }

  const getBase64=(file:any)=>{
    return new Promise((resolve,reject)=>{
      const reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload=()=>resolve(reader.result);
      reader.onerror=error=>reject(error);
    })
  }

  return (
    <div className="w-4/5 mx-auto">
      <div className="relative">
        <img className="rounded-t-2xl " src="/Profile/banner.jpg" alt="" />
        <div
          ref={ref}
          className="absolute flex items-center justify-center -bottom-1/3 left-3"
        >
          <Avatar
            className="!w-48 !h-48 border-mine-shaft-950 border-8 rounded-full"
            src={profile.picture?`data:image/jpeg;base64,${profile.picture}`:avatar}
            alt=""
          />
          {hovered && (
            <Overlay
              className="!rounded-full"
              color="#000"
              backgroundOpacity={0.75}
            />
          )}
          {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16 " />}
          {hovered && (
            <FileInput
              className="absolute  w-full z-[301] !h-full [&_*]:!h-full [&_*]:!rounded-full"
              variant="transparent"
              accept="image/png,image/jpeg"
              onChange={handleFileChange}
            />
          )}
        </div>
      </div>
      <div className="px-3 mt-16 ">
        {/* <div className="text-3xl font-semibold flex justify-between ">
          Jarrod Wood
          <ActionIcon
            onClick={() => handleEdit(0)}
            variant="subtle"
            color="brightSun.4"
            size="lg"
          >
            {edit[0] ? (
              <IconDeviceFloppy className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
        {edit[0] ? (
          <>
            <div className="flex gap-10 [&>*]:w-1/2">
              <SelectInput {...select[0]} />
              <SelectInput {...select[1]} />
            </div>
            <SelectInput {...select[2]} />
          </>
        ) : (
          <>
            <div className="text-xl flex gap-1 items-center">
              <IconBriefcase className="h-5 w-5" stroke={1.5} /> {props.role}{" "}
              Software Emgineer &bull; Google
            </div>
            <div className="flex gap-1 text-lg items-center text-mine-shaft-300">
              <IconMapPin stroke={1.5} className="h-5 w-5 " /> New York, USA
            </div>
          </>
        )} */}

        <Info />
      </div>

      <Divider mx="xs" size="xs" my="xl" />
      {/* <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">
          About
          <ActionIcon
            onClick={() => handleEdit(1)}
            variant="subtle"
            color="brightSun.4"
            size="lg"
          >
            {edit[1] ? (
              <IconDeviceFloppy className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>

        {edit[1] ? (
          <Textarea
            value={about}
            autosize
            minRows={3}
            placeholder="Enter about yourself..."
            onChange={(event) => setAbout(event.currentTarget.value)}
          />
        ) : (
          <div className="text-sm text-mine-shaft-300 text-justify ">
            {profile?.about}
          </div>
        )}
      </div> */}
      <About />
      <Divider mx="xs" my="xl" />
      {/* <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">
          Skills
          <ActionIcon
            onClick={() => handleEdit(2)}
            variant="subtle"
            color="brightSun.4"
            size="lg"
          >
            {edit[2] ? (
              <IconDeviceFloppy className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>

        {edit[2] ? (
          <TagsInput
            value={skills}
            onChange={setSkills}
            placeholder="Add skill"
            splitChars={[",", " ", "|"]}
          />
        ) : (
          <div className="flex flex-wrap gap-2 ">
            {profile.skills?.map((skill: any, index: number) => (
              <div
                key={index}
                className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1 "
              >
                {skill}
              </div>
            ))}
          </div>
        )}
      </div> */}
      <Skills />
      <Divider my="xl" mx="xs" />
      {/* <div className="px-3 ">
        <div className="text-2xl font-semibold mb-5 flex justify-between">
          Experience
          <div className="flex gap-2">
            <ActionIcon
              onClick={() => setAddExp(true)}
              variant="subtle"
              color="brightSun.4"
              size="lg"
            >
              <IconPlus className="h-4/5 w-4/5" />
            </ActionIcon>
            <ActionIcon
              onClick={() => handleEdit(3)}
              variant="subtle"
              color="brightSun.4"
              size="lg"
            >
              {edit[3] ? (
                <IconDeviceFloppy className="h-4/5 w-4/5" />
              ) : (
                <IconPencil className="h-4/5 w-4/5" />
              )}
            </ActionIcon>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {profile?.experiences?.map((exp: any, index: any) => (
            <ExpCard {...exp} key={index} edit={edit[3]} />
          ))}
          {addExp && <ExpInput add setEdit={setAddExp} />}
        </div>
      </div> */}
      <Experience />

      <Divider my="xl" mx="xs" />
      {/* <div className="px-3">
        <div className="text-2xl font-semibold mb-5 flex justify-between">
          Certifications
          <div className="flex gap-2">
            <ActionIcon
              onClick={() => setAddCerti(true)}
              variant="subtle"
              color="brightSun.4"
              size="lg"
            >
              <IconPlus className="h-4/5 w-4/5" />
            </ActionIcon>
            <ActionIcon
              onClick={() => handleEdit(4)}
              variant="subtle"
              color="brightSun.4"
              size="lg"
            >
              {edit[4] ? (
                <IconDeviceFloppy className="h-4/5 w-4/5" />
              ) : (
                <IconPencil className="h-4/5 w-4/5" />
              )}
            </ActionIcon>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {profile?.certifications?.map((certificate: any, index: any) => (
            <CertiCard {...certificate} key={index} edit={edit[4]} />
          ))}
          {addCerti && <CertiInput setEdit={setAddCerti} />}
        </div>
      </div> */}
      <Certificate />
    </div>
  );
};

export default Profile;
