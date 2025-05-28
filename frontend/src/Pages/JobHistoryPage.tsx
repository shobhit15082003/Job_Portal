import React, { useEffect } from "react";
import JobHistory from "../JobHistory/JobHistory";

const JobHistoryPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4">
      <div className="my-5">
        <JobHistory/>
      </div>
    </div>
  );
};

export default JobHistoryPage;
