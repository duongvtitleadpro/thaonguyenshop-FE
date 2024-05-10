import { Select, SelectProps } from "@mantine/core";
import classes from "./select.module.css";

const SelectCustom = (props: SelectProps) => {
  return <Select {...props} classNames={classes} />;
};

export default SelectCustom;
