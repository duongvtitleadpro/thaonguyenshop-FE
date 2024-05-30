"use client";

import {
  NumberInput,
  NumberInputProps,
  NumberInputHandlers,
  Button,
  Tooltip,
} from "@mantine/core";
import { Minus, Plus } from "lucide-react";
import { useRef } from "react";

interface InputNumberProp extends NumberInputProps {
  disableNumberInput?: boolean;
}

const InputNumber = (props: InputNumberProp) => {
  const { disableNumberInput } = props;
  const handlersRef = useRef<NumberInputHandlers>(null);
  return (
    <div className="flex">
      <Button
        onClick={() => handlersRef.current?.decrement()}
        variant="default"
        radius={0}
        className="w-9 h-9 p-0 border-r-0 "
        disabled={disableNumberInput}
      >
        <Minus className="w-3 h-3" />
      </Button>
      <Tooltip label={props.value}>
        <NumberInput
          w={40}
          disabled={disableNumberInput}
          handlersRef={handlersRef}
          hideControls
          radius={0}
          allowNegative={false}
          clampBehavior="strict"
          stepHoldDelay={500}
          stepHoldInterval={100}
          {...props}
        />
      </Tooltip>
      <Button
        onClick={() => handlersRef.current?.increment()}
        variant="default"
        radius={0}
        className="w-9 h-9 p-0 border-l-0"
        disabled={disableNumberInput}
      >
        <Plus className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default InputNumber;
