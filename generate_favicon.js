const fs = require('fs');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#221a10" stroke="none">
  <!-- This is the 'medical_services' material symbol path, adapted for SVG -->
  <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm.88 12.33v-1.74h-1.76v1.74H9.36v-1.74H7.59v-1.77h1.77v-1.75H7.59V9.03h1.77V7.27h1.76v1.76h1.76V7.27h1.77v1.76h1.76v1.77h-1.76v1.75h1.76v1.77h-1.76z M12.88 10.79h-1.76V9.03h1.76v1.76z" />
  <rect x="2" y="2" width="20" height="20" rx="4" fill="#f49d25" />
  <path d="M16 15h-3v3h-2v-3H8v-2h3v-3h2v3h3v2z" fill="#221a10" />
</svg>`;

fs.writeFileSync('c:/Users/conta/OneDrive/Desktop/distcare/public/icon.svg', svgContent);
console.log('SVG icon created!');
