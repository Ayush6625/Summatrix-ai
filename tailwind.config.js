// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // For Next.js 'app' directory
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // For Next.js 'pages' directory
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // <--- THIS IS KEY! Make sure it covers your components
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Often a good catch-all for 'src' folder
    // If your components are in a specific folder like 'src/app/components':
    // "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}