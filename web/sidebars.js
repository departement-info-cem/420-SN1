// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: "doc",
      id: "cours/rencontre1", // Doit matcher le nom du document qui est dans docs/01-cours/. Les chiffres au début (ex : 01-) sont ignorés.
      customProps: { // Attention, il faut recompiler à chaque modification dans sidebar.js pour que les modifications s'appliquent.
        calendrier: {
          "Kevin": [
            {"1010": "2026-01-26"},
            {"1020": "2026-01-26"},
            {"1030": "2026-01-27"},
            {"1040": "2026-01-27"}
          ],
          "Mathieu": [
            {"1050": "2026-01-26"},
            {"1060": "2026-01-26"},
            {"1070": "2026-01-26"},
            {"1080": "2026-01-27"},
            {"1090": "2026-01-27"}
          ]
        },
        tooltip: "visible" // Valeurs possibles visible ou cache, valeur par défaut "visible"
      }
    },
    {
      type: "doc",
      id: "cours/rencontre2",
      customProps: {
        calendrier: {
          "Kevin": [
            {"1010": "2026-02-02"},
            {"1020": "2026-02-02"},
            {"1030": "2026-02-03"},
            {"1040": "2026-02-03"}
          ],
          "Mathieu": [
            {"1050": "2026-02-02"},
            {"1060": "2026-02-02"},
            {"1070": "2026-02-02"},
            {"1080": "2026-02-03"},
            {"1090": "2026-02-03"}
          ]
        }
      }
    },
    {
      type: "doc",
      id: "cours/rencontre3",
      customProps: {
        calendrier: {
          "Kevin": [
            {"1010": "2026-02-09"},
            {"1020": "2026-02-09"},
            {"1030": "2026-02-10"},
            {"1040": "2026-02-10"}
          ],
          "Mathieu": [
            {"1050": "2026-02-09"},
            {"1060": "2026-02-09"},
            {"1070": "2026-02-09"},
            {"1080": "2026-02-10"},
            {"1090": "2026-02-10"}
          ]
        }
      }
    },
    {
      type: "doc",
      id: "cours/rencontre4",
      customProps: {
        calendrier: {
          "Kevin": [
            {"1010": "2026-02-16"},
            {"1020": "2026-02-16"},
            {"1030": "2026-02-17"},
            {"1040": "2026-02-17"}
          ],
          "Mathieu": [
            {"1050": "2026-02-16"},
            {"1060": "2026-02-16"},
            {"1070": "2026-02-16"},
            {"1080": "2026-02-17"},
            {"1090": "2026-02-17"}
          ]
        }
      }
    },
    {
      type: "doc",
      id: "cours/rencontre5",
      customProps: {
        calendrier: {
          "Kevin": [
            {"1010": "2026-02-23"},
            {"1020": "2026-02-23"},
            {"1030": "2026-02-24"},
            {"1040": "2026-02-24"}
          ],
          "Mathieu": [
            {"1050": "2026-02-23"},
            {"1060": "2026-02-23"},
            {"1070": "2026-02-23"},
            {"1080": "2026-02-24"},
            {"1090": "2026-02-24"}
          ]
        }
      }
    },
    {
      type: "doc",
      id: "cours/rencontre6",
      customProps: {
        calendrier: {
          "Kevin": [
            {"1010": "2026-03-02"},
            {"1020": "2026-03-02"},
            {"1030": "2026-03-03"},
            {"1040": "2026-03-03"}
          ],
          "Mathieu": [
            {"1050": "2026-03-02"},
            {"1060": "2026-03-02"},
            {"1070": "2026-03-02"},
            {"1080": "2026-03-03"},
            {"1090": "2026-03-03"}
          ]
        }
      },
      "className": "remise-tp1"
    },
    {
      type: "doc",
      id: "cours/rencontre7",
      customProps: {
        calendrier: {
          "Kevin": [
            {"1010": "2026-03-09"},
            {"1020": "2026-03-09"},
            {"1030": "2026-03-10"},
            {"1040": "2026-03-10"}
          ],
          "Mathieu": [
            {"1050": "2026-03-09"},
            {"1060": "2026-03-09"},
            {"1070": "2026-03-09"},
            {"1080": "2026-03-10"},
            {"1090": "2026-03-10"}
          ]
        }
      }
    },
    {
      type: "doc",
      id: "cours/rencontre8",
      customProps: {
        calendrier: {
          "Kevin": [
            {"1010": "2026-03-23"},
            {"1020": "2026-03-23"},
            {"1030": "2026-03-24"},
            {"1040": "2026-03-24"}
          ],
          "Mathieu": [
            {"1050": "2026-03-23"},
            {"1060": "2026-03-23"},
            {"1070": "2026-03-23"},
            {"1080": "2026-03-24"},
            {"1090": "2026-03-24"}
          ]
        }
      },
      "className": "examen"
    },
    {
      type: "doc",
      id: "cours/rencontre9",
      customProps: {
        calendrier: {
          "Kevin": [
            {"1010": "2025-06-26"}
          ],
          "Mathieu": [
            {"1020": "2025-06-25"},
            {"1030": "2025-06-25"}
          ]
        }
      }
    },
    {
      type: "doc",
      id: "cours/rencontre10",
      customProps: {
        calendrier: {
          "Kevin": [
            {"1010": "2025-07-01"}
          ],
          "Mathieu": [
            {"1020": "2025-06-26"},
            {"1030": "2025-06-26"}
          ]
        }
      }
    },
    {
      type: "doc",
      id: "cours/rencontre11",
      customProps: {
        calendrier: {
          "Kevin": [
            {"1010": "2025-07-02"}
          ],
          "Mathieu": [
            {"1020": "2025-06-26"},
            {"1030": "2025-06-26"}
          ]
        }
      }
    },
    {
      type: "doc",
      id: "cours/rencontre12",
      customProps: {
        calendrier: {
          "Kevin": [
            {"1010": "2025-07-03"}
          ],
          "Mathieu": [
            {"1020": "2025-07-01"},
            {"1030": "2025-07-01"}
          ]
        }
      }
    },
    {
      type: "doc",
      id: "cours/rencontre13",
      customProps: {
        calendrier: {
          "Kevin": [
            {"1010": "2025-07-07"}
          ],
          "Mathieu": [
            {"1020": "2025-07-02"},
            {"1030": "2025-07-02"}
          ]
        }
      },
      "className": "remise-tp2"
    },
    {
      type: "doc",
      id: "cours/rencontre14",
      customProps: {
        calendrier: {
          "Kevin": [
            {"1010": "2025-07-10"}
          ],
          "Mathieu": [
            {"1020": "2025-07-04"},
            {"1030": "2025-07-04"}
          ]
        }
      }
    },
    {
      type: "doc",
      id: "cours/rencontre15",
      customProps: {
        calendrier: {
          "Kevin": [
            {"1010": "2025-07-09"}
          ],
          "Mathieu": [
            {"1020": "2025-07-02"},
            {"1030": "2025-07-02"}
          ]
        }
      },
      "className": "examen"
    }
  ],
  "tp": [
    {
      type: "autogenerated",
      "dirName": "02-tp"
    }
  ],
  "recettes": [
    {
      type: "autogenerated",
      "dirName": "03-recettes"
    }
  ],
  "aidememoire": [
    {
      type: "autogenerated",
      "dirName": "04-aidememoire"
    }
  ]
};

module.exports = sidebars;
