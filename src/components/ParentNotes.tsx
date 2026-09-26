"use client";

import { useState } from "react";
import { useProgress } from "@/components/Providers";
import { explainNotes, type StructuredNote } from "@/lib/explain-notes";

function NoteView({ note }: { note: StructuredNote }) {
  return (
    <div className="space-y-4">
      <section className="card">
        <p className="eyebrow">Concept</p>
        <h3 className="mt-1 font-display text-3xl text-ink">{note.title}</h3>
        {note.vocabulary.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {note.vocabulary.map((word) => (
              <li key={word} className="rounded-full bg-peach px-3 py-1 text-base font-extrabold text-ink">
                {word}
              </li>
            ))}
          </ul>
        ) : null}
        <ul className="mt-4 space-y-3 text-lg leading-relaxed">
          {note.concept.map((paragraph) => (
            <li key={paragraph} className="rounded-2xl bg-[#fff8f1] px-4 py-3">
              {paragraph}
            </li>
          ))}
        </ul>
      </section>
      <section className="card bg-[#fff6d8]">
        <p className="eyebrow">Contest tricks</p>
        <ul className="mt-3 space-y-3">
          {note.tricks.map((trick) => (
            <li key={`${trick.title}-${trick.body}`}>
              <h4 className="font-display text-2xl text-ink">{trick.title}</h4>
              <p className="text-lg">{trick.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="card bg-mist">
        <p className="eyebrow">Practice prompts</p>
        <p className="mt-2 text-lg text-cocoa">Talk these through together. They are prompts, not a scored answer key.</p>
        <ol className="mt-4 space-y-4">
          {note.practice.map((item, index) => (
            <li key={item.prompt} className="rounded-2xl bg-white px-4 py-3">
              <p className="text-xl font-extrabold text-ink">
                {index + 1}. {item.prompt}
              </p>
              <p className="mt-1 text-lg text-cocoa">Hint: {item.hint}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export function ParentNotes() {
  const { ready, state, saveNote, deleteNote } = useProgress();
  const [raw, setRaw] = useState("");
  const [error, setError] = useState("");
  const [structured, setStructured] = useState<StructuredNote | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  function explain() {
    setError("");
    setStructured(explainNotes(raw));
    setOpenId(null);
  }

  function onUpload(file: File | undefined) {
    if (!file) return;
    const name = file.name.toLowerCase();
    if (!name.endsWith(".txt") && !name.endsWith(".md")) {
      setError("Upload a .txt or .md file.");
      return;
    }
    if (file.size > 100_000) {
      setError("That file is over 100 KB. Paste a shorter note.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setRaw(String(reader.result ?? ""));
      setError("");
      setStructured(null);
    };
    reader.onerror = () => setError("That file could not be read.");
    reader.readAsText(file);
  }

  function keep() {
    if (!structured) return;
    const id = crypto.randomUUID();
    saveNote({
      id,
      title: structured.title,
      raw,
      structured,
      createdAt: new Date().toISOString(),
    });
    setOpenId(id);
  }

  const openSaved = state.notes.find((note) => note.id === openId) ?? null;

  return (
    <div className="space-y-6">
      <header className="card">
        <p className="eyebrow">For a parent</p>
        <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Parent Notes</h1>
        <p className="mt-3 max-w-2xl text-xl text-cocoa">
          Paste notes you wrote, or upload a .txt or .md file. Explain this sorts them into a concept, contest tricks, and practice prompts on this device. No account and no API key.
        </p>
        <p className="mt-3 text-lg text-cocoa">
          Use notes you have the right to use. Math Quest does not import contest PDFs.
        </p>
      </header>

      <section className="card">
        <label htmlFor="notes" className="font-display text-2xl text-ink">
          Notes
        </label>
        <textarea
          id="notes"
          value={raw}
          onChange={(event) => setRaw(event.target.value)}
          rows={10}
          placeholder={"Ratios\n\nA ratio compares two amounts.\n\nTricks\n- Draw the parts before you divide.\n\nPractice\nWhat is 20% of 50?"}
          className="mt-3 w-full rounded-2xl border-2 border-[#eadccb] bg-[#fffaf4] p-4 text-lg leading-relaxed outline-none focus:border-coral focus:ring-2 focus:ring-coral"
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="btn-secondary cursor-pointer">
            Upload .txt or .md
            <input
              type="file"
              accept=".txt,.md,text/plain,text/markdown"
              className="sr-only"
              onChange={(event) => onUpload(event.target.files?.[0])}
            />
          </label>
          <button type="button" className="btn-primary" onClick={explain}>
            Explain this
          </button>
          {structured ? (
            <button type="button" className="btn-leaf" onClick={keep}>
              Save for Kiaan
            </button>
          ) : null}
        </div>
        {error ? (
          <p className="mt-3 text-lg font-extrabold text-berry" role="alert">
            {error}
          </p>
        ) : null}
      </section>

      {structured ? <NoteView note={structured} /> : null}

      <section>
        <h2 className="font-display text-3xl text-ink">Saved notes</h2>
        {!ready ? <p className="mt-2 text-lg">Loading saved notes…</p> : null}
        {ready && state.notes.length === 0 ? (
          <p className="mt-2 text-lg text-cocoa">Nothing saved yet. Explain a note, then save it in this browser.</p>
        ) : null}
        <ul className="mt-4 space-y-3">
          {state.notes.map((note) => (
            <li key={note.id} className="card py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl text-ink">{note.title}</h3>
                  <p className="text-base text-cocoa">{new Date(note.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="btn-secondary" onClick={() => setOpenId(note.id)}>
                    Open
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => deleteNote(note.id)}>
                    Delete
                  </button>
                </div>
              </div>
              {openSaved?.id === note.id ? (
                <div className="mt-4">
                  <NoteView note={note.structured} />
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
