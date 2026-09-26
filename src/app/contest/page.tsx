import type { Metadata } from "next";
import { ContestMode } from "@/components/ContestMode";

export const metadata: Metadata = { title: "Contest" };

export default function ContestPage() {
  return <ContestMode />;
}
