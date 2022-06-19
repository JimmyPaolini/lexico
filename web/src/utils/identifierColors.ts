import identifierAbbreviations from "./identifierAbbreviations"

export default {
  nominative: { backgroundColor: "royalblue", color: "white" },
  genitive: { backgroundColor: "forestgreen", color: "white" },
  dative: { backgroundColor: "yellow", color: "black" },
  accusative: { backgroundColor: "crimson", color: "white" },
  ablative: { backgroundColor: "hotpink", color: "white" },
  vocative: { backgroundColor: "orangered", color: "white" },
  locative: { backgroundColor: "brown", color: "white" },

  masculine: { backgroundColor: "orange", color: "white" },
  feminine: { backgroundColor: "green", color: "white" },
  neuter: { backgroundColor: "purple", color: "white" },

  singular: { backgroundColor: "white", color: "black" },
  plural: { backgroundColor: "black", color: "white" },

  indicative: { backgroundColor: "blue", color: "white" },
  subjunctive: { backgroundColor: "fuchia", color: "white" },
  imperative: { backgroundColor: "red", color: "white" },
  infinitive: { backgroundColor: "yellow", color: "black" },
  "non finite": { backgroundColor: "green", color: "black" },

  present: { backgroundColor: "blue", color: "white" },
  imperfect: { backgroundColor: "forestgreen", color: "white" },
  future: { backgroundColor: "yellow", color: "black" },
  perfect: { backgroundColor: "crimson", color: "white" },
  pluperfect: { backgroundColor: "cyan", color: "black" },
  "future perfect": { backgroundColor: "green", color: "black" },

  active: { backgroundColor: "#555", color: "white" },
  passive: { backgroundColor: "#999", color: "black" },

  first: { backgroundColor: "yellow", color: "black" },
  second: { backgroundColor: "red", color: "white" },
  third: { backgroundColor: "blue", color: "white" },
} as Record<
  keyof typeof identifierAbbreviations,
  { backgroundColor: string; color: string }
>
