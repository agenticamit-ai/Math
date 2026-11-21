export const INTEREST_OPTIONS = ["sports", "science", "space", "animals", "history", "tech", "movies", "geography", "biographies"];

export const GENRE_LABELS: Record<string, string> = {
  fiction: "Fiction",
  informational: "Informational",
  argument: "Argument",
  poetry: "Poetry",
  paired: "Paired texts",
};

export const NEWS_CATEGORY_OPTIONS = ["sports", "science", "space", "tech", "movies", "world"] as const;
export const NEWS_CATEGORY_LABELS: Record<string, string> = {
  sports: "Sports",
  science: "Science",
  space: "Space",
  tech: "Tech",
  movies: "Movies & entertainment",
  world: "World (kid-safe)",
};
