import React, { useState } from "react";

import { Button, Collapse, Divider, Input, RangeSlider } from "@mantine/core";
import MultiInput from "../FindJobs/MultiInput";

import { IconUserCircle } from "@tabler/icons-react";
import { searchFields } from "../../Data/TalentData";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([0, 50]);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const handleChange = (name: any, event: any) => {
    if (name == "exp") {
      dispatch(updateFilter({ exp: event }));
    } else {
      dispatch(updateFilter({ name: event.target.value }));
      setName(event.target.value);
    }
  };
  const matches = useMediaQuery("(max-width:475px)");
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <div>
      <div className="flex justify-end">
        {matches && (
          <Button
            onClick={toggle}
            variant="outline"
            autoContrast
            color="brightSun.4"
            className=""
            m="sm"
            radius="lg"
          >
            {opened ? "Close" : "Filters"}
          </Button>
        )}
      </div>
      <Collapse in={opened || !matches}>
        <div className="flex px-5 py-8 lg-mx:!flex-wrap items-center !text-mine-shaft-100 ">
          <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full flex items-center xs-mx:mb-1">
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
          <Divider className="sm-mx:hidden" size="xs" orientation="vertical" mr="xs" />
          
          {searchFields.map((item, index) => (
            <React.Fragment key={index}>
              <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full">
                <MultiInput {...item} />
              </div>
              <Divider className="sm-mx:hidden" size="sm" orientation="vertical" mr="xs" />
            </React.Fragment>
          ))}
          <div className="w-1/ 5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1 text-sm text-mine-shaft-300 [&_.mantine-Slider-label]:!translate-y-10">
            <div className="flex mb-1 justify-between ">
              <div>Experience (Years)</div>
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
      </Collapse>
    </div>
  );
};

export default SearchBar;
