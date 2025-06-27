import {
  Button,
  LoadingOverlay,
  PasswordInput,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginValidation } from "../../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import ResetPasword from "./ResetPasword";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slices/UserSlice";
import { setJwt } from "../../Slices/JwtSlice";
import { loginUser } from "../../Services/AuthService";
import { jwtDecode } from "jwt-decode";

const form = {
  email: "",
  password: "",
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState(form);
  const [opened, { open, close }] = useDisclosure(false);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const navigate = useNavigate();
  const handleChange = (event: any) => {
    setFormError({ ...formError, [event.target.name]: "" });
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleSubmit = () => {
    let valid = true,
      newFormError: { [key: string]: string } = {};
    for (let key in data) {
      const typedKey = key as keyof typeof data;
      newFormError[typedKey] = loginValidation(typedKey, data[typedKey]);

      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);
    if (valid) {
      setLoading(true);
      loginUser(data)
        .then((res) => {
          console.log(res);
          notifications.show({
            title: "Login Successfull",
            message: "Redirecting to home page...",
            withCloseButton: true,
            icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
            color: "teal",
            withBorder: true,
            className: "!border-green-500",
          });
          dispatch(setJwt(res.jwt));
          const decoded = jwtDecode(res.jwt);
          dispatch(setUser({...decoded,email:decoded.sub}));
          setTimeout(() => {
            setLoading(false);
            // dispatch(setUser(res));
            navigate("/");
          }, 4000);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          notifications.show({
            title: "Login Failed",
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
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />
      <div className="w-1/2 sm-mx:w-full px-20 bs-mx:px-10 md-mx:px-5 flex flex-col justify-center gap-3 ">
        <div className="text-2xl font-semibold ">Create Account</div>
        <TextInput
          value={data.email}
          onChange={handleChange}
          name="email"
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          label="Email"
          placeholder="Your email"
          withAsterisk
          error={formError.email}
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
        />{" "}
        <Button
          loading={loading}
          autoContrast
          variant="filled"
          onClick={handleSubmit}
        >
          Sign up
        </Button>
        <div className="mx-auto sm-mx:text-sm xs-mx:text-xs">
          Don't have an account?
          <span
            onClick={() => {
              navigate("/signup");
              setData(form);
              setFormError(form);
            }}
            className="text-bright-sun-400 hover:underline cursor-pointer "
          >
            SignUp
          </span>
        </div>
        <div
          onClick={open}
          className="text-bright-sun-400 hover:underline cursor-pointer text-center sm-mx:text-sm xs-mx:text-xs"
        >
          Forget Password?
        </div>
      </div>
      <ResetPasword opened={opened} close={close} />
    </>
  );
};

export default Login;
