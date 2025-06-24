import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApplyJobComp from "../Component/ApplyJob/ApplyJobComp";
import { getJob } from "../Services/JobService";

const ApplyJobPage = () => {
  const naviagte = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    getJob(id)
      .then((res) => {
        setJob(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Button
      my="md"
        onClick={() => naviagte(-1)}
        leftSection={<IconArrowLeft size={20} />}
        color="brightSun.4"
        variant="light"
        mb="xs"
      >
        Back
      </Button>

      <ApplyJobComp {...job} />
    </div>
  );
};

export default ApplyJobPage;
