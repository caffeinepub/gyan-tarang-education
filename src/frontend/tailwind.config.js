import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', "sans-serif"],
        body: ['"Plus Jakarta Sans"', "sans-serif"],
        ui: ['"Sora"', "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        // Brand tokens - multicolor
        saffron: "oklch(var(--saffron) / <alpha-value>)",
        navy: "oklch(var(--navy) / <alpha-value>)",
        "india-green": "oklch(var(--india-green) / <alpha-value>)",
        cream: "oklch(var(--cream) / <alpha-value>)",
        "neon-cyan": "oklch(var(--neon-cyan) / <alpha-value>)",
        "neon-green": "oklch(var(--neon-green) / <alpha-value>)",
        "cosmic-bg": "oklch(var(--cosmic-bg) / <alpha-value>)",
        "cosmic-card": "oklch(var(--cosmic-card) / <alpha-value>)",
        // Accent category colors
        "brand-pink": "oklch(var(--brand-pink) / <alpha-value>)",
        "brand-purple": "oklch(var(--brand-purple) / <alpha-value>)",
        "brand-blue": "oklch(var(--brand-blue) / <alpha-value>)",
        "brand-green": "oklch(var(--brand-green) / <alpha-value>)",
        "brand-orange": "oklch(var(--brand-orange) / <alpha-value>)",
        "brand-red": "oklch(var(--brand-red) / <alpha-value>)",
        "brand-teal": "oklch(var(--brand-teal) / <alpha-value>)",
        "brand-indigo": "oklch(var(--brand-indigo) / <alpha-value>)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        card: "0 2px 12px oklch(0.55 0.22 310 / 0.08)",
        "card-hover": "0 8px 25px oklch(0.55 0.22 310 / 0.15)",
        "neon-cyan": "0 4px 16px oklch(0.55 0.22 230 / 0.3), 0 2px 6px oklch(0.55 0.22 230 / 0.12)",
        "neon-green": "0 4px 16px oklch(0.50 0.20 145 / 0.3), 0 2px 6px oklch(0.50 0.20 145 / 0.12)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "wave-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.7" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        "color-pulse": {
          "0%, 100%": { boxShadow: "0 4px 16px oklch(0.55 0.22 310 / 0.15)" },
          "50%": { boxShadow: "0 4px 24px oklch(0.55 0.22 310 / 0.4), 0 8px 40px oklch(0.55 0.22 310 / 0.2)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s infinite linear",
        "wave-pulse": "wave-pulse 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "neon-pulse": "color-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
