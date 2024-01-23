"use client";

import CombineOrderDetailModal from "@/components/combine-order-detail-modal";

interface DataTableRowActionsProps {
  id: number;
}

const DataTableRowActions = (props: DataTableRowActionsProps) => {
  const { id } = props;
  return (
    <div className="flex gap-1">
      <CombineOrderDetailModal id={id} />
    </div>
  );
};

export default DataTableRowActions;
