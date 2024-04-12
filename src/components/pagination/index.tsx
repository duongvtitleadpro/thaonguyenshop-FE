import { Pagination, PaginationProps } from "@mantine/core";
import classes from "./pagination.module.css";

const PaginationCustom = (props: PaginationProps) => {
  return <Pagination {...props} classNames={classes} />;
};

export default PaginationCustom;
