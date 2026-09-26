const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');

// Read compressed base64 images
const catBase64 = fs.readFileSync(path.join(assetsDir, 'cat_thumb.jpg')).toString('base64');
const mountainBase64 = fs.readFileSync(path.join(assetsDir, 'mountain_thumb.jpg')).toString('base64');

function escapeXml(unsafe) {
  if (!unsafe || typeof unsafe !== 'string') return unsafe || '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const sharedStyles = `
  * { box-sizing: border-box; }

  @keyframes floatCat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }

  @keyframes glassGlow {
    0%, 100% { stroke: rgba(255, 255, 255, 0.2); }
    50% { stroke: rgba(255, 255, 255, 0.45); }
  }

  @keyframes pulseBadge {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }

  .font-serif {
    font-family: 'Playfair Display', 'Cormorant Garamond', 'Georgia', serif;
  }
  .font-sans {
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
  }
  .font-mono {
    font-family: 'Space Mono', 'Courier New', monospace;
  }

  .cat-float {
    animation: floatCat 4s ease-in-out infinite;
    transform-origin: center;
  }

  .glass-card {
    animation: glassGlow 5s ease-in-out infinite;
  }

  .badge-pulse {
    animation: pulseBadge 3s ease-in-out infinite;
    transform-origin: center;
  }
