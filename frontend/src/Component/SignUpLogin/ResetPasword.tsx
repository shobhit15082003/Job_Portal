import {
  Button,
  Modal,
  PasswordInput,
  PinInput,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import React, { useState } from "react";
import { changePass, sendOTP, verifyOtp } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import {
  errorNotification,
  successNotification,
} from "../../Services/NotificationService";
import { useInterval } from "@mantine/hooks";

const ResetPasword = (props: any) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [resendLoader, setResendLoader] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => {
    if (seconds === 0) {
      setResendLoader(false);
      setSeconds(60);
      interval.stop();
    } else setSeconds((s) => s - 1);
  }, 1000);

  const handleSendOtp = () => {
    setOtpSending(true);
    sendOTP(email)
      .then((res) => {
        setOtpSent(true);
        successNotification("Otp Sent Successfullt.", "Enter OTP to reset.");
        console.log(res);
        setOtpSending(false);
        setResendLoader(true);
        interval.start();
      })
      .catch((err) => {
        console.log(err);
        errorNotification("OTP sending failed", err.response.data.errorMessage);
        setOtpSending(false);
      });
  };
  const handleVerifyOtp = (otp: string) => {
    verifyOtp(email, otp)
      .then((res) => {
        console.log(res);
        successNotification("OTP Verified", "Enter new password.");
        setVerified(true);
      })
      .catch((err) => {
        console.log(err);
        errorNotification(
          "OTP Verification Failed.",
          err.response.data.errorMessage
        );
      });
  };
  const resendOtp = () => {
    if(resendLoader)
        return;
    handleSendOtp();
  };
  const changeEmail = () => {
    setOtpSent(false);
    setResendLoader(false);
    setSeconds(60);
    setVerified(false);
    interval.stop();
  };
  const handleResetPassword = () => {
    changePass(email, password)
      .then((res) => {
        console.log(res);
        successNotification("Password Changed", "Login with new password.");
        props.close();
      })
      .catch((err) => {
        console.log(err);
        errorNotification(
          "Password reset failed.",
          err.response.data.errorMessage
        );
      });
  };
  return (
    <Modal opened={props.opened} onClose={props.close} title="Reset Password">
      <div className="flex flex-col gap-6 ">
        <TextInput
          value={email}
          size="md"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          label="Email"
          placeholder="Your email"
          withAsterisk
          rightSection={
            <Button
              size="xs"
              className="mr-1"
              autoContrast
              disabled={email === "" || otpSent}
              variant="filled"
              onClick={handleSendOtp}
              loading={otpSending && !otpSent}
            >
              Send OTP
            </Button>
          }
          rightSectionWidth="xl"
        />
        {otpSent && (
          <PinInput
            length={6}
            className="mx-auto"
            size="md"
            gap="lg"
            type="number"
            onComplete={handleVerifyOtp}
          />
        )}
        {otpSent && !verified && (
          <div className="flex gap-2 ">
            <Button
              size="xs"
              className="mr-1"
              fullWidth
              autoContrast
              variant="light"
              onClick={resendOtp}
              loading={otpSending}
              color="brightSun.4"
            >
             {resendLoader?seconds: "Resend"}
            </Button>
            <Button
              fullWidth
              autoContrast
              variant="filled"
              onClick={changeEmail}
            >
              Change Email
            </Button>
          </div>
        )}
        {verified && (
          <PasswordInput
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPassError(signupValidation("password", e.target.value));
            }}
            name="password"
            withAsterisk
            leftSection={<IconLock size={18} stroke={1.5} />}
            label="Password"
            placeholder="Password"
            error={passError}
          />
        )}
        {verified && (
          <Button onClick={handleResetPassword} autoContrast variant="filled">
            Change Password
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default ResetPasword;
