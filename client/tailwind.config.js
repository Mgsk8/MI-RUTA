module.exports = {
  important: true, // Agrega !important a todas las clases generadas por Tailwind
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Asegúrate de incluir tus vistas JSX aquí
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: '#e0f2fe',
          200: '#bae6fd',
        },
        gray: {
          800: '#1f2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
};
