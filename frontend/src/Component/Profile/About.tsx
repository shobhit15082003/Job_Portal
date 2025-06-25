import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const About = () => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const [about, setAbout] = useState("");
  const dispatch =useDispatch();
  const matches=useMediaQuery('(max-width:475px)');
  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setAbout(profile.about);
    } else {
      setEdit(false);
    }
  };
  const handleSave = () => {
    setEdit(false);
      let updatedProfile = { ...profile, about:about };
      dispatch(changeProfile(updatedProfile));
      console.log(updatedProfile);
      successNotification("Success", "About Updated Successfully.");
  };
  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        About
        <div>
          {edit && (
            <ActionIcon
              onClick={handleSave}
              variant="subtle"
              color={edit ? "green.8" : "brightSun.4"}
              size={matches?"md":"lg"}
            >
              <IconCheck className="h-4/5 w-4/5" />
            </ActionIcon>
          )}
          <ActionIcon
            onClick={handleClick}
            variant="subtle"
            color={edit ? "red.8" : "brightSun.4"}
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
    </div>
  );
};

export default About;
