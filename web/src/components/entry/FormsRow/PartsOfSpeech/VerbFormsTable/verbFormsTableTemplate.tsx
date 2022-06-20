const jsonCopy = (json: any) => JSON.parse(JSON.stringify(json))

const verbSextet = [
  {
    topLeftText: "1",
    topRightText: "SG",
  },
  {
    topRightText: "PL",
  },
  {
    topLeftText: "2",
  },
  {},
  {
    topLeftText: "3",
  },
  {},
]

export const verbFormsTableTemplate: any = {
  IND: {
    PRES: {
      ACT: jsonCopy(verbSextet),
      PAS: jsonCopy(verbSextet),
    },
    IMP: {
      ACT: jsonCopy(verbSextet),
      PAS: jsonCopy(verbSextet),
    },
    FUT: {
      ACT: jsonCopy(verbSextet),
      PAS: jsonCopy(verbSextet),
    },
    PERF: {
      ACT: jsonCopy(verbSextet),
      PAS: jsonCopy(verbSextet),
    },
    PLUP: {
      ACT: jsonCopy(verbSextet),
      PAS: jsonCopy(verbSextet),
    },
    FUTP: {
      ACT: jsonCopy(verbSextet),
      PAS: jsonCopy(verbSextet),
    },
  },
  SUB: {
    PRES: {
      ACT: jsonCopy(verbSextet),
      PAS: jsonCopy(verbSextet),
    },
    IMP: {
      ACT: jsonCopy(verbSextet),
      PAS: jsonCopy(verbSextet),
    },
    PERF: {
      ACT: jsonCopy(verbSextet),
      PAS: jsonCopy(verbSextet),
    },
    PLUP: {
      ACT: jsonCopy(verbSextet),
      PAS: jsonCopy(verbSextet),
    },
  },
  IMP: {
    IMPERATIVE: {
      ACT: [
        {
          topLeftText: "2ND",
          topRightText: "SG",
          bottomLeftText: "PRES",
        },
        {
          topRightText: "PL",
          topLeftText: "2ND",
          bottomLeftText: "PRES",
        },
        {
          topLeftText: "2ND",
          bottomLeftText: "FUT",
        },
        {
          topLeftText: "2ND",
          bottomLeftText: "FUT",
        },
        {
          topLeftText: "3RD",
          bottomLeftText: "FUT",
        },
        {
          topLeftText: "3RD",
          bottomLeftText: "FUT",
        },
      ],
      PAS: [
        {
          topLeftText: "2ND",
          topRightText: "SG",
          bottomLeftText: "PRES",
        },
        {
          topRightText: "PL",
          topLeftText: "2ND",
          bottomLeftText: "PRES",
        },
        {
          topLeftText: "2ND",
          bottomLeftText: "FUT",
        },
        {
          topLeftText: "2ND",
          bottomLeftText: "FUT",
        },
        {
          topLeftText: "3RD",
          bottomLeftText: "FUT",
        },
        {
          topLeftText: "3RD",
          bottomLeftText: "FUT",
        },
      ],
    },
  },
  INF: {
    INFINITIVE: {
      "-": [
        {
          topLeftText: "PRES",
          topRightText: "ACT",
        },
        {
          topRightText: "PAS",
        },
        {
          topLeftText: "PERF",
        },
        {},
        {
          topLeftText: "FUT",
        },
        {},
      ],
    },
  },
  NONF: {
    "NON FINITE": {
      PARTICIPLE: [
        {
          topLeftText: "ACT",
          topRightText: "PRES",
        },
        {
          topLeftText: "PAS",
          topRightText: "PERF",
        },
        {
          topLeftText: "ACT",
          topRightText: "FUT",
        },
        {
          topLeftText: "PAS",
          topRightText: "FUT",
        },
        {},
        {},
      ],
      "GERUND/SUPINE": [
        {
          topLeftText: "GER",
          topRightText: "GEN",
        },
        {
          topLeftText: "GER",
          topRightText: "DAT",
        },
        {
          topLeftText: "GER",
          topRightText: "ACC",
        },
        {
          topLeftText: "GER",
          topRightText: "ABL",
        },
        {
          topLeftText: "SUP",
          topRightText: "ACC",
        },
        {
          topLeftText: "SUP",
          topRightText: "ABL",
        },
      ],
    },
  },
}
