import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Button } from "../ui/button";

interface IPrint {
  content: JSX.Element;
  label?: string;
  onAfterPrint?: () => void;
}

const Print = ({ content, label, onAfterPrint }: IPrint) => {
  const componentRef = useRef<any>();
  return (
    <div>
      <ReactToPrint
        trigger={() => <Button>{label || "In đơn"}</Button>}
        content={() => componentRef.current}
        onAfterPrint={onAfterPrint}
      />
      <div style={{ display: "none" }}>
        <div ref={componentRef}>{content}</div>
      </div>
    </div>
  );
};

export default Print;
