import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        ghibli: {
          cream: "#f8f3e8",
          brown: "#432818",
          peach: "#e8a87c",
          mauve: "#c38d9e",
          teal: "#85cdca",
          purple: "#85677c",
        },
      },
      fontFamily: {
        sans: ["var(--font-lora)"],
        serif: ["var(--font-playfair)"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#432818",
            a: {
              color: "#85677c",
              "&:hover": {
                color: "#432818",
              },
            },
            h1: {
              fontFamily: "var(--font-playfair)",
            },
            h2: {
              fontFamily: "var(--font-playfair)",
            },
            h3: {
              fontFamily: "var(--font-playfair)",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

export default config
