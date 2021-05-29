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
    screens: {
      sm: "640px",
      md: "769px",
      lg: "1024px",
      xl: "1280px",
    },
    container: {
      screens: {
        sm: "100%",
        md: "1366px",
        lg: "1366px",
        xl: "1366px",
      },
      padding: {
        default: "16px",
        md: "139px",
        lg: "139px",
        xl: "139px",
      },
    },
    height: (theme) => ({
      auto: "auto",
      full: "100%",
      ...theme("spacing"),
      ...theme("negativeSpacing"),
    }),
    minHeight: (theme) => ({
      auto: "auto",
      screen: "100vh",
      800: "800px",
      500: "500px",
      "90vh": "90vh",
      "80vh": "80vh",
      ...theme("spacing"),
      ...theme("negativeSpacing"),
    }),
    margin: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      ...theme("negativeSpacing"),
      "300n": "-300px",
    }),
    width: (theme) => ({
      full: "100%",
      auto: "auto",
      "20p": "20%",
      "80p": "80%",
      "60p": "60%",
      300: "300px",
      500: "500px",
      ...theme("spacing"),
      ...theme("negativeSpacing"),
    }),
    minWidth: (theme) => ({
      full: "100%",
      auto: "auto",
      "16p": "16%",
      "20p": "20%",
      "60p": "60%",
      ...theme("spacing"),
      ...theme("negativeSpacing"),
    }),
    maxWidth: (theme) => ({
      full: "100%",
      auto: "auto",
      "20p": "20%",
      ...theme("spacing"),
      ...theme("negativeSpacing"),
    }),
    inset: () => ({
      0: "0px",
      20: "20px",
      300: "300px",
    }),
    padding: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      ...theme("negativeSpacing"),
    }),
    zIndex: {
      50: "50",
      999: "999",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