`;

function buildMountainGlassSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 840 1080" width="840" height="1080" fill="none">
  <defs>
    <style>
      ${sharedStyles}
    </style>

    <!-- Gradients for Glassmorphism -->
    <linearGradient id="mnt-fade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#070a12" stop-opacity="0" />
      <stop offset="30%" stop-color="#080c16" stop-opacity="0.6" />
      <stop offset="55%" stop-color="#090e1a" stop-opacity="0.94" />
      <stop offset="100%" stop-color="#060911" stop-opacity="1" />
    </linearGradient>

    <!-- Frosted Glass Card Fill -->
    <linearGradient id="glass-fill" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.03" />
    </linearGradient>

    <!-- Discord Button Gradient -->
    <linearGradient id="discord-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#5865F2" />
      <stop offset="100%" stop-color="#4752C4" />
    </linearGradient>

    <!-- Clips -->
    <clipPath id="frame-clip">
      <rect x="0" y="0" width="840" height="1080" rx="36" />
    </clipPath>

    <clipPath id="cat-clip">
      <rect x="550" y="475" width="225" height="225" rx="26" />
    </clipPath>
  </defs>

  <!-- Container with Clip -->
  <g clip-path="url(#frame-clip)">
    <!-- Base dark background -->
    <rect width="840" height="1080" fill="#060911" />

    <!-- Mountain Landscape Background at top -->
    <image href="data:image/jpeg;base64,${mountainBase64}" xlink:href="data:image/jpeg;base64,${mountainBase64}" x="0" y="0" width="840" height="525" preserveAspectRatio="xMidYMin slice" />

    <!-- Seamless Dark Glass Gradient Fade -->
    <rect x="0" y="160" width="840" height="920" fill="url(#mnt-fade)" />

    <!-- Ambient Grid and Crosshairs (like in the original UGH design) -->
    <text x="35" y="38" class="font-mono" font-size="11" fill="rgba(255,255,255,0.4)">+</text>
    <text x="805" y="38" class="font-mono" font-size="11" fill="rgba(255,255,255,0.4)">+</text>

    <!-- ======================================================== -->
    <!-- NAVBAR (Editorial Glass Style) -->
    <!-- ======================================================== -->
    <g id="navbar" transform="translate(48, 55)">
      <!-- Elegant Logo -->
      <text x="0" y="0" class="font-serif" font-size="28" font-weight="700" fill="#ffffff" letter-spacing="1px">GAORI</text>
      <text x="96" y="-3" class="font-sans" font-size="9" font-weight="600" fill="rgba(255,255,255,0.6)" letter-spacing="2px">DEV</text>

      <!-- Right menu indicator -->
      <g transform="translate(710, -18)">
        <text x="0" y="14" class="font-sans" font-size="13" font-weight="500" fill="#ffffff">About &amp; Skills</text>
        <line x1="0" y1="20" x2="34" y2="20" stroke="#ffffff" stroke-width="1.5" />
      </g>
    </g>

    <!-- ======================================================== -->
    <!-- HERO SECTION (Mountain Glass Style) -->
    <!-- ======================================================== -->
    <g id="hero" transform="translate(48, 175)">
      <!-- Large Bold Title -->
      <text x="0" y="0" class="font-sans" font-size="44" font-weight="800" fill="#ffffff" letter-spacing="-0.8px">
        Building Digital Dreams
      </text>
      <text x="0" y="48" class="font-sans" font-size="44" font-weight="800" fill="#ffffff" letter-spacing="-0.8px">
        With Modern Code. <tspan class="font-serif" font-weight="400" font-style="italic" fill="rgba(255,255,255,0.85)">Thumbs up.</tspan>
      </text>

      <!-- Subtitle Description -->
      <text x="0" y="90" class="font-sans" font-size="13" fill="rgba(255,255,255,0.8)" line-height="1.5">
        Full-stack developer crafting scalable web applications, responsive user interfaces,
      </text>
      <text x="0" y="110" class="font-sans" font-size="13" fill="rgba(255,255,255,0.8)">
        and reliable backend services. Clean code approved.
      </text>

      <!-- FROSTED GLASS PILL BAR: DISCORD (Like the email pill in image) -->
      <g class="badge-pulse" transform="translate(0, 140)">
        <!-- Outer Frosted Pill -->
        <rect width="440" height="52" rx="26" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.22)" stroke-width="1.2" />

        <!-- Discord Icon -->
        <g transform="translate(20, 16)">
          <path d="M16.5 3 C15.2 2.4 13.9 2 12.5 1.8 C12.3 2.1 12.1 2.6 12 2.9 C10.4 2.7 8.9 2.7 7.3 2.9 C7.2 2.6 7 2.1 6.8 1.8 C5.4 2 4.1 2.4 2.8 3 C0.3 6.8 -0.4 10.4 0.1 14 C1.8 15.2 3.4 16 5 16.5 C5.4 15.9 5.8 15.3 6.1 14.7 C5.5 14.5 5 14.2 4.4 13.9 C4.5 13.8 4.7 13.7 4.8 13.5 C8 15 11.4 15 14.5 13.5 C14.7 13.7 14.8 13.8 15 13.9 C14.4 14.2 13.9 14.5 13.3 14.7 C13.6 15.3 14 15.9 14.4 16.5 C16 16 17.6 15.2 19.3 14 C19.9 9.8 18.7 6.2 16.5 3 Z M6.4 11.8 C5.4 11.8 4.6 10.9 4.6 9.8 C4.6 8.7 5.4 7.8 6.4 7.8 C7.4 7.8 8.2 8.7 8.2 9.8 C8.2 10.9 7.4 11.8 6.4 11.8 Z M13 11.8 C12 11.8 11.2 10.9 11.2 9.8 C11.2 8.7 12 7.8 13 7.8 C14 7.8 14.8 8.7 14.8 9.8 C14.8 10.9 14 11.8 13 11.8 Z" fill="#5865F2" />
        </g>

        <!-- Discord Username Text -->
        <text x="52" y="32" class="font-sans" font-size="13" font-weight="500" fill="#ffffff">
          Discord: <tspan font-weight="700" fill="#d0d5ff">gaoriichita</tspan>
        </text>

        <!-- Connect Button inside pill -->
        <g transform="translate(290, 6)">
          <rect width="144" height="40" rx="20" fill="#ffffff" />
          <text x="62" y="25" class="font-sans" font-size="12" font-weight="700" fill="#0b0e17" text-anchor="middle">
            Connect
          </text>
          <circle cx="124" cy="20" r="12" fill="#5865F2" />
          <path d="M121 16 L126 20 L121 24 M125 20 L118 20" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </g>
    </g>

    <!-- ======================================================== -->
    <!-- ABOUT ME AND CAT PHOTO (Frosted Glass Card) -->
    <!-- ======================================================== -->
    <g id="about-card" transform="translate(48, 420)">
      <!-- Card Background -->
      <rect width="744" height="280" rx="30" fill="url(#glass-fill)" stroke="rgba(255, 255, 255, 0.16)" stroke-width="1.2" class="glass-card" />

      <!-- Left Side: About Me Info -->
      <g transform="translate(36, 42)">
        <text x="0" y="0" class="font-mono" font-size="11.5" font-weight="700" fill="#5865F2" letter-spacing="1.5px">// ABOUT ME</text>
        <text x="0" y="34" class="font-sans" font-size="24" font-weight="700" fill="#ffffff" letter-spacing="-0.3px">Gaori Ichita</text>

        <text x="0" y="70" class="font-sans" font-size="13" fill="rgba(255, 255, 255, 0.85)" line-height="1.6">
          Hello! I'm a passionate full-stack developer who loves building fast,
        </text>
        <text x="0" y="92" class="font-sans" font-size="13" fill="rgba(255, 255, 255, 0.85)">
          reliable web applications and clean user experiences.
        </text>

        <text x="0" y="130" class="font-sans" font-size="12.5" fill="rgba(255, 255, 255, 0.7)" font-style="italic">
          "Thumbs up for clean code, great architecture, and enjoyable development." 👍
        </text>

        <!-- Small stats row -->
        <g transform="translate(0, 168)">
          <rect width="130" height="34" rx="17" fill="rgba(88, 101, 242, 0.15)" stroke="rgba(88, 101, 242, 0.3)" stroke-width="1" />
          <text x="65" y="21" class="font-sans" font-size="11.5" font-weight="600" fill="#c4cbff" text-anchor="middle">5+ Years Exp</text>

          <g transform="translate(145, 0)">
            <rect width="150" height="34" rx="17" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.16)" stroke-width="1" />
            <text x="75" y="21" class="font-sans" font-size="11.5" font-weight="600" fill="#ffffff" text-anchor="middle">Full-stack Dev</text>
          </g>
        </g>
      </g>

      <!-- Right Side: Thumbs Up Cat Photo with Floating Animation -->
      <g class="cat-float">
        <!-- Photo Outer Glass Frame -->
        <rect x="495" y="28" width="220" height="220" rx="26" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1.5" />
        
        <!-- Cat Image Clip -->
        <g clip-path="url(#cat-clip)">
          <image href="data:image/jpeg;base64,${catBase64}" xlink:href="data:image/jpeg;base64,${catBase64}" x="495" y="28" width="220" height="220" preserveAspectRatio="xMidYMid slice" />
        </g>
      </g>
    </g>

    <!-- ======================================================== -->
    <!-- KEAHLIAN SAYA (SKILLS SECTION - 3 Glass Cards) -->
    <!-- ======================================================== -->
    <g id="skills" transform="translate(48, 735)">
      <text x="0" y="0" class="font-mono" font-size="11.5" font-weight="700" fill="#5865F2" letter-spacing="1.5px">// KEAHLIAN SAYA</text>
      <text x="0" y="26" class="font-sans" font-size="20" font-weight="700" fill="#ffffff">Technical Competencies &amp; Skills</text>

      <g transform="translate(0, 48)">
        <!-- 1. Front-end Card -->
        <g transform="translate(0, 0)">
          <rect width="235" height="180" rx="22" fill="url(#glass-fill)" stroke="rgba(255, 255, 255, 0.16)" stroke-width="1.2" class="glass-card" />
          <g transform="translate(20, 26)">
            <text x="0" y="0" class="font-sans" font-size="15" font-weight="700" fill="#ffffff">🎨 Front-end</text>
            <text x="0" y="30" class="font-sans" font-size="11" font-weight="600" fill="#5865F2">Modern UI / UX</text>

            <text x="0" y="58" class="font-sans" font-size="11" fill="rgba(255, 255, 255, 0.85)" line-height="1.5">React / Next.js / Vue.js</text>
            <text x="0" y="78" class="font-sans" font-size="11" fill="rgba(255, 255, 255, 0.85)">TypeScript / Tailwind CSS</text>
            <text x="0" y="98" class="font-sans" font-size="11" fill="rgba(255, 255, 255, 0.85)">HTML5 / SCSS / Redux</text>
            <text x="0" y="118" class="font-sans" font-size="11" fill="rgba(255, 255, 255, 0.85)">GraphQL / Vite / Nuxt</text>
          </g>
        </g>

        <!-- 2. Back-end Card -->
        <g transform="translate(255, 0)">
          <rect width="235" height="180" rx="22" fill="url(#glass-fill)" stroke="rgba(255, 255, 255, 0.16)" stroke-width="1.2" class="glass-card" />
          <g transform="translate(20, 26)">
            <text x="0" y="0" class="font-sans" font-size="15" font-weight="700" fill="#ffffff">⚙️ Back-end</text>
            <text x="0" y="30" class="font-sans" font-size="11" font-weight="600" fill="#5865F2">API &amp; Architecture</text>

            <text x="0" y="58" class="font-sans" font-size="11" fill="rgba(255, 255, 255, 0.85)">Node.js / Express / NestJS</text>
            <text x="0" y="78" class="font-sans" font-size="11" fill="rgba(255, 255, 255, 0.85)">Golang / Gin / GORM</text>
            <text x="0" y="98" class="font-sans" font-size="11" fill="rgba(255, 255, 255, 0.85)">PostgreSQL / MySQL</text>
            <text x="0" y="118" class="font-sans" font-size="11" fill="rgba(255, 255, 255, 0.85)">MongoDB / Redis / Kafka</text>
          </g>
        </g>

        <!-- 3. DevOps and Tools Card -->
        <g transform="translate(509, 0)">
          <rect width="235" height="180" rx="22" fill="url(#glass-fill)" stroke="rgba(255, 255, 255, 0.16)" stroke-width="1.2" class="glass-card" />
          <g transform="translate(20, 26)">
            <text x="0" y="0" class="font-sans" font-size="15" font-weight="700" fill="#ffffff">🛠️ DevOps &amp; Tools</text>
            <text x="0" y="30" class="font-sans" font-size="11" font-weight="600" fill="#5865F2">Deployment &amp; Cloud</text>

            <text x="0" y="58" class="font-sans" font-size="11" fill="rgba(255, 255, 255, 0.85)">Docker / Kubernetes (K8s)</text>
            <text x="0" y="78" class="font-sans" font-size="11" fill="rgba(255, 255, 255, 0.85)">Git / GitHub Actions</text>
            <text x="0" y="98" class="font-sans" font-size="11" fill="rgba(255, 255, 255, 0.85)">Linux / Bash / Nginx</text>
            <text x="0" y="118" class="font-sans" font-size="11" fill="rgba(255, 255, 255, 0.85)">CI/CD / Jest / WebSockets</text>
          </g>
        </g>
      </g>
    </g>

    <!-- Footer Note -->
    <text x="420" y="1035" class="font-sans" font-size="11" fill="rgba(255,255,255,0.4)" text-anchor="middle">
      Designed with Mountain Glassmorphism &amp; Clean Aesthetics &#8226; Gaori Ichita
    </text>

    <!-- Outer Frame Border -->
    <rect x="0" y="0" width="840" height="1080" rx="36" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.5" />
  </g>
</svg>`;
}

// Generate the new SVG
const mountainSvg = buildMountainGlassSvg();
fs.writeFileSync(path.join(__dirname, 'github-profile.svg'), mountainSvg);
console.log('✓ mountain-glass-mode: github-profile.svg created successfully! Size:', (mountainSvg.length / 1024).toFixed(2), 'KB');
