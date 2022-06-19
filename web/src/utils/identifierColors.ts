import identifierAbbreviations from "./identifierAbbreviations"

export default {
  nominative: { backgroundColor: "royalblue", color: "white" },
  genitive: { backgroundColor: "forestgreen", color: "white" },
  dative: { backgroundColor: "chartreuse", color: "black" },
  accusative: { backgroundColor: "tomato", color: "white" },
  ablative: { backgroundColor: "hotpink", color: "white" },
  vocative: { backgroundColor: "orangered", color: "white" },
  locative: { backgroundColor: "brown", color: "white" },

  masculine: { backgroundColor: "orange", color: "white" },
  feminine: { backgroundColor: "green", color: "white" },
  neuter: { backgroundColor: "purple", color: "white" },

  singular: { backgroundColor: "white", color: "black" },
  plural: { backgroundColor: "black", color: "white" },

  indicative: { backgroundColor: "steelblue", color: "white" },
  subjunctive: { backgroundColor: "fuchsia", color: "white" },
  imperative: { backgroundColor: "maroon", color: "white" },
  infinitive: { backgroundColor: "lime", color: "black" },
  "non finite": { backgroundColor: "olive", color: "black" },

  present: { backgroundColor: "blue", color: "white" },
  imperfect: { backgroundColor: "darkgreen", color: "white" },
  future: { backgroundColor: "gold", color: "black" },
  perfect: { backgroundColor: "crimson", color: "white" },
  pluperfect: { backgroundColor: "indigo", color: "white" },
  "future perfect": { backgroundColor: "seagreen", color: "black" },

  active: { backgroundColor: "#555", color: "white" },
  passive: { backgroundColor: "#999", color: "black" },

  first: { backgroundColor: "yellow", color: "black" },
  second: { backgroundColor: "red", color: "white" },
  third: { backgroundColor: "blue", color: "white" },
} as Record<
  keyof typeof identifierAbbreviations,
  { backgroundColor: string; color: string }
>
