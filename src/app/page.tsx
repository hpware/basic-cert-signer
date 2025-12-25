"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Master Cert</h1>
        <div className="flex flex-row gap-2">
          <Link href="/api/certs/master?get=download">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Download
            </button>
          </Link>
          <Link href="/api/certs/master">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
