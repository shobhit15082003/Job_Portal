import React, { useEffect, useState } from "react";

import JobCard from "../FindJobs/JobCard";
import { useParams } from "react-router-dom";
import { getAllJobs } from "../../Services/JobService";

const RecommendedJobs = (props: any) => {
  const { id } = useParams();
  const [jobList, setJobList] = useState<any>([{}]);
  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="">
      <div className="text-xl font-semibold mb-5 ">Recommended Jobs</div>
      <div className="flex bs:flex-col  flex-wrap gap-5 justify-between bs-mx:justify-start">
        {jobList?.map(
          (job: any, index: number) => index < 6 && id!=job.id && <JobCard {...job} />
        )}
      </div>
    </div>
  );
};

export default RecommendedJobs;
