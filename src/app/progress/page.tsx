import type { Metadata } from "next";
import { ProgressBoard } from "@/components/ProgressBoard";

export const metadata: Metadata = { title: "Progress" };

export default function ProgressPage() {
  return <ProgressBoard />;
}
