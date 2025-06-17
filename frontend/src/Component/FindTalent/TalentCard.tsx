import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import avataricon from "../assests/avatar-8.png";
import { Link, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { DateInput, TimeInput } from "@mantine/dates";
import { getProfile } from "../../Services/ProfileService";
import avatarImage from "../../assests/avatar-9.png";
import { changeAppStatus } from "../../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../../Services/NotificationService";
import {
  formatInterviewTime,
  openBase64PDF,
} from "../../Services/UtilitiesService";

const TalentCard = (props: any) => {
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
  useEffect(() => {
    if (props.applicantId) {
      getProfile(props.applicantId)
        .then((res) => {
          setProfile(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setProfile(props);
    }
  }, [props]);
  const ref = useRef<HTMLInputElement>(null);
  const handleOffer = (status: string) => {
    let interview: any = {
      id,
      applicantId: profile?.id,
      applicationStatus: status,
    };
    if (status == "INTERVIEWING") {
      const [hours, minutes] = time.split(":").map(Number);
      date?.setHours(hours.minutes);
      interview = { ...interview, interviewTime: date };
    }
    changeAppStatus(interview)
      .then((res) => {
        if (status == "INTERVIEWING")
          successNotification(
            "Interview Scheduled",
            "Interview Scheduled Successfully"
          );
        else if (status == "OFFERED")
          successNotification("Offered", "Offer has been Sent Successfully");
        else 
          successNotification("REJECTED","Applicant had been Rejected");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        errorNotification("Error", err.response.data.errorMessage);
      });
  };
  return (
    <div className="bg-mine-shaft-900 p-4 w-96  flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400  ">
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full ">
            <Avatar
              size="lg"
              src={
                profile.picture
                  ? `data:image/jpeg;base64,${profile.picture}`
                  : avatarImage
              }
              alt=""
            />
          </div>
          <div>
            <div className="font-semibold text-lg ">{props.name}</div>
            <div className="text-sm text-mine-shaft-300 ">
              {profile.jobTitle} &bull; {profile.company}
            </div>
          </div>
        </div>
        <IconHeart className="text-mine-shaft-300 cursor-pointer" />
      </div>
      <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        {profile?.skills?.map(
          (skill: any, index: any) =>
            index < 4 && <div key={index}>{skill}</div>
        )}
      </div>
      <Text
        className="!text-xs text-justify !text-mine-shaft-300 "
        lineClamp={2}
      >
        {profile.about}
      </Text>
      <Divider size="xs" color="mineShaft.7" />
      {props.invited ? (
        <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
          <IconCalendarMonth stroke={1.5} /> Interview:{" "}
          {formatInterviewTime(props.interviewTime)}
        </div>
      ) : (
        <div className="flex justify-between ">
          <div className="font-semibold text-mine-shaft-200 ">23 LPA</div>
          <div className="flex gap-1 text-xs items-center text-mine-shaft-400">
            <IconMapPin stroke={1.5} className="h-5 w-5 " /> {profile.location}
          </div>
        </div>
      )}

      <Divider size="xs" color="mineShaft.7" />
      <div className="flex [&>*]:w-1/2 [&>*]:p-1 ">
        {!props.invited && (
          <>
            <Link to={`/talent-profile${profile.id}`}>
              <Button color="brightSun.4" variant="light" fullWidth>
                Profile
              </Button>
            </Link>
            <div>
              {props.posted ? (
                <Button
                  onClick={open}
                  rightSection={<IconCalendarMonth className="h-5 w-5" />}
                  color="brightSun.4"
                  variant="outline"
                  fullWidth
                >
                  Schedule
                </Button>
              ) : (
                <Button color="brightSun.4" variant="outline" fullWidth>
                  Message
                </Button>
              )}
            </div>
          </>
        )}
        {props.invited && (
          <>
            <div>
              <Button
                onClick={() => handleOffer("OFFERED")}
                rightSection={<IconCalendarMonth className="h-5 w-5" />}
                color="brightSun.4"
                variant="outline"
                fullWidth
              >
                Accept
              </Button>
            </div>
            <div>
              <Button
                onClick={() => handleOffer("REJECTED")}
                rightSection={<IconCalendarMonth className="h-5 w-5" />}
                color="brightSun.4"
                variant="light"
                fullWidth
              >
                Reject
              </Button>
            </div>
          </>
        )}
        <Link to="/talent-profile">
          <Button color="brightSun.4" variant="light" fullWidth>
            Profile
          </Button>
        </Link>
        <div>
          {props.posted ? (
            <Button
              onClick={open}
              rightSection={<IconCalendarMonth className="h-5 w-5" />}
              color="brightSun.4"
              variant="outline"
              fullWidth
            >
              Schedule
            </Button>
          ) : (
            <Button color="brightSun.4" variant="outline" fullWidth>
              Message
            </Button>
          )}
        </div>
      </div>
      {(props.invited || props.posted) && (
        <Button
          color="brightSun.4"
          onClick={openApp}
          variant="filled"
          fullWidth
          autoContrast
        >
          View Application
        </Button>
      )}
      <Modal
        opened={opened}
        onClose={close}
        title="Schedule Interview"
        centered
      >
        <div className="flex flex-col gap-4 ">
          <DateInput
            value={date}
            minDate={new Date()}
            onChange={(val) => setDate(val ? new Date(val) : null)}
            label="Date"
            placeholder="Enter date"
          />
          <TimeInput
            label="Time"
            value={time}
            onChange={(event) => setTime(event.currentTarget.value)}
            ref={ref}
            onClick={() => ref.current?.showPicker()}
          />
          <Button
            color="brightSun.4"
            variant="outline"
            fullWidth
            onClick={() => handleOffer("INTERVIEW")}
          >
            Schedule
          </Button>
        </div>
      </Modal>
      <Modal opened={app} onClose={closeApp} title="Application" centered>
        <div className="flex flex-col gap-4 ">
          <div>
            Email: &emsp;
            <a
              className="text-bright-sun-400 hover:underline cursor-pointer text-center"
              href={`mailto:${props.email}`}
            >
              {props.email}
            </a>
          </div>
          <div>
            Website: &emsp;
            <a
              target="_blank"
              className="text-bright-sun-400 hover:underline cursor-pointer text-center"
              href={props.website}
            >
              {props.website}
            </a>
          </div>
          <div>
            Resume: &emsp;
            <span
              className="text-bright-sun-400 hover:underline cursor-pointer text-center"
              onClick={() => openBase64PDF(props.resume)}
            >
              {props.name}
            </span>
          </div>
          <div>
            Cover Letter: &emsp;<div>{props.coverLetter}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TalentCard;
