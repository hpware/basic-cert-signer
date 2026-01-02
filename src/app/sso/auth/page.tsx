import Client from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Single Sign-On Portal",
  description: "Login to your account, to access all of your services!",
};

export default function Page() {
  return <Client />;
}
