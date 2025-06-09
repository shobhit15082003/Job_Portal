import React, { useState } from "react";
import fields from "../../Data/Profile";
import { ActionIcon } from "@mantine/core";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
} from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { hasLength, isEmail, useForm } from "@mantine/form";

const Info = () => {
  const select = fields;
  const [edit, setEdit] = useState(false);
  const handleClick = () => {
    if(!edit){
        setEdit(true);
    }
    else{
        setEdit(false);
        console.log(form.getValues());
    }
  };

  const form = useForm({
    mode: "controlled",
    initialValues: { jobTitle: "", company: "", location:"" },
  });

  return (
    <>
      <div className="text-3xl font-semibold flex justify-between ">
        Jarrod Wood
        <ActionIcon
          onClick={() => handleClick}
          variant="subtle"
          color="brightSun.4"
          size="lg"
        >
          {edit ? (
            <IconDeviceFloppy className="h-4/5 w-4/5" />
          ) : (
            <IconPencil className="h-4/5 w-4/5" />
          )}
        </ActionIcon>
      </div>
      {edit ? (
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
            <IconBriefcase className="h-5 w-5" stroke={1.5} />
            {/* {props.role}{" "} */}
            Software Emgineer &bull; Google
          </div>
          <div className="flex gap-1 text-lg items-center text-mine-shaft-300">
            <IconMapPin stroke={1.5} className="h-5 w-5 " /> New York, USA
          </div>
        </>
      )}
    </>
  );
};

export default Info;
