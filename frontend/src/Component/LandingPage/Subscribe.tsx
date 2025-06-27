import React from "react";
import {TextInput, Button} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";


const Subscribe = () => {
  const matches=useMediaQuery('(max-width:639px)');
    const matches1=useMediaQuery('(max-width:475)');
  return (
    <div className="mt-20 flex items-center bg-mine-shaft-900 mx-20 sm-mx:mx-5  py-3 rounded-xl justify-around flex-wrap ">
      <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl w-2/5 bs-mx:w-4/5 font-semibold text-center text-mine-shaft-100 ">
        Never Wants to Miss Any{" "}
        <span className="text-bright-sun-400">Job News?</span>
      </div>
      <div className="flex xs-mx:flex-col gap-4 bg-mine-shaft-700 px-3 py-2 xs:items-center rounded-xl ">
        <TextInput variant="unstyled" placeholder="Your@gmail.com" size={matches1?"sm":matches?"md":"xl"} className="[&_input]:text-mine-shaft-100 font-semibold"/>
        <Button color="brightSun.4" variant="filled" size={matches1?"sm":matches?"md":"xl"} className="!rounded-lg">Subscribe</Button>
      </div>
    </div>
  );
};

export default Subscribe;
