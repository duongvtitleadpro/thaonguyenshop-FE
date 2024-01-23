"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const DataTableRowActions = () => {
  return (
    <div className="flex gap-1">
      <Button variant="ghost" size="sm">
        <Pencil className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default DataTableRowActions;
