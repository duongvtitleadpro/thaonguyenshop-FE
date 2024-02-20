import { Icons } from "../icons";

const ContactCard = () => {
  return (
    <div className="relative font-bold border border-dashed border-green-700 p-4 flex flex-col w-full max-w-[280px] rounded-md">
      <h1 className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 text-xl bg-white">
        Shop tư vấn
      </h1>
      <div className="flex flex-col mx-auto my-2">
        <span className="text-green-700 text-sm">HOTLINE</span>
        <span className="italic text-xl">0xxx.xxx.xxx</span>
      </div>
      <div className="flex items-center justify-around">
        <Icons.facebook />
        <Icons.zalo />
      </div>
    </div>
  );
};

export default ContactCard;
