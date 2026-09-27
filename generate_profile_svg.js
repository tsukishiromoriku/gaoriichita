const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const catBase64 = fs.readFileSync(path.join(assetsDir, 'cat_thumb.jpg')).toString('base64');
const mountainBase64 = fs.readFileSync(path.join(assetsDir, 'mountain_thumb.jpg')).toString('base64');
const catChar1Base64 = fs.readFileSync(path.join(assetsDir, 'char_meme1.gif')).toString('base64');
const catChar2Base64 = fs.readFileSync(path.join(assetsDir, 'char_meme2.gif')).toString('base64');
const catChar3Base64 = fs.readFileSync(path.join(assetsDir, 'char_meme3.gif')).toString('base64');
const natureBase64 = fs.readFileSync(path.join(assetsDir, 'nature.gif')).toString('base64');

function pill(x, y, w, text) {
  return `<rect x="${x}" y="${y}" width="${w}" height="24" rx="7" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <text x="${x + w / 2}" y="${y + 16}" class="font-sans" font-size="11" font-weight="500" fill="rgba(255,255,255,0.85)" text-anchor="middle">${text}</text>`;
}

function buildSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 880 2350" width="880" height="2350" fill="none">
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
      @keyframes flowDash {
        to {
          stroke-dashoffset: -14;
        }
      }
      .flow-line {
        stroke-dasharray: 4, 3;
        animation: flowDash 1.2s linear infinite;
      }

      .font-display {
        font-family: 'Playfair Display', 'Didot', 'Bodoni MT', 'Cinzel', Georgia, 'Times New Roman', serif;
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

      .breathe {
        animation: breathe 4s ease-in-out infinite;
        transform-origin: center;
      }
      .border-glow {
        animation: borderGlow 4s ease-in-out infinite;
      }
    </style>

    <!-- Gradients -->
    <linearGradient id="bg-fade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="25%" stop-color="#000000" stop-opacity="0.15"/>
      <stop offset="55%" stop-color="#000000" stop-opacity="0.5"/>
      <stop offset="85%" stop-color="#000000" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
    </linearGradient>

    <!-- Plain Frosted Glass Card Fill -->
    <linearGradient id="glass-card-surface" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.13"/>
      <stop offset="45%" stop-color="#ffffff" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02"/>
    </linearGradient>

    <!-- Plain Frosted Specular Sheen (Top Rim Light) -->
    <linearGradient id="glass-card-top-light" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.24"/>
      <stop offset="60%" stop-color="#ffffff" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>

    <!-- Plain Frosted Diffuse Aura (Monochrome White Blur for Cards) -->
    <radialGradient id="plain-frosted-aura" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="60%" stop-color="#ffffff" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C1FF4D"/>
      <stop offset="50%" stop-color="#67FF4D"/>
      <stop offset="100%" stop-color="#4DFF8B"/>
    </linearGradient>

    <linearGradient id="title-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>

    <linearGradient id="nav-pill-bg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.05"/>
    </linearGradient>

    <linearGradient id="bar-grad-backend" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4D5FFF"/>
      <stop offset="100%" stop-color="#944DFF"/>
    </linearGradient>
    <linearGradient id="bar-grad-frontend" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#944DFF"/>
      <stop offset="100%" stop-color="#ED4DFF"/>
    </linearGradient>
    <linearGradient id="bar-grad-db" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4D5FFF"/>
      <stop offset="100%" stop-color="#ED4DFF"/>
    </linearGradient>
    <linearGradient id="bar-grad-devops" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ED4DFF"/>
      <stop offset="100%" stop-color="#944DFF"/>
    </linearGradient>

    <!-- Clips -->
    <clipPath id="outer-clip">
      <rect x="0" y="0" width="880" height="2350" rx="32"/>
    </clipPath>
    <clipPath id="cat-clip">
      <rect x="565" y="25" width="190" height="205" rx="20"/>
    </clipPath>
    <clipPath id="cat-char1-clip">
      <rect x="0" y="0" width="66" height="66" rx="12"/>
    </clipPath>
    <clipPath id="cat-char2-clip">
      <rect x="0" y="0" width="66" height="66" rx="12"/>
    </clipPath>
    <clipPath id="cat-char3-clip">
      <rect x="0" y="0" width="66" height="66" rx="12"/>
    </clipPath>
    <clipPath id="nature-video-clip">
      <rect x="0" y="0" width="760" height="255" rx="14"/>
    </clipPath>
    <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
    <filter id="text-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#000000" flood-opacity="0.9"/>
    </filter>
    <!-- Plain Frosted Diffusion Blur for Big Cards -->
    <filter id="card-blur-glow" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
  </defs>

  <g clip-path="url(#outer-clip)">
    <!-- ============== BASE BACKGROUND (PURE SOLID JET BLACK) ============== -->
    <rect width="880" height="2350" fill="#000000"/>

    <!-- Mountain Landscape Background (Top Half Only) -->
    <image href="data:image/jpeg;base64,${mountainBase64}" xlink:href="data:image/jpeg;base64,${mountainBase64}" x="0" y="0" width="880" height="520" preserveAspectRatio="xMidYMin slice" opacity="0.95"/>

    <!-- Smooth Seamless Fade Over Mountain into Solid Black -->
    <rect x="0" y="0" width="880" height="520" fill="url(#bg-fade)"/>

    <!-- ============================================ -->
    <!-- NAVBAR (CENTERED)                            -->
    <!-- ============================================ -->
    <g id="navbar" transform="translate(275, 40)">
      <!-- About pill -->
      <rect x="0" y="0" width="70" height="30" rx="15" fill="url(#nav-pill-bg)" stroke="rgba(255,255,255,0.12)" stroke-width="0.8"/>
      <text x="35" y="19" class="font-sans" font-size="11" font-weight="500" fill="rgba(255,255,255,0.9)" text-anchor="middle">About</text>

      <!-- Skills pill -->
      <rect x="80" y="0" width="70" height="30" rx="15" fill="url(#nav-pill-bg)" stroke="rgba(255,255,255,0.12)" stroke-width="0.8"/>
      <text x="115" y="19" class="font-sans" font-size="11" font-weight="500" fill="rgba(255,255,255,0.9)" text-anchor="middle">Skills</text>

      <!-- Analytics pill -->
      <rect x="160" y="0" width="85" height="30" rx="15" fill="url(#nav-pill-bg)" stroke="rgba(255,255,255,0.12)" stroke-width="0.8"/>
      <text x="202.5" y="19" class="font-sans" font-size="11" font-weight="500" fill="rgba(255,255,255,0.9)" text-anchor="middle">Analytics</text>

      <!-- Theme pill -->
      <rect x="255" y="0" width="75" height="30" rx="15" fill="url(#nav-pill-bg)" stroke="rgba(255,255,255,0.12)" stroke-width="0.8"/>
      <text x="292.5" y="19" class="font-sans" font-size="11" font-weight="500" fill="rgba(255,255,255,0.9)" text-anchor="middle">Theme</text>
    </g>

    <!-- ============================================ -->
    <!-- HERO SECTION (CENTERED)                      -->
    <!-- ============================================ -->
    <g id="hero" transform="translate(440, 135)" filter="url(#text-glow)">
      <!-- Main Title -->
      <text x="0" y="46" class="font-display" font-size="52" font-weight="500" fill="#ffffff" letter-spacing="-0.5px" text-anchor="middle">
        Building Scalable Digital
      </text>
      <text x="0" y="104" class="font-display" font-size="52" font-weight="500" fill="#ffffff" letter-spacing="-0.5px" text-anchor="middle">
        Dreams <tspan font-weight="400" font-style="italic" fill="rgba(255,255,255,0.9)" font-size="46">with code.</tspan>
      </text>

      <!-- Subtitle -->
      <text x="0" y="142" class="font-sans" font-size="14" fill="rgba(255,255,255,0.85)" letter-spacing="0.2px" text-anchor="middle">
        Full-stack developer crafting scalable web applications,
      </text>
      <text x="0" y="164" class="font-sans" font-size="14" fill="rgba(255,255,255,0.85)" letter-spacing="0.2px" text-anchor="middle">
        responsive interfaces, and reliable backend services.
      </text>
    </g>

    <!-- ============================================ -->
    <!-- ABOUT ME CARD (Clear / Bening)               -->
    <!-- ============================================ -->
    <g id="about" transform="translate(44, 335)">
      <!-- Card Background (Clear / Bening) -->
      <rect width="792" height="255" rx="28" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#soft-shadow)"/>

      <!-- Left Side: About Info -->
      <g transform="translate(38, 30)">
        <!-- Name -->
        <text x="0" y="25" class="font-display" font-size="30" font-weight="600" fill="#ffffff" letter-spacing="0.2px">Gaori Ichita</text>

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
          <rect width="155" height="36" rx="18" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
          <text x="77.5" y="23" class="font-sans" font-size="11.5" font-weight="600" fill="rgba(255,255,255,0.85)" text-anchor="middle">Full-stack Dev</text>
        </g>
      </g>

      <!-- Right Side: Cat Photo (Static, no MEOW label) -->
      <g>
        <!-- Photo Frame Glass Border -->
        <rect x="560" y="20" width="200" height="215" rx="22" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>

        <!-- Cat Image -->
        <g clip-path="url(#cat-clip)">
          <image href="data:image/gif;base64,${catChar2Base64}" xlink:href="data:image/gif;base64,${catChar2Base64}" x="565" y="25" width="190" height="205" preserveAspectRatio="xMidYMid slice"/>
        </g>
      </g>
    </g>

    <!-- ============================================ -->
    <!-- SKILLS SECTION (Premium Glass Chip Cards)    -->
    <!-- ============================================ -->
    <g id="skills" transform="translate(44, 655)">
      <!-- Section Header -->
      <text x="0" y="0" class="font-display" font-size="24" font-weight="600" fill="#ffffff" letter-spacing="0.3px">Technical Skills</text>

      <!-- Skills Grid (Sleek Cards with Individual Tag Pills) -->
      <g transform="translate(0, 22)">
        <!-- ===== Card 1: Frontend ===== -->
        <g transform="translate(0, 0)">
          <!-- Card Background (Clear / Bening) -->
          <rect width="252" height="216" rx="20" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#soft-shadow)"/>

          <!-- Header: Icon Badge + Titles -->
          <rect x="18" y="16" width="36" height="36" rx="10" fill="rgba(103,255,77,0.12)" stroke="rgba(103,255,77,0.35)" stroke-width="0.8"/>
          <!-- Monitor Vector Icon (Centered) -->
          <g transform="translate(0, 1.5)">
            <rect x="25" y="23" width="22" height="15" rx="2" fill="none" stroke="#67FF4D" stroke-width="1.5"/>
            <line x1="31" y1="38" x2="41" y2="38" stroke="#67FF4D" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="36" y1="38" x2="36" y2="42" stroke="#67FF4D" stroke-width="1.5"/>
            <line x1="30" y1="42" x2="42" y2="42" stroke="#67FF4D" stroke-width="1.5" stroke-linecap="round"/>
          </g>

          <text x="64" y="32" class="font-display" font-size="18" font-weight="600" fill="#ffffff" letter-spacing="0.3px">Front-end</text>
          <text x="64" y="47" class="font-sans" font-size="9.5" font-weight="600" fill="#67FF4D" letter-spacing="0.8px">MODERN UI / UX</text>

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
          <!-- Card Background (Clear / Bening) -->
          <rect width="252" height="216" rx="20" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#soft-shadow)"/>

          <!-- Header: Icon Badge + Titles -->
          <rect x="18" y="16" width="36" height="36" rx="10" fill="rgba(77,255,139,0.12)" stroke="rgba(77,255,139,0.35)" stroke-width="0.8"/>
          <!-- Server Vector Icon (Centered) -->
          <g transform="translate(0, 2.5)">
            <ellipse cx="36" cy="24" rx="9" ry="3" fill="none" stroke="#4DFF8B" stroke-width="1.5"/>
            <path d="M27 24 v5 c0 1.6 4 3 9 3 s9 -1.4 9 -3 v-5" fill="none" stroke="#4DFF8B" stroke-width="1.5"/>
            <path d="M27 29 v5 c0 1.6 4 3 9 3 s9 -1.4 9 -3 v-5" fill="none" stroke="#4DFF8B" stroke-width="1.5"/>
            <path d="M27 34 v5 c0 1.6 4 3 9 3 s9 -1.4 9 -3 v-5" fill="none" stroke="#4DFF8B" stroke-width="1.5"/>
          </g>

          <text x="64" y="32" class="font-display" font-size="18" font-weight="600" fill="#ffffff" letter-spacing="0.3px">Back-end</text>
          <text x="64" y="47" class="font-sans" font-size="9.5" font-weight="600" fill="#4DFF8B" letter-spacing="0.8px">API &amp; ARCHITECTURE</text>

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
          <!-- Card Background (Clear / Bening) -->
          <rect width="252" height="216" rx="20" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#soft-shadow)"/>

          <!-- Header: Icon Badge + Titles -->
          <rect x="18" y="16" width="36" height="36" rx="10" fill="rgba(193,255,77,0.12)" stroke="rgba(193,255,77,0.35)" stroke-width="0.8"/>
          <!-- Cloud Vector Icon (Centered with straight, balanced checkmark) -->
          <g transform="translate(3, 0.5)">
            <path d="M29 38 c-2.5 0 -4 -1.6 -4 -3.8 c0 -1.8 1.2 -3.2 2.8 -3.6 c0.3 -2.8 2.6 -4.8 5.6 -4.8 c2.8 0 5 1.8 5.5 4.5 c1.8 0.3 3.1 1.8 3.1 3.7 c0 2.2 -1.8 4 -4 4 Z" fill="none" stroke="#C1FF4D" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M30.5 32.5 L33 35 L37 31" fill="none" stroke="#C1FF4D" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </g>

          <text x="64" y="32" class="font-display" font-size="18" font-weight="600" fill="#ffffff" letter-spacing="0.3px">DevOps</text>
          <text x="64" y="47" class="font-sans" font-size="9.5" font-weight="600" fill="#C1FF4D" letter-spacing="0.8px">DEPLOY &amp; CLOUD</text>

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
    <!-- SKILL ANALYTICS & BREAKDOWN                 -->
    <!-- ============================================ -->
    <g id="analytics" transform="translate(44, 993)">
      <!-- Section Header -->
      <text x="0" y="0" class="font-display" font-size="24" font-weight="600" fill="#ffffff" letter-spacing="0.3px">Skill Analytics &amp; Breakdown</text>

      <!-- Card 1: Stack Distribution (Donut Pie Chart) -->
      <g transform="translate(0, 22)">
        <!-- Card Frame -->
        <rect width="792" height="160" rx="20" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#soft-shadow)"/>

        <!-- Sub-header -->
        <text x="24" y="32" class="font-display" font-size="16" font-weight="600" fill="#ffffff">Stack Distribution</text>

        <!-- Donut Pie Chart Group -->
        <g transform="translate(100, 98)">
          <!-- Base Track -->
          <circle cx="0" cy="0" r="46" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="14"/>

          <!-- Segments (Circumference: 2 * PI * 46 = 289.02) -->
          <!-- 1. Backend: 45% (130px) -->
          <circle cx="0" cy="0" r="46" fill="none" stroke="#4D5FFF" stroke-width="14"
                  stroke-dasharray="126 163.02" stroke-dashoffset="0"
                  transform="rotate(-90)" stroke-linecap="round"/>

          <!-- 2. Frontend: 35% (101.1px) -->
          <circle cx="0" cy="0" r="46" fill="none" stroke="#944DFF" stroke-width="14"
                  stroke-dasharray="97 192.02" stroke-dashoffset="-130"
                  transform="rotate(-90)" stroke-linecap="round"/>

          <!-- 3. DevOps: 20% (57.8px) -->
          <circle cx="0" cy="0" r="46" fill="none" stroke="#ED4DFF" stroke-width="14"
                  stroke-dasharray="54 235.02" stroke-dashoffset="-231.1"
                  transform="rotate(-90)" stroke-linecap="round"/>

          <!-- Center Text -->
          <circle cx="0" cy="0" r="34" fill="rgba(255,255,255,0.02)"/>
          <text x="0" y="-3" class="font-display" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">Full-Stack</text>
          <text x="0" y="10" class="font-mono" font-size="7.5" font-weight="600" fill="#944DFF" text-anchor="middle" letter-spacing="0.8px">FOCUS</text>
        </g>

        <!-- Donut Breakdown Details (Right of chart) -->
        <g transform="translate(210, 0)">
          <!-- Item 1: Backend -->
          <g transform="translate(0, 56)">
            <circle cx="6" cy="6" r="4.5" fill="#4D5FFF"/>
            <text x="20" y="9.5" class="font-sans" font-size="12" font-weight="600" fill="#ffffff">Back-end Engineering</text>
            <text x="20" y="23" class="font-sans" font-size="9" fill="rgba(255,255,255,0.45)">Go, PostgreSQL, Distributed APIs &amp; Kafka</text>
            <rect x="490" y="-2" width="66" height="20" rx="6" fill="rgba(77,95,255,0.15)" stroke="rgba(77,95,255,0.35)" stroke-width="0.8"/>
            <text x="523" y="8" class="font-mono" font-size="9.5" font-weight="700" fill="#4D5FFF" text-anchor="middle" dominant-baseline="central">45%</text>
          </g>

          <!-- Item 2: Frontend -->
          <g transform="translate(0, 90)">
            <circle cx="6" cy="6" r="4.5" fill="#944DFF"/>
            <text x="20" y="9.5" class="font-sans" font-size="12" font-weight="600" fill="#ffffff">Front-end &amp; UI/UX</text>
            <text x="20" y="23" class="font-sans" font-size="9" fill="rgba(255,255,255,0.45)">Next.js, TypeScript, React &amp; Design Systems</text>
            <rect x="490" y="-2" width="66" height="20" rx="6" fill="rgba(148,77,255,0.15)" stroke="rgba(148,77,255,0.35)" stroke-width="0.8"/>
            <text x="523" y="8" class="font-mono" font-size="9.5" font-weight="700" fill="#944DFF" text-anchor="middle" dominant-baseline="central">35%</text>
          </g>

          <!-- Item 3: DevOps -->
          <g transform="translate(0, 124)">
            <circle cx="6" cy="6" r="4.5" fill="#ED4DFF"/>
            <text x="20" y="9.5" class="font-sans" font-size="12" font-weight="600" fill="#ffffff">DevOps &amp; Cloud Infrastructure</text>
            <text x="20" y="23" class="font-sans" font-size="9" fill="rgba(255,255,255,0.45)">Docker, Kubernetes, Linux &amp; CI/CD Pipelines</text>
            <rect x="490" y="-2" width="66" height="20" rx="6" fill="rgba(237,77,255,0.15)" stroke="rgba(237,77,255,0.35)" stroke-width="0.8"/>
            <text x="523" y="8" class="font-mono" font-size="9.5" font-weight="700" fill="#ED4DFF" text-anchor="middle" dominant-baseline="central">20%</text>
          </g>
        </g>
      </g>

      <!-- Card 2: Proficiency Matrix (Diagram Batangan) -->
      <g transform="translate(0, 198)">
        <!-- Card Frame -->
        <rect width="792" height="220" rx="20" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#soft-shadow)"/>

        <!-- Sub-header -->
        <text x="24" y="32" class="font-display" font-size="16" font-weight="600" fill="#ffffff">Proficiency Matrix</text>

        <!-- Bar 1: Backend Architecture -->
        <g transform="translate(24, 62)">
          <text x="0" y="0" class="font-sans" font-size="11.5" font-weight="600" fill="rgba(255,255,255,0.9)">Back-end Architecture &amp; Distributed APIs</text>
          <!-- Track -->
          <rect x="0" y="8" width="675" height="8" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" stroke-width="0.6"/>
          <!-- Fill: 92% of 675 = 621 -->
          <rect x="0" y="8" width="621" height="8" rx="4" fill="url(#bar-grad-backend)"/>
          <!-- Badge -->
          <rect x="690" y="3" width="50" height="18" rx="6" fill="rgba(77,95,255,0.15)" stroke="rgba(77,95,255,0.35)" stroke-width="0.8"/>
          <text x="715" y="12" class="font-mono" font-size="9.5" font-weight="700" fill="#4D5FFF" text-anchor="middle" dominant-baseline="central">92%</text>
        </g>

        <!-- Bar 2: Frontend UI/UX -->
        <g transform="translate(24, 102)">
          <text x="0" y="0" class="font-sans" font-size="11.5" font-weight="600" fill="rgba(255,255,255,0.9)">Front-end Engineering &amp; Modern UI/UX</text>
          <!-- Track -->
          <rect x="0" y="8" width="675" height="8" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" stroke-width="0.6"/>
          <!-- Fill: 88% of 675 = 594 -->
          <rect x="0" y="8" width="594" height="8" rx="4" fill="url(#bar-grad-frontend)"/>
          <!-- Badge -->
          <rect x="690" y="3" width="50" height="18" rx="6" fill="rgba(148,77,255,0.15)" stroke="rgba(148,77,255,0.35)" stroke-width="0.8"/>
          <text x="715" y="12" class="font-mono" font-size="9.5" font-weight="700" fill="#944DFF" text-anchor="middle" dominant-baseline="central">88%</text>
        </g>

        <!-- Bar 3: Database & Caching -->
        <g transform="translate(24, 142)">
          <text x="0" y="0" class="font-sans" font-size="11.5" font-weight="600" fill="rgba(255,255,255,0.9)">Database Systems &amp; Distributed Caching</text>
          <!-- Track -->
          <rect x="0" y="8" width="675" height="8" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" stroke-width="0.6"/>
          <!-- Fill: 85% of 675 = 574 -->
          <rect x="0" y="8" width="574" height="8" rx="4" fill="url(#bar-grad-db)"/>
          <!-- Badge -->
          <rect x="690" y="3" width="50" height="18" rx="6" fill="rgba(77,95,255,0.15)" stroke="rgba(77,95,255,0.35)" stroke-width="0.8"/>
          <text x="715" y="12" class="font-mono" font-size="9.5" font-weight="700" fill="#4D5FFF" text-anchor="middle" dominant-baseline="central">85%</text>
        </g>

        <!-- Bar 4: Cloud DevOps & CI/CD -->
        <g transform="translate(24, 182)">
          <text x="0" y="0" class="font-sans" font-size="11.5" font-weight="600" fill="rgba(255,255,255,0.9)">Cloud Infrastructure, Docker &amp; CI/CD</text>
          <!-- Track -->
          <rect x="0" y="8" width="675" height="8" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" stroke-width="0.6"/>
          <!-- Fill: 80% of 675 = 540 -->
          <rect x="0" y="8" width="540" height="8" rx="4" fill="url(#bar-grad-devops)"/>
          <!-- Badge -->
          <rect x="690" y="3" width="50" height="18" rx="6" fill="rgba(237,77,255,0.15)" stroke="rgba(237,77,255,0.35)" stroke-width="0.8"/>
          <text x="715" y="12" class="font-mono" font-size="9.5" font-weight="700" fill="#ED4DFF" text-anchor="middle" dominant-baseline="central">80%</text>
        </g>
      </g>
    </g>

    <!-- ============================================ -->
    <!-- SELECT YOUR CHARACTER (CAT MEME EDITION)   -->
    <!-- ============================================ -->
    <g id="character-select" transform="translate(44, 1478)">
      <!-- Section Header -->
      <text x="0" y="0" class="font-display" font-size="24" font-weight="600" fill="#ffffff" letter-spacing="0.3px">Select Your Character</text>

      <!-- Main Box Container -->
      <g transform="translate(0, 22)">
        <!-- Outer Card Frame -->
        <rect width="792" height="268" rx="20" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#soft-shadow)"/>

        <!-- ===== CHARACTER CARD 1: KEVIN ===== -->
        <g transform="translate(16, 16)">
          <rect width="244" height="236" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.09)" stroke-width="1"/>
          
          <!-- Avatar Photo -->
          <g transform="translate(15, 15)">
            <g clip-path="url(#cat-char1-clip)">
              <image href="data:image/gif;base64,${catChar1Base64}" xlink:href="data:image/gif;base64,${catChar1Base64}" x="0" y="0" width="66" height="66" preserveAspectRatio="xMidYMid slice"/>
            </g>
            <rect x="0" y="0" width="66" height="66" rx="12" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
          </g>

          <!-- Character Name -->
          <text x="95" y="54" class="font-display" font-size="20" font-weight="700" fill="#ffffff">Kevin</text>

          <!-- Divider -->
          <line x1="15" y1="96" x2="229" y2="96" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>

          <!-- Stats (Diagram Batangan) -->
          <g transform="translate(15, 110)">
            <!-- Stat 1: Durability -->
            <text x="0" y="9" class="font-sans" font-size="11.5" font-weight="500" fill="rgba(255,255,255,0.9)">Durability</text>
            <text x="214" y="9" class="font-mono" font-size="11.5" font-weight="700" fill="#4D5FFF" text-anchor="end">12%</text>
            <rect x="0" y="15" width="214" height="7" rx="3.5" fill="rgba(255,255,255,0.06)"/>
            <rect x="0" y="15" width="26" height="7" rx="3.5" fill="#4D5FFF"/>

            <!-- Stat 2: Sleepiness -->
            <text x="0" y="37" class="font-sans" font-size="11.5" font-weight="500" fill="rgba(255,255,255,0.9)">Sleepiness</text>
            <text x="214" y="37" class="font-mono" font-size="11.5" font-weight="700" fill="#944DFF" text-anchor="end">99%</text>
            <rect x="0" y="43" width="214" height="7" rx="3.5" fill="rgba(255,255,255,0.06)"/>
            <rect x="0" y="43" width="212" height="7" rx="3.5" fill="#944DFF"/>

            <!-- Stat 3: Cuteness -->
            <text x="0" y="65" class="font-sans" font-size="11.5" font-weight="500" fill="rgba(255,255,255,0.9)">Cuteness</text>
            <text x="214" y="65" class="font-mono" font-size="11.5" font-weight="700" fill="#ED4DFF" text-anchor="end">100%</text>
            <rect x="0" y="71" width="214" height="7" rx="3.5" fill="rgba(255,255,255,0.06)"/>
            <rect x="0" y="71" width="214" height="7" rx="3.5" fill="#ED4DFF"/>

            <!-- Stat 4: Fighting Spirit -->
            <text x="0" y="93" class="font-sans" font-size="11.5" font-weight="500" fill="rgba(255,255,255,0.9)">Fighting Spirit</text>
            <text x="214" y="93" class="font-mono" font-size="11.5" font-weight="700" fill="rgba(255,255,255,0.4)" text-anchor="end">0%</text>
            <rect x="0" y="99" width="214" height="7" rx="3.5" fill="rgba(255,255,255,0.06)"/>
            <rect x="0" y="99" width="3" height="7" rx="3.5" fill="#64748b"/>
          </g>
        </g>

        <!-- ===== CHARACTER CARD 2: GAORI ===== -->
        <g transform="translate(274, 16)">
          <rect width="244" height="236" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.09)" stroke-width="1"/>
          
          <!-- Avatar Photo -->
          <g transform="translate(15, 15)">
            <g clip-path="url(#cat-char2-clip)">
              <image href="data:image/gif;base64,${catChar2Base64}" xlink:href="data:image/gif;base64,${catChar2Base64}" x="0" y="0" width="66" height="66" preserveAspectRatio="xMidYMid slice"/>
            </g>
            <rect x="0" y="0" width="66" height="66" rx="12" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
          </g>

          <!-- Character Name -->
          <text x="95" y="54" class="font-display" font-size="20" font-weight="700" fill="#ffffff">Gaori</text>

          <!-- Divider -->
          <line x1="15" y1="96" x2="229" y2="96" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>

          <!-- Stats (Diagram Batangan) -->
          <g transform="translate(15, 110)">
            <!-- Stat 1: Durability -->
            <text x="0" y="9" class="font-sans" font-size="11.5" font-weight="500" fill="rgba(255,255,255,0.95)">Durability</text>
            <text x="214" y="9" class="font-mono" font-size="11.5" font-weight="700" fill="#4D5FFF" text-anchor="end">88%</text>
            <rect x="0" y="15" width="214" height="7" rx="3.5" fill="rgba(255,255,255,0.06)"/>
            <rect x="0" y="15" width="188" height="7" rx="3.5" fill="#4D5FFF"/>

            <!-- Stat 2: Emotional Damage -->
            <text x="0" y="37" class="font-sans" font-size="11.5" font-weight="500" fill="rgba(255,255,255,0.95)">Emotional DMG</text>
            <text x="214" y="37" class="font-mono" font-size="11.5" font-weight="700" fill="#ED4DFF" text-anchor="end">100%</text>
            <rect x="0" y="43" width="214" height="7" rx="3.5" fill="rgba(255,255,255,0.06)"/>
            <rect x="0" y="43" width="214" height="7" rx="3.5" fill="#ED4DFF"/>

            <!-- Stat 3: Screaming Decibels -->
            <text x="0" y="65" class="font-sans" font-size="11.5" font-weight="500" fill="rgba(255,255,255,0.95)">Screaming Decibels</text>
            <text x="214" y="65" class="font-mono" font-size="11.5" font-weight="700" fill="#944DFF" text-anchor="end">96%</text>
            <rect x="0" y="71" width="214" height="7" rx="3.5" fill="rgba(255,255,255,0.06)"/>
            <rect x="0" y="71" width="205" height="7" rx="3.5" fill="#944DFF"/>

            <!-- Stat 4: Sanity Level -->
            <text x="0" y="93" class="font-sans" font-size="11.5" font-weight="500" fill="rgba(255,255,255,0.95)">Sanity Level</text>
            <text x="214" y="93" class="font-mono" font-size="11.5" font-weight="700" fill="rgba(255,255,255,0.4)" text-anchor="end">2%</text>
            <rect x="0" y="99" width="214" height="7" rx="3.5" fill="rgba(255,255,255,0.06)"/>
            <rect x="0" y="99" width="5" height="7" rx="3.5" fill="#4D5FFF"/>
          </g>
        </g>

        <!-- ===== CHARACTER CARD 3: MATTHEW ===== -->
        <g transform="translate(532, 16)">
          <rect width="244" height="236" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.09)" stroke-width="1"/>
          
          <!-- Avatar Photo -->
          <g transform="translate(15, 15)">
            <g clip-path="url(#cat-char3-clip)">
              <image href="data:image/gif;base64,${catChar3Base64}" xlink:href="data:image/gif;base64,${catChar3Base64}" x="0" y="0" width="66" height="66" preserveAspectRatio="xMidYMid slice"/>
            </g>
            <rect x="0" y="0" width="66" height="66" rx="12" fill="none" stroke="rgba(148,77,255,0.3)" stroke-width="1"/>
          </g>

          <!-- Character Name -->
          <text x="95" y="54" class="font-display" font-size="20" font-weight="700" fill="#ffffff">Matthew</text>

          <!-- Divider -->
          <line x1="15" y1="96" x2="229" y2="96" stroke="rgba(255,255,255,0.07)" stroke-width="0.8"/>

          <!-- Stats (Diagram Batangan) -->
          <g transform="translate(15, 110)">
            <!-- Stat 1: Durability -->
            <text x="0" y="9" class="font-sans" font-size="11.5" font-weight="500" fill="rgba(255,255,255,0.9)">Durability</text>
            <text x="214" y="9" class="font-mono" font-size="11.5" font-weight="700" fill="#4D5FFF" text-anchor="end">40%</text>
            <rect x="0" y="15" width="214" height="7" rx="3.5" fill="rgba(255,255,255,0.06)"/>
            <rect x="0" y="15" width="86" height="7" rx="3.5" fill="#4D5FFF"/>

            <!-- Stat 2: Body Weight -->
            <text x="0" y="37" class="font-sans" font-size="11.5" font-weight="500" fill="rgba(255,255,255,0.9)">Body Weight</text>
            <text x="214" y="37" class="font-mono" font-size="11.5" font-weight="700" fill="#944DFF" text-anchor="end">0g</text>
            <rect x="0" y="43" width="214" height="7" rx="3.5" fill="rgba(255,255,255,0.06)"/>
            <rect x="0" y="43" width="3" height="7" rx="3.5" fill="#944DFF"/>

            <!-- Stat 3: Orange Braincells -->
            <text x="0" y="65" class="font-sans" font-size="11.5" font-weight="500" fill="rgba(255,255,255,0.9)">Orange Braincells</text>
            <text x="214" y="65" class="font-mono" font-size="11.5" font-weight="700" fill="#ED4DFF" text-anchor="end">1%</text>
            <rect x="0" y="71" width="214" height="7" rx="3.5" fill="rgba(255,255,255,0.06)"/>
            <rect x="0" y="71" width="3" height="7" rx="3.5" fill="#ED4DFF"/>

            <!-- Stat 4: Levitation -->
            <text x="0" y="93" class="font-sans" font-size="11.5" font-weight="500" fill="rgba(255,255,255,0.9)">Levitation</text>
            <text x="214" y="93" class="font-mono" font-size="11.5" font-weight="700" fill="#944DFF" text-anchor="end">99%</text>
            <rect x="0" y="99" width="214" height="7" rx="3.5" fill="rgba(255,255,255,0.06)"/>
            <rect x="0" y="99" width="212" height="7" rx="3.5" fill="#944DFF"/>
          </g>
        </g>
      </g>
    </g>

    <!-- ============================================ -->
    <!-- THEME SECTION                                -->
    <!-- ============================================ -->
    <g id="character-theme" transform="translate(44, 1824)">
      <!-- Section Header with generous spacing -->
      <text x="0" y="0" class="font-display" font-size="24" font-weight="600" fill="#ffffff" letter-spacing="0.3px">Theme</text>

      <!-- Main Box Container -->
      <g transform="translate(0, 32)">
        <!-- Outer Card Frame -->
        <rect width="792" height="384" rx="20" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" filter="url(#soft-shadow)"/>

        <!-- Video Nature Display -->
        <g transform="translate(16, 16)">
          <g clip-path="url(#nature-video-clip)">
            <image href="data:image/gif;base64,${natureBase64}" xlink:href="data:image/gif;base64,${natureBase64}" x="0" y="0" width="760" height="255" preserveAspectRatio="xMidYMid slice"/>
          </g>
          <!-- Video Frame Overlay -->
          <rect x="0" y="0" width="760" height="255" rx="14" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
        </g>

        <!-- Divider -->
        <line x1="16" y1="288" x2="776" y2="288" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>

        <!-- Nature Description -->
        <g transform="translate(16, 304)">
          <text x="0" y="16" class="font-display" font-size="16" font-weight="600" fill="#ffffff" letter-spacing="0.2px">Serenity in Motion</text>
          <text x="0" y="40" class="font-sans" font-size="11.5" fill="rgba(255,255,255,0.85)">Golden fields swaying gently under the open sky and forest horizon.</text>
          <text x="0" y="60" class="font-sans" font-size="11.5" font-weight="500" fill="#67FF4D">A tranquil pause to reset the mind, find balance, and cultivate deep creativity beyond the screen.</text>
        </g>
      </g>
    </g>

    <!-- ============================================ -->
    <!-- FOOTER -->
    <!-- ============================================ -->
    <g transform="translate(440, 2288)">
      <!-- Footer Text -->
      <text x="0" y="24" class="font-sans" font-size="11" fill="rgba(255,255,255,0.3)" text-anchor="middle" letter-spacing="0.5px">
        Designed with Glassmorphism &#8226; Gaori Ichita &#169; 2026
      </text>
    </g>

    <!-- ============================================ -->
    <!-- OUTER FRAME BORDER -->
    <!-- ============================================ -->
    <rect x="0" y="0" width="880" height="2350" rx="32" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" class="border-glow"/>
  </g>
</svg>`;
}

const svg = buildSvg();
fs.writeFileSync(path.join(__dirname, 'github-profile.svg'), svg);
console.log('✅ Premium glassmorphism SVG with neat tech pills generated!');
console.log('   Size:', (svg.length / 1024).toFixed(2), 'KB');
