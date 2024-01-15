"use client";

interface WidgetWrapperProps {
  children: React.ReactNode;
  headTitle: string;
}

const WidgetWrapper = (props: WidgetWrapperProps) => {
  const { children, headTitle } = props;
  return (
    <div className="relative p-8 border-2 border-[#35A8E0] rounded-lg">
      <h4 className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 px-20 py-3 bg-white text-[#35A8E0] uppercase text-2xl font-bold tracking-wider">
        {headTitle}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
};

export default WidgetWrapper;
