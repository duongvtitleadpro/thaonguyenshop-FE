"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

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

// import { DataTableToolbar } from "../components/data-table-toolbar"

interface DataTableProps<TData, TValue> {
  className?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  footer?: {
    colSpan: number;
    value?: string;
    className?: string;
  }[];
  // handleGoToPage: (pageIndex: number) => void;
  // handleChangePageSize: (pageSize: number) => void;
}

const DataTable = React.forwardRef<HTMLDivElement, DataTableProps<any, any>>(
  ({ className, columns, data, footer }, ref) => {
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] =
      React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const [pagination, setPagination] = React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

    // const setPageIndex = React.useCallback(
    //   (updater: any) => {
    //     const page = updater(pagination);
    //     setPagination((prevState) => ({ ...prevState, ...page }));
    //     handleGoToPage(page.pageIndex);
    //     // handleChangePageSize(page.pageSize);
    //   },
    //   [pagination, handleGoToPage]
    // );

    const table = useReactTable({
      data,
      columns,
      state: {
        sorting,
        columnVisibility,
        rowSelection,
        columnFilters,
        pagination,
      },
      // manualPagination: true,
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      // getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      // onPaginationChange: setPageIndex,
    });

    return (
      <div className={cn("space-y-4 overflow-auto h-full w-full", className)}>
        {/* <DataTableToolbar table={table} /> */}
        <div className="rounded-md border shadow-md h-full w-full">
          <div
            ref={ref}
            className="h-full relative overflow-auto w-full table-data-wrapper"
          >
            <Table className="h-full">
              <TableHeader className="sticky top-0 bg-secondary z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Không có kết quả.
                    </TableCell>
                  </TableRow>
                )}
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
        {/* <DataTablePagination table={table} /> */}
      </div>
    );
  }
);

DataTable.displayName = "DataTable";

export default DataTable;
