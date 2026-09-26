"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  type AttemptInput,
  type ContestAward,
  type LastLesson,
  type LearnerState,
  type SavedNote,
  STORAGE_KEY,
  deleteNote as deleteNoteState,
  freshState,
  loadState,
  markConcept as markConceptState,
  markTricks as markTricksState,
  noteVisit as noteVisitState,
  recordAttempt as recordAttemptState,
  recordContest as recordContestState,
  saveNote as saveNoteState,
} from "@/lib/progress";

type ProgressApi = {
  ready: boolean;
  state: LearnerState;
  markConcept: (slug: string) => void;
  markTricks: (slug: string) => void;
  noteVisit: (slug: string, stage: LastLesson["stage"]) => void;
  recordAttempt: (attempt: AttemptInput) => number;
  recordContest: (contest: ContestAward) => void;
  saveNote: (note: SavedNote) => void;
  deleteNote: (id: string) => void;
  reset: () => void;
};

const ProgressContext = createContext<ProgressApi | null>(null);

export function Providers({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LearnerState>(freshState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(loadState(window.localStorage.getItem(STORAGE_KEY)));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [ready, state]);

  const api = useMemo<ProgressApi>(
    () => ({
      ready,
      state,
      markConcept: (slug) => setState((prev) => markConceptState(prev, slug)),
      markTricks: (slug) => setState((prev) => markTricksState(prev, slug)),
      noteVisit: (slug, stage) => setState((prev) => noteVisitState(prev, slug, stage)),
      recordAttempt: (attempt) => {
        let earned = 0;
        setState((prev) => {
          const result = recordAttemptState(prev, attempt);
          earned = result.xp;
          return result.state;
        });
        return earned;
      },
      recordContest: (contest) => setState((prev) => recordContestState(prev, contest)),
      saveNote: (note) => setState((prev) => saveNoteState(prev, note)),
      deleteNote: (id) => setState((prev) => deleteNoteState(prev, id)),
      reset: () => setState(freshState()),
    }),
    [ready, state],
  );

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressApi {
  const value = useContext(ProgressContext);
  if (!value) throw new Error("useProgress must be used inside Providers");
  return value;
}
