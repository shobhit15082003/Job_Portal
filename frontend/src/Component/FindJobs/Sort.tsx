import { useState } from "react";
import { Combobox, useCombobox } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateSort } from "../../Slices/SortSlice";

const jobSort = [
  "Relevance",
  "Most Recent",
  "Salary: Low to High",
  "Salary: High to Low",
];
const talentSort = [
  "Relevance",
  "Experience: Low to High",
  "Experience: High to Low",
];

const Sort = (props: any) => {
  const [selectedItem, setSelectedItem] = useState<string | null>("Relevance");
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const dispatch = useDispatch();

  const options =
    props.sort === "job"
      ? jobSort.map((item) => (
          <Combobox.Option className="text-xs" value={item} key={item}>
            {item}
          </Combobox.Option>
        ))
      : talentSort.map((item) => (
          <Combobox.Option className="text-xs" value={item} key={item}>
            {item}
          </Combobox.Option>
        ));

  return (
    <Combobox
      store={combobox}
      width={180}
      position="bottom-start"
      onOptionSubmit={(val) => {
        setSelectedItem(val);
        dispatch(updateSort(val));
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <div
          onClick={() => combobox.toggleDropdown()}
          className="cursor-pointer border gap-2 text-sm border-bright-sun-400 flex items-center px-3 py-1.5 rounded-xl"
        >
          {selectedItem}
          <IconAdjustments className="h-4 w-4 text-bright-sun-400" />
        </div>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default Sort;
