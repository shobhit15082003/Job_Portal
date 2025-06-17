import { Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { activeJobs, drafts } from "../../Data/PostedJob";
import PostedJobCard from "./PostedJobCard";

const PostedJob = (props: any) => {
  const [activeTab, setActiveTab] = useState<string | null>("ACTIVE");
  useEffect(()=>{
    setActiveTab(props.job?.jobStatus||'ACTIVE');
  },[props.job]);
  return (
    <div className="w-1/5 mt-5">
      <div className="text-2xl font-semibold mb-5">Jobs</div>
      {/* <div>
        <Tabs autoContrast variant="pills" defaultValue="active">
          <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
            <Tabs.Tab value="active">Active [4]</Tabs.Tab>
            <Tabs.Tab value="draft">Drafts [1]</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="active">
            <div className="flex flex-col mt-5 gap-5 border-l-2 border-l-mine-shaft-400 ">
                {
                    activeJobs.map((item,index)=><PostedJobCard key={index} {...item}/>)
                }
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="draft">
            s
          </Tabs.Panel>
        </Tabs>
      </div> */}
      <div>
        <Tabs
          autoContrast
          variant="pills"
          value={activeTab}
          onChange={setActiveTab}
        >
          <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
            <Tabs.Tab value="ACTIVE">Active [{props.jobList?.filter((job:any)=>job?.jobStatus=="ACTIVE").length}]</Tabs.Tab>
            <Tabs.Tab value="DRAFT">Drafts [{props.jobList?.filter((job:any)=>job?.jobStatus=="DRAFT").length}]</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
      <div className="flex flex-col mt-5 gap-5 flex-wrap ">
        {
          props.jobList?.filter((job:any)=>job?.jobStatus==activeTab).map((item:any,index:any)=><PostedJobCard key={index} {...item}/>)
        }
      </div>
    </div>
  );
};

export default PostedJob;
