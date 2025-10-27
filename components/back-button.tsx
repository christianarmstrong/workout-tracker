"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BackButton({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  return (
      <Button onClick={() => router.back()}>{children ?? "Back"}</Button>
  );
}