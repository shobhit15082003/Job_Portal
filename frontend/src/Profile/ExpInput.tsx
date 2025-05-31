import React, { useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { Button, Checkbox, Textarea } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";

const ExpInput = (props: any) => {
  const select = fields;
  const [desc, setDesc] = useState("baka");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold ">{props.add?"Add":"Edit"} Experience</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput {...select[0]} />
        <SelectInput {...select[1]} />
      </div>
      <SelectInput {...select[2]} />
      <Textarea
        label="Summary"
        value={desc}
        autosize
        minRows={3}
        placeholder="Enter Summary..."
        withAsterisk
        onChange={(event) => setDesc(event.currentTarget.value)}
      />
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          placeholder="Pick date"
          value={startDate}
          onChange={(value) => setStartDate(value ? new Date(value) : null)}
          label="Start Date"
          maxDate={endDate || undefined}
          withAsterisk
        />
        <MonthPickerInput
          disabled={checked}
          placeholder="Pick date"
          value={endDate}
          onChange={(value) => setEndDate(value ? new Date(value) : null)}
          label="End Date"
          minDate={startDate || undefined}
          maxDate={new Date()}
          withAsterisk
        />
      </div>
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        autoContrast
        label="Currently Working here"
      />
      <div className="flex gap-5">
      <Button onClick={()=>props.setEdit(false)} color="brightSun.4" variant="outline">Save</Button>
      <Button onClick={()=>props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
    </div>

      </div>
  );
};

export default ExpInput;
