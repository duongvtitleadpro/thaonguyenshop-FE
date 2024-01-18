"use client";

import { cn } from "@/lib/utils";

interface SizeRadioProps {
  value: number;
  title: string;
  name: string;
  active: boolean;
  disabled?: boolean;
}

const SizeRadio = (props: SizeRadioProps) => {
  const { value, title, active, name, disabled = false } = props;
  return (
    <label
      className={cn(
        "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm",
        active ? "ring-2 ring-indigo-500" : "",
        !disabled
          ? "cursor-pointer bg-white text-gray-900 shadow-sm"
          : "cursor-not-allowed bg-gray-50 text-gray-200"
      )}
    >
      <input type="radio" name={name} value={value} className="sr-only" />
      <span id="size-choice-1-label">{title}</span>
      {!disabled ? (
        <span
          className={cn(
            active ? "border" : "border-2",
            "pointer-events-none absolute -inset-px rounded-md"
          )}
          aria-hidden="true"
        />
      ) : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
        >
          <svg
            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            stroke="currentColor"
          >
            <line
              x1={0}
              y1={100}
              x2={100}
              y2={0}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </span>
      )}
    </label>
  );
};

export default SizeRadio;
