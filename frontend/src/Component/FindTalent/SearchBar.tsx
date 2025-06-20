import React, { useState } from "react";

import { Divider, Input, RangeSlider } from "@mantine/core";
import MultiInput from "../FindJobs/MultiInput";

import { IconUserCircle } from "@tabler/icons-react";
import { searchFields } from "../../Data/TalentData";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([0, 50]);
  const [name, setName] = useState("");
  const dispatch=useDispatch();
  const handleChange = (name: any, event: any) => {
    if(name=="exp"){
      dispatch(updateFilter({exp:event}));
    }else{
      dispatch(updateFilter({name:event.target.value}));
      setName(event.target.value);
    }
  };
  return (
    <div className="flex px-5 py-8 items-center !text-mine-shaft-100 ">
      <div className="flex items-center">
        <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2">
          <IconUserCircle size={20} />
        </div>
        <Input
          defaultValue={name}
          onChange={(e) => handleChange("name", e)}
          variant="unstyled"
          placeholder="Talent Name"
          className="[&_input]:!placeholder-mine-shaft-300  "
        />
      </div>
      {searchFields.map((item, index) => (
        <React.Fragment key={index}>
          <div className="w-1/5">
            <MultiInput {...item} />
          </div>
          <Divider size="sm" orientation="vertical" mr="xs" />
        </React.Fragment>
      ))}
      <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex text-sm justify-between ">
          <div>S=Experience (Years)</div>
          <div>
            {value[0]} - {value[1]}
          </div>
        </div>
        <RangeSlider
          onChangeEnd={(e) => handleChange("exp", e)}
          size="xs"
          color="brightSun.4"
          max={50}
          min={0}
          value={value}
          minRange={1}
          labelTransitionProps={{
            transition: "skew-down",
            duration: 150,
            timingFunction: "linear",
          }}
          onChange={setValue}
        />
      </div>
    </div>
  );
};

export default SearchBar;
