import { Button } from "@/components/ui/button";
import { ArrowRightCircleIcon, KeySquare } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center absolute inset-0">
      <div className="pb-3 flex flex-col">
        <KeySquare className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-left">Single Sign On</h1>
      </div>
      <Button className="group">
        Login{" "}
        <ArrowRightCircleIcon className="w-6 h-6 group-hover:-rotate-10 group-hover:scale-110 transition-all duration-300" />
      </Button>
    </div>
  );
}
