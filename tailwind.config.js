const generateSpacings = (limit) => {
  const items = {};
  for (let i = 0; i <= limit; i += 2) {
    items[i.toString()] = `${i}px`;
  }
  return items;
};

// // Command to get widths greater than 200 & copy them to clipboard
// // rg "\W(([whxy]|m[tblrxy]?|p[tblrxy]?)-\d\d\d\d?)" -Io | rg "\d+" -Io | sort | uniq | awk '{if($1>200)print$1}' | sed '$!s/$/,/' | pbcopy

const spacing = {
  ...generateSpacings(200),
};
const negativeSpacing = {
  ...generateSpacings(50),
};

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    spacing: {
      ...spacing,
    },
    negativeSpacing: {
      ...negativeSpacing,
    },
    height: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      ...theme("negativeSpacing"),
    }),
    minHeight: (theme) => ({
      auto: "auto",
      screen: "100vh",
      500: "500px",
      ...theme("spacing"),
      ...theme("negativeSpacing"),
    }),
    margin: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      ...theme("negativeSpacing"),
    }),
    width: (theme) => ({
      full: "100%",
      auto: "auto",
      "16p": "16%",
      "84p": "84%",
      "60p": "60p",
      ...theme("spacing"),
      ...theme("negativeSpacing"),
    }),
    minWidth: (theme) => ({
      full: "100%",
      auto: "auto",
      "16p": "16%",
      "60p": "60%",
      ...theme("spacing"),
      ...theme("negativeSpacing"),
    }),
    padding: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      ...theme("negativeSpacing"),
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
