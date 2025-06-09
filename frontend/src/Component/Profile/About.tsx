import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const About = () => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const [about, setAbout] = useState("");
  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setAbout(profile.about);
    } else {
      setEdit(false);
    }
  };
  const handleSave = () => {
    
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
              size="lg"
            >
              <IconCheck className="h-4/5 w-4/5" />
            </ActionIcon>
          )}
          <ActionIcon
            onClick={handleClick}
            variant="subtle"
            color={edit ? "red.8" : "brightSun.4"}
            size="lg"
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
