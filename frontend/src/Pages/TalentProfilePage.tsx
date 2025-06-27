import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../Component/TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import RecommendTalent from "../Component/TalentProfile/RecommendTalent";
import { getAllProfile } from "../Services/ProfileService";

const TalentProfilePage = () => {
  const navigate = useNavigate();
  const [talents, setTalents] = useState<any[]>([]);
  useEffect(() => {
    getAllProfile()
      .then((res) => setTalents(res))
      .catch((error) => {
        console.log(error);
      });
  }, []);
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

      <div className="flex gap-5 lg-mx:flex-wrap ">
        <Profile {...profile} />
        <RecommendTalent talents={talents} />
      </div>
    </div>
  );
};

export default TalentProfilePage;
