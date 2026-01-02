"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightCircleIcon, KeySquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Client() {
  const [activeTab, setActiveTab] = useState("account");
  const [pinCode, setPinCode] = useState("");
  const formAction = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const loginMethod = formData.get("loginMethod");
    const username = formData.get("username");
    const password = formData.get("password");
    const pincode = formData.get("pincode");

    if (loginMethod === "account") {
      if (!username || !password) {
        toast.error("Please enter your username and password");
        return;
      }
      if ((password as string).length < 8) {
        toast.error("Password must be at least 8 characters long");
        return;
      }
    } else if (loginMethod === "pincode") {
      if (!(pincode && (pincode as string).length === 6)) {
        toast(pincode as string);
        toast.error("Please enter a valid 6-digit pincode");
        return;
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center absolute inset-0">
      <div className="pb-3 flex flex-row space-x-3 mx-auto">
        <KeySquare className="w-7 h-7" />
        <h1 className="text-2xl font-bold text-left m-auto">Login</h1>
      </div>
      <form className="space-y-2" onSubmit={(e) => formAction(e)}>
        <input type="hidden" name="loginMethod" value={activeTab} />
        <Tabs
          defaultValue={activeTab}
          className="w-100"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList>
            <TabsTrigger value="account">Username</TabsTrigger>
            <TabsTrigger value="pincode">Pin Code</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="space-y-2">
            <Input placeholder="Username" name="username" />
            <Input placeholder="Password" type="password" name="password" />
          </TabsContent>
          <TabsContent
            value="pincode"
            className="justify-center flex flex-col items-center"
          >
            <span>Please enter your pin code: </span>
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              onChange={setPinCode}
              value={pinCode}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <input type="hidden" name="pincode" value={pinCode} />
          </TabsContent>
        </Tabs>

        <div className="flex flex-row justify-between pr-2">
          <div></div>
          <Button className="group">
            Login{" "}
            <ArrowRightCircleIcon className="w-6 h-6 group-hover:-rotate-10 group-hover:scale-110 transition-all duration-300" />
          </Button>
        </div>
      </form>
    </div>
  );
}
