/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'selector',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#135bec", // Keep existing primary
                "primary-dark": "#1d4ed8", // Add from new design
                "background-light": "#F8FAFC",
                "card-white": "#ffffff",
                "border-subtle": "#e2e8f0",
                "slate-850": "#1e293b", // Add from new design
                "gold-highlight": "#f59e0b", // Add from new design
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "Inter", "sans-serif"], // Update to prioritize Plus Jakarta Sans
                "mono": ["JetBrains Mono", "Fira Code", "monospace"] // Update to prioritize JetBrains Mono
            },
            borderRadius: {
                "DEFAULT": "0.375rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem", // Add
                "3xl": "1.5rem", // Add
                "full": "9999px"
            },
            boxShadow: {
                "soft-xl": "0 20px 40px -10px rgba(0, 0, 0, 0.05), 0 0 10px rgba(0, 0, 0, 0.02)", // Add
                "premium": "0 10px 15px -3px rgba(37, 99, 235, 0.1), 0 4px 6px -4px rgba(37, 99, 235, 0.1)", // Add
            }
        },
    },
    plugins: [],
}
