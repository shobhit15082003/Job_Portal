import React, { useEffect, useState } from "react";
import PostJob from "../Component/PostJob/PostJob";
import PostedJob from "../Component/PostedJob/PostedJob";
import PostedJobDesc from "../Component/PostedJob/PostedJobDesc";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getJobPostedBy } from "../Services/JobService";

const PostedJobPage = () => {
  const { id } = useParams();
  const user = useSelector((state: any) => state.user);
  const [jobList, setJobList] = useState<any[]>([]);
  const [job, setJob] = useState<any>({});
  const navigate=useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getJobPostedBy(user.id)
      .then((res) => {
        setJobList(res);
        if(res && res.length>0 && Number(id)==0){
          navigate(`/posted-job/${res[0].id}`);
        }
        setJob(res.find((item: any) => item.id == id));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4">
      <div className="flex gap-5 ">
        <PostedJob job={job} jobList={jobList} />
        <PostedJobDesc {...job}/>
      </div>
    </div>
  );
};

export default PostedJobPage;
