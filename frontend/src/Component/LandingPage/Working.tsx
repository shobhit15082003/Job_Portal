import React from "react";
import { work } from "../../Data/Data";
import { Avatar } from "@mantine/core";
import avatar7 from '../../assests/avatar-7.png';


const Working = () => {
  return (
    <div className="mt-20 pb-5 ">
      <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl font-semibold text-center text-mine-shaft-100 mb-3">
        How it <span className="text-bright-sun-400">Works</span> 
      </div>
      <div className="text-lg sm-mx:text-base xs-mx:text-sm text-mine-shaft-300 mb-10 text-center w-1/2 sm-mx:w-11/12 mx-auto ">
        Effortlessly navigate thorugh the process and land your dream job.
      </div>
        <div className="flex md-mx:flex-col px-16 bs-mx:px-10 md-mx:px-5 gap-2  justify-between items-center ">
            <div className="relative">
                <img className="w-[30rem]" src="/Working/Girl.png" alt="Girl's image"></img>
                <div className="w-36 xs-mx:w-28 flex flex-col items-center gap-1 border border-bright-sun-400 rounded-xl py-3 px-1 backdrop-blur-md top-[15%] absolute right-0 ">
                    <Avatar className="!h-16 !w-16 xs-mx:!h-12 xs-mx:!w-12 " src={avatar7} alt="it's me" />
                    <div className="text-sm sm-mx:text-xs font-semibold text-mine-shaft-200 text-center ">
                        Complete your profile
                    </div>
                    <div className="text-xs text-mine-shaft-300  ">
                        70% Completed
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-10 ">
                {
                    work.map((item,index)=>
                        <div key={index} className="flex items-center gap-4 ">
                        <div className="p-2.5 bg-bright-sun-300 rounded-full ">
                            <img className="h-12 w-12 md-mx:h-9 md-mx:w-9 sm-mx:h-7 sm-mx:w-7" src={`/Working/${item.name}.png`} alt={item.name}></img>
                        </div>
                        <div>
                            <div className="text-mine-shaft-200 text-xl md-mx:text-lg sm-mx:text-base font-semibold ">
                                {item.name}
                            </div>
                            <div className="text-mine-shaft-300 md-mx:text-sm sm-mx:text-xs">
                                {item.desc}
                            </div>
                        </div>
                        
                    </div>
                    )
                }
                
            </div>
        </div>
    </div>
  );
};

export default Working;
