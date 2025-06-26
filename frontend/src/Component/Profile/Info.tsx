import React, { useState } from "react";
import fields from "../../Data/Profile";
import { ActionIcon, NumberInput } from "@mantine/core";
import {
  IconBriefcase,
  IconCheck,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const Info = () => {
  const select = fields;
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const matches=useMediaQuery('(max-width:475px)');
  const [edit, setEdit] = useState(false);
  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({
        jobTitle: profile.jobTitle,
        company: profile.company,
        location: profile.location,
        totalExp:profile.totalExp,
      });
    } else {
      setEdit(false);
    }
  };

  const form = useForm({
    mode: "controlled",
    initialValues: { jobTitle: "", company: "", location: "", totalExp:0 },
  });

  const handleSave=()=>{
    setEdit(false);
      let updatedProfile = { ...profile, ...form.getValues() };
      dispatch(changeProfile(updatedProfile));
      console.log(updatedProfile);
      successNotification("Success", "Profile Updated Successfully.");
  }
  return (
    <>
      <div className="text-3xl xs-mx:text-2xl  font-semibold flex justify-between ">
        {user.name}
       
        <div>
          {edit && <ActionIcon
            onClick={handleSave}
            variant="subtle"
            color={edit?"green.8":"brightSun.4"}
            size={matches?"md":"lg"}
          >
            
              <IconCheck className="h-4/5 w-4/5" />
        
          </ActionIcon>}
          <ActionIcon
            onClick={handleClick}
            variant="subtle"
            color={edit?"red.8":"brightSun.4"}
           size={matches?"md":"lg"}
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
      </div>
      {edit ? (
        <>
          <div className="flex gap-10 md-mx:gap-5  [&>*]:w-1/2 sm-mx:[&>*]:w-full xs-mx:w-full xs-mx:flex-wrap my-3">
            <SelectInput form={form} name="jobTitle" {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />
          </div>
          <div className="flex gap-10 md-mx:gap-5  [&>*]:w-1/2 sm-mx:[&>*]:w-full my-3 xs-mx:w-full xs-mx:flex-wrap">
          <SelectInput form={form} name="location" {...select[2]} />
          <NumberInput withAsterisk label="Experience" min={0} max={50} clampBehavior="strict" hideControls {...form.getInputProps('totalExp')} />
          </div>
        </>
      ) : (
        <>
          <div className="text-xl xs-mx:text-base flex gap-1 items-center">
            <IconBriefcase className="h-5 w-5" stroke={1.5} />
            {/* {props.role}{" "} */}
            {profile.jobTitle} &bull; {profile.company}
          </div>
          <div className="flex gap-1 text-lg xs-mx:text-base items-center text-mine-shaft-300">
            <IconMapPin stroke={1.5} className="h-5 w-5 " /> {profile.location}
          </div>
          <div className="flex gap-1 text-lg xs-mx:text-base items-center text-mine-shaft-300">
            <IconBriefcase stroke={1.5} className="h-5 w-5 " />Experience: {profile.totalExp} {profile.totalExp>1?"Years":"Year"} 
          </div>
        </>
      )}
    </>
  );
};

export default Info;
