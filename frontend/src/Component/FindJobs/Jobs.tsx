import React, { useEffect, useState } from "react";
import Sort from "./Sort";
import JobCard from "./JobCard";
import { getAllJobs } from "../../Services/JobService";

const Jobs = () => {
  const [jobList, setJobList] = useState([{}]);
  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold ">Recommended Jobs</div>

        <Sort />
      </div>
      <div className="mt-10 flex flex-wrap gap-5 ">
        {jobList.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
      {/* <JobCard/> */}
    </div>
  );
};

export default Jobs;
