import {
  Button,
  FileInput,
  LoadingOverlay,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import React, { useState } from "react";

const ApplicationForm = () => {
  const [preview, setPreview] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const handlePreview = () => {
    setPreview(!preview);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSubmit = () => {};
  const form =useForm({
    mode:'controlled',
    validateInputOnChange:true,
    initialValues:{
        name:'',
        email:'',
        phone:'',
        website:'',
        resume:null,
        coverLetter:'',
    },
    validate:{
        name:isNotEmpty("Name is required"),
        email:isNotEmpty("Email is required"),
        phone:isNotEmpty("Phone number cannot be empty"),
        website:isNotEmpty("Website cannot be empty"),
        resume:isNotEmpty("Resume cannot be empty"),
    }
  });
  return (
    <div>
      <LoadingOverlay
        className="!fixed "
        visible={submit}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />
      <div className="text-xl font-semibold mb-5 ">Submit Your Application</div>
      <div className="flex flex-col gap-5 ">
        <div className="flex gap-10 [&>*]:w-1/2 ">
          <TextInput {...form.getInputProps("name")}
            readOnly={preview ? true : false}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold " : ""}`}
            label="Full Name"
            withAsterisk
            placeholder="Enter your Name"
          />
          <TextInput {...form.getInputProps("email")}
            readOnly={preview ? true : false}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold " : ""}`}
            label="Email"
            withAsterisk
            placeholder="Enter your Email"
          />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2 ">
          <NumberInput {...form.getInputProps("phone")}
            readOnly={preview ? true : false}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold " : ""}`}
            label="Phone Number"
            min={0}
            max={9999999999}
            clampBehavior="strict"
            hideControls
            withAsterisk
            placeholder="Enter your phone number"
          />
          <TextInput {...form.getInputProps("website")}
            readOnly={preview ? true : false}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold " : ""}`}
            label="Personal website"
            withAsterisk
            placeholder="Enter your Url"
          />
        </div>
        <FileInput {...form.getInputProps("resume")}
          readOnly={preview ? true : false}
          variant={preview ? "unstyled" : "default"}
          className={`${preview ? "text-mine-shaft-300 font-semibold " : ""}`}
          withAsterisk
          leftSection={<IconPaperclip stroke={1.5} />}
          label="Attach Your Resume"
          placeholder="Your Resume"
          leftSectionPointerEvents="none"
        />
        <Textarea {...form.getInputProps("coverLetter")}
          readOnly={preview ? true : false}
          variant={preview ? "unstyled" : "default"}
          className={`${preview ? "text-mine-shaft-300 font-semibold " : ""}`}
          withAsterisk
          autosize
          minRows={4}
          placeholder="Write Something About Yourself...."
          label="Cover Letter"
        />
        {!preview && (
          <Button onClick={handlePreview} color="brightSun.4" variant="light">
            Preview
          </Button>
        )}
        {preview && (
          <div className="flex gap-10 [&>*w-1/2]">
            <Button
              fullWidth
              onClick={handlePreview}
              color="brightSun.4"
              variant="outline"
            >
              Edit
            </Button>
            <Button
              fullWidth
              onClick={handleSubmit}
              color="brightSun.4"
              variant="light"
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;
