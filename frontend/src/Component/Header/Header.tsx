import { Avatar, Button, Indicator } from "@mantine/core";
import {
  IconAnchor,
  IconAsset,
  IconBell,
  IconSettings,
} from "@tabler/icons-react";
import avatarImage from "../assests/avatar-9.png";
import NavLinks from "./NavLinks";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";
import NotiMenu from "./NotiMenu";

const Header = () => {
  const location = useLocation();
  const user = useSelector((state: any) => state.user);
  const dispatch=useDispatch();
   useEffect(() => {
    getProfile(user?.id)
      .then((data: any) => {
        dispatch(setProfile(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);
  return location.pathname != "/signup" && location.pathname != "/login" ? (
    <div className="w-full bg-mine-shaft-950 px-6 h-20 text-white flex justify-between items-center font-['poppins]">
      <div className="flex gap-1  items-center text-bright-sun-400">
        <IconAnchor className="h-8 w-8" stroke={2.5} />
        <div className="text-3xl font-semibold">JobHook</div>
      </div>
      <NavLinks />
      <div className="flex items-center gap-3">
        {user ? (
          <ProfileMenu />
        ) : (
          <Link to="/login">
            <Button variant="subtle" color="brightSun.4">
              Login
            </Button>
          </Link>
        )}
        {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <IconSettings stroke={1.5} />
        </div> */}
        {user?<NotiMenu/>:<></>}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Header;
