"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleSubmit = useMutation({
    mutationFn: async (data: FormData) => {
      toast.promise(
        async () => {
          const req = await fetch("/api/certs/generate", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(data.entries())),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const res = await req.json();
          if (!res.success) {
            throw new Error(res.error);
          }
          router.push(`/cert/${res.uuidSavePath}`);
        },
        {
          success: "Certificate created successfully!",
          error: "Failed to create certificate",
        }
      );
    },
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Create Certificate</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit.mutate(formData);
        }}
        className="flex flex-col items-center justify-center"
      >
        <label htmlFor="cn">CN (Common Name):</label>
        <input type="text" id="cn" name="cn" required />

        <label htmlFor="ou">OU (Organizational Unit):</label>
        <input type="text" id="ou" name="ou" />

        <label htmlFor="o">O (Organization Name):</label>
        <input type="text" id="o" name="o" />

        <label htmlFor="l">L (Locality):</label>
        <input type="text" id="l" name="l" />

        <label htmlFor="st">ST (State):</label>
        <input type="text" id="st" name="st" />

        <label htmlFor="c">C (Country):</label>
        <input type="text" id="c" name="c" />

        <button type="submit" disabled={handleSubmit.isPending}>
          Create
        </button>
      </form>
    </div>
  );
}
