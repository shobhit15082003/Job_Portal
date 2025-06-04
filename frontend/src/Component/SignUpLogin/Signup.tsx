import {
  Anchor,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  Radio,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";

const form = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "APPLICANT",
};
const Signup = () => {
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
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
      registerUser(data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3 ">
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
        <Group mt="xs">
          <Radio
            className="py-4 px-6 border border-mine-shaft-800 rounded-lg has-[:checked]:border-bright-sun-400 hover:bg-mine-shaft-900 has-[checked]:bg-mine-shaft-400/5"
            autoContrast
            value="APPLICANT"
            label="Applicant"
          />
          <Radio
            className="py-4 px-6 border border-mine-shaft-800 rounded-lg has-[:checked]:border-bright-sun-400 hover:bg-mine-shaft-900 has-[checked]:bg-mine-shaft-400/5"
            autoContrast
            value="EMPLOYER"
            label="Employer"
          />
        </Group>
      </Radio.Group>
      <Checkbox
        autoContrast
        label={
          <>
            I accept <Anchor>terms & condtitons</Anchor>
          </>
        }
      />
      <Button autoContrast variant="filled" onClick={handleSubmit}>
        Sign up
      </Button>
      <div className="mx-auto">
        Have an account?{" "}
        <Link to="/login" className="text-bright-sun-400 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
