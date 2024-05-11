import { Select, SelectProps } from "@mantine/core";
import classes from "./select.module.css";

const SelectCustom = (props: SelectProps) => {
  return (
    <Select
      styles={{
        section: {
          display: "none",
        },
        input: {
          padding: "4px",
        },
      }}
      classNames={classes}
      {...props}
    />
  );
};

export default SelectCustom;
