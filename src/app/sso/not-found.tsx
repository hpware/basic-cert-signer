import { Button } from "@/components/ui/button";
import { ArrowLeftCircleIcon } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center absolute inset-0">
      <span className="text-4xl md:text-8xl text-bold">404</span>
      <span>Oops! This page doesn't belong in the sso service!</span>
      <Button className="group mt-3">
        Go Back{" "}
        <ArrowLeftCircleIcon className="w-6 h-6 group-hover:scale-110 group-hover:-rotate-10 transition-all duration-300" />
      </Button>
    </div>
  );
}
