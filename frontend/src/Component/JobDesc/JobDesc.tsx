import { ActionIcon, Button, Divider } from "@mantine/core";
import {
  IconAdjustments,
  IconBookmark,
  IconBookmarkFilled,
  IconMapPin,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { card, desc, skills } from "../../Data/JobDescData";
//@ts-ignore
import DOMPurify from "dompurify";
import { timeAgo } from "../../Services/UtilitiesService";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { postJob } from "../../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../../Services/NotificationService";

const JobDesc = (props: any) => {
  const data = DOMPurify.sanitize(props.description);
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const handleSaveJobs = () => {
    let savedJobs: any = profile.savedJobs ? [...profile.savedJobs] : [];
    if (savedJobs?.includes(props.id)) {
      savedJobs = savedJobs?.filter((id: any) => id !== props.id);
    } else {
      savedJobs = [...savedJobs, props.id];
    }
    let updatedProfile = { ...profile, savedJobs: savedJobs };
    dispatch(changeProfile(updatedProfile));
  };
  const user = useSelector((state: any) => state.user);
  const [applied, setApplied] = useState(false);
  useEffect(() => {
    const hasApplied = props.applicants?.some(
      (applicant: any) => applicant.applicantId === user.id
    );
    if (hasApplied) {
      setApplied(true);
    } else setApplied(false);
    //  if (
    //       props.applicants?.filter((applicant: any) => applicant.applicantId !== user.id)
    //         .length > 0
    //     ){
    //       setApplied(true);
    //     }
    //     else
    //       setApplied(false);
  }, [props]);

  const handleClose = () => {
    postJob({ ...props, jobStatus: "CLOSED" })
      .then((res) => {
        successNotification("Success", "Job Closed Successfully");
      })
      .catch((err) => {
        errorNotification("Error", err.response.data.errorMessage);
      });
  };

  return (
    <div className="w-2/3 bs-mx:w-full">
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-800 rounded-xl flex shrink-0">
            <img className="h-14 xs-mx:h-10 xs-mx:w-10" src={`/Icons/${props.company}.png`} alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-2xl xs-mx:text-xl">{props.jobTitle}</div>
            <div className="text-lg text-mine-shaft-300 flex xs-mx:flex-wrap xs-mx:text-base ">
             <span> {props.company} </span><span>&bull; {timeAgo(props.postTime||"")} days ago {" "}</span>
              <span className="">&bull; {props.applicants ? props.applicants.length : 0} Applicants</span>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-col gap-2 items-center sm-mx:my-5 sm-mx:w-full sm-mx:[&>button]:w-1/2">
          {(props.edit || !applied) && (
            <Link to={props.edit?`/post-job/${props.id}`:`/apply-job/${props.id}`}>
              <Button color="brightSun.4" size="sm" variant="light">
                {props.close ? "Reopen" : props.edit ? "Edit" : "Apply"}
              </Button>
            </Link>
          )}
          {applied && !props.edit && (
            <Button color="green.8" size="sm" variant="light">
              Applied
            </Button>
          )}
          {props.edit && !props.closed ? (
            <Button
              color="red.5"
              size="sm"
              variant="outline"
              onClick={handleClose}
            >
              Close
            </Button>
          ) : profile.savedJobs?.includes(props.id) ? (
            <IconBookmarkFilled
              onClick={handleSaveJobs}
              className="text-bright-sun-400  cursor-pointer"
              stroke={1.5}
            />
          ) : (
            <IconBookmark
              onClick={handleSaveJobs}
              className="hover:text-bright-sun-400 text-mine-shaft-300 cursor-pointer"
              stroke={1.5}
            />
          )}
        </div>
      </div>
      <Divider my="xl" />
      <div className="flex justify-between gap-4 sm-mx:flex-wrap">
        {card.map((item: any, index: number) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="flex flex-col items-center gap-1">
              <ActionIcon
                variant="light"
                size="lg"
                radius="xl"
                aria-label="Settings"
                className="!h-12 !w-12 xs-mx:!h-8 xs-mx:!w-8"
                color="brightSun.4"
              >
                <IconComponent className="h-4/5 w-4/5" stroke={1.5} />
              </ActionIcon>
              <div className="text-mine-shaft-300 text-sm ">{item.name}</div>
              <div className="font-semibold xs-mx:text-sm">
                {props ? props[item.id] : "NA"}{" "}
                {item.id == "packageOffered" && <>LPA</>}
              </div>
            </div>
          );
        })}
      </div>
      <Divider my="xl" />
      <div>
        <div className="text-xl font-semibold mb-5">Required Skills</div>
        <div className="flex flex-wrap gap-2 ">
          {props?.skillsRequired?.map((skill: any, index: number) => (
            <ActionIcon
              key={index}
              variant="light"
              size="lg"
              radius="xl"
              aria-label="Settings"
              className="!h-fit !w-fit font-medium !text-sm xs-mx:!text-xs"
              color="brightSun.4"
              p="xs"
            >
              {skill}
            </ActionIcon>
          ))}
        </div>
      </div>
      <Divider my="xl" />
      <div
        className="[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify xs-mx:[&_p]:text-xs xs-mx:[&_li]:text-sm"
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>
      <Divider my="xl" />
      <div>
        <div className="text-xl font-semibold mb-5">About Company</div>
        <div className="flex justify-between mb-3 xs-mx:flex-wrap xs-mx:gap-2">
          <div className="flex gap-2 items-center">
            <div className="p-3 bg-mine-shaft-800 rounded-xl ">
              <img className="h-8" src={`/Icons/${props.company}.png`} alt="" />
            </div>
            <div className="flex flex-col ">
              <div className="font-medium text-lg">{props.company}</div>
              <div className=" text-mine-shaft-300 ">10k+ Employees</div>
            </div>
          </div>

          <Link to={`/company/${props.company}`}>
            <Button color="brightSun.4" variant="light">
              Company Page
            </Button>
          </Link>
        </div>
        <div className="text-mine-shaft-300 text-justify xs-mx:text-sm ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo corrupti
          sapiente mollitia quisquam quidem. Totam nihil provident soluta?
          Aspernatur, error atque autem commodi voluptatem illo quas
          voluptatibus modi impedit expedita fuga aperiam at numquam molestiae
          dolorum nihil reprehenderit, recusandae quae?
        </div>
      </div>
    </div>
  );
};

export default JobDesc;
