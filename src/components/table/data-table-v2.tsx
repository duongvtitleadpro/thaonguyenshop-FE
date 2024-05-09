/* eslint-disable react/jsx-key */
"use client";
import * as React from "react";
import { TableInstance, Column, useSortBy, useTable } from "react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps {
  className?: string;
  columns: any;
  data: any[];
  footer?: {
    colSpan: number;
    value?: string;
    className?: string;
  }[];
}

export const useRowSpan = (instance: TableInstance) => {
  const { allColumns } = instance;
  let rowSpanHeaders: any = [];

  allColumns.forEach((column: any) => {
    const { id, enableRowSpan } = column;
    if (enableRowSpan) {
      console.log("allColumns::::", id, enableRowSpan);
      rowSpanHeaders = [
        ...rowSpanHeaders,
        { id, topCellValue: null, topCellIndex: 0 },
      ];
    }

    Object.assign(instance, { rowSpanHeaders });
  });
};

const DataTableV2 = React.forwardRef<HTMLDivElement, DataTableProps>(
  ({ className, columns, data, footer }, ref) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      rowSpanHeaders,
    } = useTable(
      { columns, data: data },
      (hooks) => hooks.useInstance.push(useRowSpan),
      useSortBy
    ) as any;

    return (
      <div className={cn("space-y-4 overflow-auto h-full w-full", className)}>
        <div className="rounded-md border shadow-md h-full w-full">
          <div
            ref={ref}
            className="h-full relative overflow-auto w-full table-data-wrapper"
          >
            <Table className="h-full" {...getTableProps()}>
              <TableHeader className="sticky top-0 bg-secondary z-10">
                {headerGroups.map((headerGroup: any) => (
                  <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((header: any) => {
                      return (
                        <TableHead {...header.getHeaderProps()}>
                          {header.render("Header")}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody {...getTableBodyProps()}>
                {rows.map((row: any, i: any) => {
                  prepareRow(row);

                  for (let j = 0; j < row.allCells.length; j++) {
                    let cell: any = row.allCells[j];
                    let rowSpanHeader = rowSpanHeaders.find(
                      (x: any) => x.id === cell.column.id
                    );
                    console.log("rowSpanHeader:", rowSpanHeader, cell.value);

                    if (rowSpanHeader) {
                      if (
                        rowSpanHeader.topCellValue === null ||
                        rowSpanHeader.topCellValue !== cell.value
                      ) {
                        cell.isRowSpanned = false;
                        rowSpanHeader.topCellValue = cell.value;
                        rowSpanHeader.topCellIndex = i;
                        cell.rowSpan = 1;
                      } else {
                        (rows[rowSpanHeader.topCellIndex].allCells[j] as any)
                          .rowSpan++;
                        cell.isRowSpanned = true;
                      }
                    }
                  }
                  return null;
                })}
                {rows.map((row: any) => {
                  return (
                    <TableRow {...row.getRowProps()}>
                      {row.cells.map((cell: any) => {
                        if (cell.isRowSpanned) return null;
                        else
                          return (
                            <TableCell
                              {...cell.getCellProps()}
                              rowSpan={cell.rowSpan}
                            >
                              {cell.render("Cell")}
                            </TableCell>
                          );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
              {footer && (
                <TableFooter className="sticky bottom-0 bg-secondary">
                  <TableRow>
                    {footer.map((item, index) => (
                      <TableCell
                        key={index}
                        colSpan={item.colSpan}
                        className={item?.className || ""}
                      >
                        {item.value}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </div>
        </div>
      </div>
    );
  }
);
DataTableV2.displayName = "DataTableV2";

export default DataTableV2;
