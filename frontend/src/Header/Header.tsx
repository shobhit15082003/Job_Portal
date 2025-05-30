import { Avatar, Indicator } from "@mantine/core";
import { IconAnchor, IconAsset, IconBell, IconSettings } from "@tabler/icons-react";
import avatarImage from '../assests/avatar-9.png';
import NavLinks from "./NavLinks";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location =useLocation();
  return (
    location.pathname!="/signup" && location.pathname!="/login" ?<div className="w-full bg-mine-shaft-950 px-6 h-20 text-white flex justify-between items-center font-['poppins]">
      <div className="flex gap-1 items-center text-bright-sun-400">
        <IconAnchor className="h-8 w-8" stroke={2.5} />
        <div className="text-3xl font-semibold">JobHook</div>
      </div>
      <NavLinks/>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div>Shobhit</div>
          <Avatar src={avatarImage} />
        </div>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <IconSettings stroke={1.5} />
        </div>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator color="brightSun.4" offset={6} size={8} processing>
            <IconBell stroke={1.5}/>
          </Indicator>
        </div>
      </div>
    </div>:<></>
  );
};

export default Header;
