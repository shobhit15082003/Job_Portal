import React, { useState } from "react";
import SelectInput from "../PostJob/SelectInput";
import { Button, TextInput } from "@mantine/core";
import fields from "../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";

const CertiInput = (props: any) => {
  const select = fields;
  const [issueDate,setIssueDate]=useState<Date|null>(new Date());
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">Add Certificate</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <TextInput label="Title" withAsterisk placeholder="Enter title" />
        <SelectInput {...select[1]} />
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          placeholder="Pick date"
          value={issueDate}
          onChange={(value) => setIssueDate(value ? new Date(value) : null)}
          label="Issue Date"
          maxDate={new Date()}
          withAsterisk
        />
        <TextInput label="Certificate ID" withAsterisk placeholder="Enter ID" />
      </div>
      <div className="flex gap-5">
        <Button
          onClick={() => props.setEdit(false)}
          color="brightSun.4"
          variant="outline"
        >
          Save
        </Button>
        <Button
          onClick={() => props.setEdit(false)}
          color="red.8"
          variant="light"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CertiInput;
