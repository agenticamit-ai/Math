import type { Metadata } from "next";
import { ParentNotes } from "@/components/ParentNotes";

export const metadata: Metadata = { title: "Parent Notes" };

export default function NotesPage() {
  return <ParentNotes />;
}
