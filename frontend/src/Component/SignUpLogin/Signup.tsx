import {
  Anchor,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  Radio,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import { notifications } from "@mantine/notifications";

const form = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "APPLICANT",
};

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const [loading, setLoading] = useState(false);
  const handleChange = (event: any) => {
    if (typeof event === "string") {
      setData((prevData) => ({
        ...prevData,
        accountType: event,
      }));
      return;
    }
    let name = event.target.name,
      value = event.target.value;
    setData({ ...data, [name]: value });
    setFormError({ ...formError, [name]: signupValidation(name, value) });
    if (name === "password" && data.confirmPassword !== "") {
      let err = "";
      if (data.confirmPassword !== value) err = "Passwords do not match.";
      else err = "";

      setFormError({
        ...formError,
        [name]: signupValidation(name, value),
        confirmPassword: err,
      });
    }
    if (name === "confirmPassword") {
      if (data.password !== value) {
        setFormError({ ...formError, [name]: "Passwords do not match." });
      } else setFormError({ ...formError, confirmPassword: "" });
    }
  };
  const handleSubmit = () => {
    let valid = true,
      newFormError: { [key: string]: string } = {};
    for (let key in data) {
      if (key === "accountType") continue;
      if (key !== "confirmPassword") {
        newFormError[key] = signupValidation(key, data[key]);
      } else if (data[key] !== data["password"])
        newFormError[key] = "Passwords do not match.";
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);

    if (valid === true) {
      setLoading(true);
      registerUser(data)
        .then((res) => {
          console.log(res);
          setData(form);
          notifications.show({
            title: "Registered Successfully",
            message: "Redirecting to Login page...",
            withCloseButton: true,
            icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
            color: "teal",
            withBorder: true,
            className: "!border-green-500",
          });
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
          }, 4000);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          notifications.show({
            title: "Registered Failed",
            message: err.response.data.errorMessage,
            withCloseButton: true,
            icon: <IconX style={{ width: "90%", height: "90%" }} />,
            color: "red",
            withBorder: true,
            className: "!border-red-500",
          });
        });
    }
  };
  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        className="translate-x-1/2"
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />
      <div className="w-1/2 sm-mx:w-full sm-mx:py-20 px-20 bs-mx:px-10 md-mx:px-5 flex flex-col justify-center gap-3 ">
        <div className="text-2xl font-semibold ">Create Account</div>
        <TextInput
          value={data.name}
          name="name"
          onChange={handleChange}
          label="Full Name"
          placeholder="Your name"
          error={formError.name}
          withAsterisk
        />
        <TextInput
          value={data.email}
          onChange={handleChange}
          name="email"
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          label="Email"
          placeholder="Your email"
          error={formError.email}
          withAsterisk
        />
        <PasswordInput
          value={data.password}
          onChange={handleChange}
          name="password"
          withAsterisk
          leftSection={<IconLock size={18} stroke={1.5} />}
          label="Password"
          placeholder="Password"
          error={formError.password}
        />
        <PasswordInput
          value={data.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          withAsterisk
          leftSection={<IconLock size={18} stroke={1.5} />}
          label="Confirm Password"
          placeholder="Confirm Password"
          error={formError.confirmPassword}
        />
        <Radio.Group
          value={data.accountType}
          onChange={handleChange}
          label="You are?"
          description="This is anonymous"
          withAsterisk
        >
          <div className="flex gap-6 xs-mx:gap-3">
            <Radio
              className="py-4 px-6 sm-mx:px-4 sm-mx:py-2 border border-mine-shaft-800 rounded-lg has-[:checked]:border-bright-sun-400 hover:bg-mine-shaft-900 has-[checked]:bg-mine-shaft-400/5"
              autoContrast
              value="APPLICANT"
              label="Applicant"
            />
            <Radio
              className="py-4 px-6 sm-mx:px-4 sm-mx:py-2 border border-mine-shaft-800 rounded-lg has-[:checked]:border-bright-sun-400 hover:bg-mine-shaft-900 has-[checked]:bg-mine-shaft-400/5"
              autoContrast
              value="EMPLOYER"
              label="Employer"
            />
          </div>
        </Radio.Group>
        <Checkbox
          autoContrast
          label={
            <>
              I accept <Anchor>terms & condtitons</Anchor>
            </>
          }
        />
        <Button
          loading={loading}
          autoContrast
          variant="filled"
          onClick={handleSubmit}
        >
          Sign up
        </Button>
        <div className="text-center mx-auto sm-mx:text-sm xs-mx:text-xs">
          Have an account?{" "}
          <span
            onClick={() => {
              navigate("/login");
              setData(form);
              setFormError(form);
            }}
            className="text-bright-sun-400 hover:underline cursor-pointer sm-mx:text-sm xs-mx:text-xs"
          >
            Login
          </span>
        </div>
      </div>
    </>
  );
};

export default Signup;
