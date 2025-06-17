import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../Component/TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import RecommendTalent from "../Component/TalentProfile/RecommendTalent";

const TalentProfilePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Button
        leftSection={<IconArrowLeft size={20} />}
        my="sm"
        onClick={() => navigate(-1)}
        color="brightSun.4"
        variant="light"
      >
        Back
      </Button>

      <div className="flex gap-5 ">
        <Profile {...profile} />
        <RecommendTalent />
      </div>
    </div>
  );
};

export default TalentProfilePage;
