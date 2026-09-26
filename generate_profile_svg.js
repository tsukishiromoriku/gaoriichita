const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const catBase64 = fs.readFileSync(path.join(assetsDir, 'cat_thumb.jpg')).toString('base64');
const mountainBase64 = fs.readFileSync(path.join(assetsDir, 'mountain_thumb.jpg')).toString('base64');

function pill(x, y, w, text) {
  return `<rect x="${x}" y="${y}" width="${w}" height="24" rx="7" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <text x="${x + w / 2}" y="${y + 16}" class="font-sans" font-size="11" font-weight="500" fill="rgba(255,255,255,0.85)" text-anchor="middle">${text}</text>`;
}

function buildSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 880 960" width="880" height="960" fill="none">
  <defs>
    <style>
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      @keyframes shimmer {
        0% { opacity: 0.4; }
        50% { opacity: 0.8; }
        100% { opacity: 0.4; }
      }
      @keyframes glow {
        0%, 100% { stop-opacity: 0.08; }
        50% { stop-opacity: 0.15; }
      }
      @keyframes pulse {
        0%, 100% { r: 3; opacity: 0.6; }
        50% { r: 4.5; opacity: 1; }
      }
      @keyframes borderGlow {
        0%, 100% { stroke-opacity: 0.15; }
        50% { stroke-opacity: 0.35; }
      }
      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes breathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.015); }
      }

      .font-display {
        font-family: Georgia, 'Times New Roman', serif;
      }
      .font-sans {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      }
      .font-mono {
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      }
      .cat-float {
        animation: float 5s ease-in-out infinite;
        transform-origin: center;
      }
      .shimmer-line {
        animation: shimmer 3s ease-in-out infinite;
      }
      .breathe {
        animation: breathe 4s ease-in-out infinite;
        transform-origin: center;
      }
      .border-glow {
        animation: borderGlow 4s ease-in-out infinite;
      }
      .star-pulse {
        animation: pulse 3s ease-in-out infinite;
      }
      .star-pulse-delay {
        animation: pulse 3s ease-in-out infinite 1.5s;
      }
    </style>

    <!-- Gradients -->
    <linearGradient id="bg-fade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a0e1a" stop-opacity="0"/>
      <stop offset="25%" stop-color="#0a0e1a" stop-opacity="0.3"/>
      <stop offset="50%" stop-color="#0a0e1a" stop-opacity="0.85"/>
      <stop offset="75%" stop-color="#0c1020" stop-opacity="0.97"/>
      <stop offset="100%" stop-color="#0c1020" stop-opacity="1"/>
    </linearGradient>

    <linearGradient id="glass-card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.07"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02"/>
    </linearGradient>

    <linearGradient id="glass-card-hover" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.04"/>
    </linearGradient>

    <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7c6aef"/>
      <stop offset="50%" stop-color="#5865F2"/>
      <stop offset="100%" stop-color="#4aa8d8"/>
    </linearGradient>

    <linearGradient id="title-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#e0e4ff"/>
      <stop offset="100%" stop-color="#a8b4ff"/>
    </linearGradient>

    <linearGradient id="nav-pill-bg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.05"/>
    </linearGradient>

    <radialGradient id="ambient-glow-1" cx="15%" cy="20%" r="40%">
      <stop offset="0%" stop-color="#5865F2" stop-opacity="0.06">
        <animate attributeName="stop-opacity" values="0.06;0.12;0.06" dur="6s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" stop-color="#5865F2" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="ambient-glow-2" cx="85%" cy="70%" r="35%">
      <stop offset="0%" stop-color="#7c6aef" stop-opacity="0.04">
        <animate attributeName="stop-opacity" values="0.04;0.09;0.04" dur="8s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" stop-color="#7c6aef" stop-opacity="0"/>
    </radialGradient>

    <!-- Clips -->
    <clipPath id="outer-clip">
      <rect x="0" y="0" width="880" height="960" rx="32"/>
    </clipPath>
    <clipPath id="cat-clip">
      <rect x="565" y="370" width="190" height="205" rx="22"/>
    </clipPath>
    <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <g clip-path="url(#outer-clip)">
    <!-- ============== BASE BACKGROUND ============== -->
    <rect width="880" height="960" fill="#0c1020"/>

    <!-- Mountain Background -->
    <image href="data:image/jpeg;base64,${mountainBase64}" xlink:href="data:image/jpeg;base64,${mountainBase64}" x="0" y="0" width="880" height="520" preserveAspectRatio="xMidYMin slice" opacity="0.9"/>

    <!-- Gradient Fade Over Mountain -->
    <rect x="0" y="100" width="880" height="860" fill="url(#bg-fade)"/>

    <!-- Ambient Glow Effects -->
    <rect width="880" height="960" fill="url(#ambient-glow-1)"/>
    <rect width="880" height="960" fill="url(#ambient-glow-2)"/>

    <!-- Decorative Stars -->
    <circle cx="120" cy="60" r="1.5" fill="#ffffff" opacity="0.7" class="star-pulse"/>
    <circle cx="300" cy="35" r="1" fill="#ffffff" opacity="0.5" class="star-pulse-delay"/>
    <circle cx="550" cy="50" r="1.8" fill="#ffffff" opacity="0.6" class="star-pulse"/>
    <circle cx="750" cy="80" r="1.2" fill="#ffffff" opacity="0.4" class="star-pulse-delay"/>
    <circle cx="200" cy="100" r="0.8" fill="#ffffff" opacity="0.3" class="star-pulse"/>
    <circle cx="680" cy="40" r="1" fill="#ffffff" opacity="0.5" class="star-pulse"/>

    <!-- Fine Grid Lines (Subtle Design Element) -->
    <line x1="44" y1="0" x2="44" y2="960" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/>
    <line x1="836" y1="0" x2="836" y2="960" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/>
    <line x1="0" y1="44" x2="880" y2="44" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/>

    <!-- Corner Crosshairs -->
    <g opacity="0.3">
      <line x1="30" y1="30" x2="58" y2="30" stroke="#ffffff" stroke-width="0.5"/>
      <line x1="44" y1="16" x2="44" y2="44" stroke="#ffffff" stroke-width="0.5"/>
      <line x1="822" y1="30" x2="850" y2="30" stroke="#ffffff" stroke-width="0.5"/>
      <line x1="836" y1="16" x2="836" y2="44" stroke="#ffffff" stroke-width="0.5"/>
    </g>

    <!-- ============================================ -->
    <!-- NAVBAR -->
    <!-- ============================================ -->
    <g id="navbar" transform="translate(44, 54)">
      <!-- Nav Items Right Side -->
      <g transform="translate(530, -14)">
        <!-- About pill -->
        <rect x="0" y="0" width="70" height="30" rx="15" fill="url(#nav-pill-bg)" stroke="rgba(255,255,255,0.12)" stroke-width="0.8"/>
        <text x="35" y="19" class="font-sans" font-size="11" font-weight="500" fill="rgba(255,255,255,0.9)" text-anchor="middle">About</text>

        <!-- Skills pill -->
        <rect x="80" y="0" width="70" height="30" rx="15" fill="url(#nav-pill-bg)" stroke="rgba(255,255,255,0.12)" stroke-width="0.8"/>
        <text x="115" y="19" class="font-sans" font-size="11" font-weight="500" fill="rgba(255,255,255,0.9)" text-anchor="middle">Skills</text>

        <!-- Discord pill (active) -->
        <rect x="160" y="0" width="92" height="30" rx="15" fill="rgba(88,101,242,0.2)" stroke="rgba(88,101,242,0.5)" stroke-width="0.8"/>
        <circle cx="178" cy="15" r="4" fill="#5865F2"/>
        <text x="210" y="19" class="font-sans" font-size="11" font-weight="600" fill="#c4cbff" text-anchor="middle">Discord</text>
      </g>
    </g>

    <!-- ============================================ -->
    <!-- HERO SECTION -->
    <!-- ============================================ -->
    <g id="hero" transform="translate(50, 135)">
      <!-- Main Title -->
      <text x="0" y="44" class="font-sans" font-size="52" font-weight="800" fill="url(#title-gradient)" letter-spacing="-1.5px">
        Building Digital
      </text>
      <text x="0" y="100" class="font-sans" font-size="52" font-weight="800" fill="url(#title-gradient)" letter-spacing="-1.5px">
        Dreams <tspan class="font-display" font-weight="400" font-style="italic" fill="rgba(255,255,255,0.7)" font-size="46">with code.</tspan>
      </text>

      <!-- Subtitle -->
      <text x="0" y="142" class="font-sans" font-size="14" fill="rgba(255,255,255,0.6)" letter-spacing="0.2px">
        Full-stack developer crafting scalable web applications,
      </text>
      <text x="0" y="164" class="font-sans" font-size="14" fill="rgba(255,255,255,0.6)" letter-spacing="0.2px">
        responsive interfaces, and reliable backend services.
      </text>

      <!-- Accent Line -->
      <rect x="0" y="184" width="60" height="3" rx="1.5" fill="url(#accent-gradient)" class="shimmer-line"/>
    </g>

    <!-- ============================================ -->
    <!-- ABOUT ME CARD (Frosted Glass)                -->
    <!-- ============================================ -->
    <g id="about" transform="translate(44, 350)">
      <!-- Card Background -->
      <rect width="792" height="255" rx="28" fill="url(#glass-card)" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#soft-shadow)" class="border-glow"/>

      <!-- Inner Glass Highlight Line (top) -->
      <line x1="28" y1="1" x2="200" y2="1" stroke="rgba(255,255,255,0.15)" stroke-width="1" stroke-linecap="round"/>

      <!-- Left Side: About Info -->
      <g transform="translate(38, 30)">
        <!-- Name -->
        <text x="0" y="24" class="font-sans" font-size="28" font-weight="800" fill="#ffffff" letter-spacing="-0.5px">Gaori Ichita</text>

        <!-- Bio Text -->
        <text x="0" y="58" class="font-sans" font-size="13.5" fill="rgba(255,255,255,0.8)" letter-spacing="0.2px">
          Hello! I'm a passionate full-stack developer who loves
        </text>
        <text x="0" y="80" class="font-sans" font-size="13.5" fill="rgba(255,255,255,0.8)" letter-spacing="0.2px">
          building fast, reliable web apps and clean user experiences.
        </text>

        <!-- Quote -->
        <text x="0" y="116" class="font-display" font-size="13" fill="rgba(255,255,255,0.55)" font-style="italic">
          "Clean code, great architecture, and enjoyable development."
        </text>

        <!-- Stats Badges -->
        <g transform="translate(0, 146)">
          <!-- Badge 1 -->
          <rect width="140" height="36" rx="18" fill="rgba(88,101,242,0.12)" stroke="rgba(88,101,242,0.3)" stroke-width="0.8"/>
          <text x="70" y="23" class="font-sans" font-size="11.5" font-weight="600" fill="#b4bcff" text-anchor="middle">5+ Years Exp</text>

          <!-- Badge 2 -->
          <g transform="translate(155, 0)">
            <rect width="155" height="36" rx="18" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
            <text x="77" y="23" class="font-sans" font-size="11.5" font-weight="600" fill="rgba(255,255,255,0.85)" text-anchor="middle">Full-stack Dev</text>
          </g>

          <!-- Badge 3 -->
          <g transform="translate(325, 0)">
            <rect width="130" height="36" rx="18" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.25)" stroke-width="0.8"/>
            <circle cx="18" cy="18" r="4" fill="#22c55e" opacity="0.8"/>
            <text x="75" y="23" class="font-sans" font-size="11.5" font-weight="600" fill="rgba(134,239,172,0.9)" text-anchor="middle">Open to work</text>
          </g>
        </g>
      </g>

      <!-- Right Side: Cat Photo -->
      <g class="cat-float">
        <!-- Photo Frame Glass Border -->
        <rect x="560" y="20" width="200" height="215" rx="22" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>

        <!-- Cat Image -->
        <g clip-path="url(#cat-clip)">
          <image href="data:image/jpeg;base64,${catBase64}" xlink:href="data:image/jpeg;base64,${catBase64}" x="565" y="25" width="190" height="205" preserveAspectRatio="xMidYMid slice"/>
        </g>

        <!-- Photo Label -->
        <text x="660" y="248" class="font-mono" font-size="9" fill="rgba(255,255,255,0.3)" text-anchor="middle" letter-spacing="1px">MEOW.JPG</text>
      </g>
    </g>

    <!-- ============================================ -->
    <!-- SKILLS SECTION (Premium Glass Chip Cards)    -->
    <!-- ============================================ -->
    <g id="skills" transform="translate(44, 635)">
      <!-- Section Header -->
      <text x="0" y="0" class="font-sans" font-size="22" font-weight="700" fill="#ffffff" letter-spacing="-0.3px">Technical Skills</text>

      <!-- Decorative dots -->
      <g transform="translate(700, -8)">
        <circle cx="0" cy="0" r="3" fill="rgba(88,101,242,0.4)"/>
        <circle cx="14" cy="0" r="3" fill="rgba(124,106,239,0.3)"/>
        <circle cx="28" cy="0" r="3" fill="rgba(74,168,216,0.2)"/>
      </g>

      <!-- Skills Grid (Sleek Cards with Individual Tag Pills) -->
      <g transform="translate(0, 20)">
        <!-- ===== Card 1: Frontend ===== -->
        <g transform="translate(0, 0)">
          <rect width="252" height="216" rx="20" fill="url(#glass-card)" stroke="rgba(255,255,255,0.1)" stroke-width="0.8" class="border-glow"/>

          <!-- Header: Icon Badge + Titles -->
          <rect x="18" y="16" width="36" height="36" rx="10" fill="rgba(88,101,242,0.15)" stroke="rgba(88,101,242,0.35)" stroke-width="0.8"/>
          <!-- Monitor Vector Icon -->
          <rect x="25" y="23" width="22" height="15" rx="2" fill="none" stroke="#5865F2" stroke-width="1.5"/>
          <line x1="31" y1="38" x2="41" y2="38" stroke="#5865F2" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="36" y1="38" x2="36" y2="42" stroke="#5865F2" stroke-width="1.5"/>
          <line x1="30" y1="42" x2="42" y2="42" stroke="#5865F2" stroke-width="1.5" stroke-linecap="round"/>

          <text x="64" y="32" class="font-sans" font-size="16" font-weight="700" fill="#ffffff">Front-end</text>
          <text x="64" y="47" class="font-sans" font-size="9.5" font-weight="600" fill="#7c6aef" letter-spacing="0.8px">MODERN UI / UX</text>

          <!-- Divider -->
          <line x1="18" y1="64" x2="234" y2="64" stroke="rgba(255,255,255,0.07)" stroke-width="0.8"/>

          <!-- Skill Pills (Clean Grid) -->
          ${pill(18, 76, 56, 'React')}
          ${pill(80, 76, 64, 'Next.js')}
          ${pill(150, 76, 58, 'Vue.js')}

          ${pill(18, 108, 86, 'TypeScript')}
          ${pill(110, 108, 98, 'Tailwind CSS')}

          ${pill(18, 140, 96, 'HTML5 / CSS3')}
          ${pill(120, 140, 58, 'Redux')}

          ${pill(18, 172, 70, 'GraphQL')}
          ${pill(94, 172, 50, 'Vite')}
          ${pill(150, 172, 60, 'Nuxt.js')}
        </g>

        <!-- ===== Card 2: Backend ===== -->
        <g transform="translate(270, 0)">
          <rect width="252" height="216" rx="20" fill="url(#glass-card)" stroke="rgba(255,255,255,0.1)" stroke-width="0.8" class="border-glow"/>

          <!-- Header: Icon Badge + Titles -->
          <rect x="18" y="16" width="36" height="36" rx="10" fill="rgba(124,106,239,0.15)" stroke="rgba(124,106,239,0.35)" stroke-width="0.8"/>
          <!-- Server Vector Icon -->
          <ellipse cx="36" cy="24" rx="9" ry="3" fill="none" stroke="#7c6aef" stroke-width="1.5"/>
          <path d="M27 24 v5 c0 1.6 4 3 9 3 s9 -1.4 9 -3 v-5" fill="none" stroke="#7c6aef" stroke-width="1.5"/>
          <path d="M27 29 v5 c0 1.6 4 3 9 3 s9 -1.4 9 -3 v-5" fill="none" stroke="#7c6aef" stroke-width="1.5"/>
          <path d="M27 34 v5 c0 1.6 4 3 9 3 s9 -1.4 9 -3 v-5" fill="none" stroke="#7c6aef" stroke-width="1.5"/>

          <text x="64" y="32" class="font-sans" font-size="16" font-weight="700" fill="#ffffff">Back-end</text>
          <text x="64" y="47" class="font-sans" font-size="9.5" font-weight="600" fill="#a8b4ff" letter-spacing="0.8px">API &amp; ARCHITECTURE</text>

          <!-- Divider -->
          <line x1="18" y1="64" x2="234" y2="64" stroke="rgba(255,255,255,0.07)" stroke-width="0.8"/>

          <!-- Skill Pills (Clean Grid) -->
          ${pill(18, 76, 66, 'Node.js')}
          ${pill(90, 76, 64, 'Express')}
          ${pill(160, 76, 60, 'NestJS')}

          ${pill(18, 108, 60, 'Golang')}
          ${pill(84, 108, 88, 'PostgreSQL')}
          ${pill(178, 108, 50, 'Redis')}

          ${pill(18, 140, 58, 'MySQL')}
          ${pill(82, 140, 74, 'MongoDB')}
          ${pill(162, 140, 56, 'GORM')}

          ${pill(18, 172, 78, 'REST APIs')}
          ${pill(102, 172, 54, 'Kafka')}
          ${pill(162, 172, 46, 'Gin')}
        </g>

        <!-- ===== Card 3: DevOps ===== -->
        <g transform="translate(540, 0)">
          <rect width="252" height="216" rx="20" fill="url(#glass-card)" stroke="rgba(255,255,255,0.1)" stroke-width="0.8" class="border-glow"/>

          <!-- Header: Icon Badge + Titles -->
          <rect x="18" y="16" width="36" height="36" rx="10" fill="rgba(74,168,216,0.15)" stroke="rgba(74,168,216,0.35)" stroke-width="0.8"/>
          <!-- Cloud Vector Icon -->
          <path d="M29 38 c-2.5 0 -4 -1.6 -4 -3.8 c0 -1.8 1.2 -3.2 2.8 -3.6 c0.3 -2.8 2.6 -4.8 5.6 -4.8 c2.8 0 5 1.8 5.5 4.5 c1.8 0.3 3.1 1.8 3.1 3.7 c0 2.2 -1.8 4 -4 4 Z" fill="none" stroke="#4aa8d8" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M33 33 L36 36 L41 31" fill="none" stroke="#4aa8d8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>

          <text x="64" y="32" class="font-sans" font-size="16" font-weight="700" fill="#ffffff">DevOps</text>
          <text x="64" y="47" class="font-sans" font-size="9.5" font-weight="600" fill="#7dd3fc" letter-spacing="0.8px">DEPLOY &amp; CLOUD</text>

          <!-- Divider -->
          <line x1="18" y1="64" x2="234" y2="64" stroke="rgba(255,255,255,0.07)" stroke-width="0.8"/>

          <!-- Skill Pills (Clean Grid) -->
          ${pill(18, 76, 62, 'Docker')}
          ${pill(86, 76, 88, 'Kubernetes')}
          ${pill(180, 76, 44, 'Git')}

          ${pill(18, 108, 110, 'GitHub Actions')}
          ${pill(134, 108, 54, 'Linux')}

          ${pill(18, 140, 58, 'Nginx')}
          ${pill(82, 140, 64, 'CI / CD')}
          ${pill(152, 140, 52, 'Bash')}

          ${pill(18, 172, 68, 'Grafana')}
          ${pill(92, 172, 90, 'Prometheus')}
        </g>
      </g>
    </g>

    <!-- ============================================ -->
    <!-- FOOTER -->
    <!-- ============================================ -->
    <g transform="translate(440, 910)">
      <!-- Decorative Line -->
      <line x1="-350" y1="0" x2="350" y2="0" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>

      <!-- Footer Text -->
      <text x="0" y="28" class="font-sans" font-size="11" fill="rgba(255,255,255,0.3)" text-anchor="middle" letter-spacing="0.5px">
        Designed with Glassmorphism &#8226; Gaori Ichita &#169; 2026
      </text>

      <!-- Small decorative dots -->
      <circle cx="-22" cy="28" r="1.5" fill="rgba(88,101,242,0.3)"/>
      <circle cx="22" cy="28" r="1.5" fill="rgba(124,106,239,0.3)"/>
    </g>

    <!-- ============================================ -->
    <!-- OUTER FRAME BORDER -->
    <!-- ============================================ -->
    <rect x="0" y="0" width="880" height="960" rx="32" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" class="border-glow"/>
  </g>
</svg>`;
}

const svg = buildSvg();
fs.writeFileSync(path.join(__dirname, 'github-profile.svg'), svg);
console.log('✅ Premium glassmorphism SVG with neat tech pills generated!');
console.log('   Size:', (svg.length / 1024).toFixed(2), 'KB');
