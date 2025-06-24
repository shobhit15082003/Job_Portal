import React, { useState } from "react";
import MultiInput from "./MultiInput";

import { Button, Collapse, Divider, RangeSlider } from "@mantine/core";
import { dropdownData } from "../../Data/JobsData";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [value, setValue] = useState<[number, number]>([0, 300]);
  const dispatch = useDispatch();
  const handleChange = (event: any) => {
    dispatch(updateFilter({ salary: event }));
  };
  const matches=useMediaQuery('(max-width:475px)');
  return (
    <div>
      <div className="flex justify-end">
        {matches && <Button
          onClick={toggle}
          variant="outline"
          autoContrast
          color="brightSun.4"
          className=""
          m="sm"
          radius="lg"
        >
          {opened?"Close":"Filters"}
        </Button>}
      </div>
      <Collapse in={(opened || !matches)}>
        <div className="lg-mx:flex-wrap flex px-5 py-8 items-center !text-mine-shaft-100">
          {dropdownData.map((item, index) => (
            <React.Fragment key={index}>
              <div
                key={index}
                className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full"
              >
                <MultiInput {...item} />
              </div>
              <Divider
                className="sm-mx:hidden"
                size="sm"
                orientation="vertical"
                mr="xs"
              />
            </React.Fragment>
          ))}
          <div className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full text-sm text-mine-shaft-300 [&_.mantine-Slider-label]:!translate-y-10">
            <div className="flex text-sm justify-between ">
              <div>Salary</div>
              <div>
                &#8377;{value[0]} LPA - &#8377;{value[1]} LPA
              </div>
            </div>
            <RangeSlider
              size="xs"
              color="brightSun.4"
              value={value}
              onChange={setValue}
              onChangeEnd={handleChange}
              labelTransitionProps={{
                transition: "skew-down",
                duration: 150,
                timingFunction: "linear",
              }}
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default SearchBar;
