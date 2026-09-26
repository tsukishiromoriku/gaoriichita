const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Read compressed base64 images
const profileBase64 = fs.readFileSync(path.join(assetsDir, 'profile_thumb.jpg')).toString('base64');
const sphereBase64 = fs.readFileSync(path.join(assetsDir, 'sphere_thumb.jpg')).toString('base64');

let config = {};
try {
  config = JSON.parse(fs.readFileSync(path.join(__dirname, 'profile-config.json'), 'utf8'));
} catch (e) {
  console.log('Using default config');
}

function escapeXml(unsafe) {
  if (!unsafe || typeof unsafe !== 'string') return unsafe || '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const sharedStyles = `
  * { box-sizing: border-box; }

  @keyframes floatAnim {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  @keyframes pulseGlow {
    0%, 100% { stroke-opacity: 0.35; }
    50% { stroke-opacity: 0.85; stroke: #4f526b; }
  }

  @keyframes cursorAnim {
    0%, 100% { transform: translate(380px, 24px); }
    50% { transform: translate(384px, 28px); }
  }

  @keyframes ringPulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.7; }
  }

  .font-title {
    font-family: 'Space Mono', 'Courier Prime', 'Courier New', monospace;
    font-weight: 700;
  }
  .font-mono {
    font-family: 'Space Mono', 'Courier Prime', 'Courier New', monospace;
  }
  .font-sans {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }

  .floating-sphere {
    animation: floatAnim 4.5s ease-in-out infinite;
    transform-origin: center;
  }

  .pulse-card {
    animation: pulseGlow 3s ease-in-out infinite;
  }

  .animated-cursor {
    animation: cursorAnim 1.6s ease-in-out infinite;
  }

  .pulse-ring {
    animation: ringPulse 5s ease-in-out infinite;
  }

  .nav-item {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 13px;
    fill: #858590;
  }

  .btn-hover {
    cursor: pointer;
  }

  .social-pill {
    cursor: pointer;
  }
`;

function buildFullSvg(data) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 840 1780" width="840" height="1780" fill="none">
  <defs>
    <style>
      ${sharedStyles}
    </style>

    <linearGradient id="card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#212128" />
      <stop offset="100%" stop-color="#16161c" />
    </linearGradient>

    <clipPath id="profile-clip">
      <rect x="520" y="770" width="260" height="360" rx="28" ry="28" />
    </clipPath>

    <clipPath id="sphere-clip">
      <rect x="290" y="445" width="125" height="150" rx="18" ry="18" />
    </clipPath>

    <clipPath id="frame-clip">
      <rect x="10" y="10" width="820" height="1760" rx="36" />
    </clipPath>
  </defs>

  <rect width="840" height="1780" fill="#09090b" />

  <g clip-path="url(#frame-clip)">
    <rect x="10" y="10" width="820" height="1760" rx="36" fill="#0e0e11" stroke="#22222a" stroke-width="1.5" />

    <!-- Ambient Geometric Circles with gentle pulse -->
    <circle cx="730" cy="180" r="130" class="pulse-ring" fill="none" stroke="#22222c" stroke-width="1" />
    <circle cx="730" cy="180" r="210" fill="none" stroke="#1a1a22" stroke-width="1" opacity="0.4" />
    <circle cx="700" cy="940" r="280" class="pulse-ring" fill="none" stroke="#22222c" stroke-width="1" />
    <circle cx="700" cy="940" r="420" fill="none" stroke="#1a1a22" stroke-width="1" opacity="0.35" />

    <!-- NAVBAR -->
    <g id="navbar">
      <text x="60" y="68" class="font-sans" font-size="14.5" font-weight="700" fill="#ffffff" letter-spacing="-0.2px">${escapeXml(data.nameLine1)}</text>
      <text x="60" y="85" class="font-sans" font-size="14.5" font-weight="700" fill="#ffffff" letter-spacing="-0.2px">${escapeXml(data.nameLine2)}</text>

      <text x="350" y="78" class="nav-item">About</text>
      <text x="410" y="78" class="nav-item">Projects</text>
      <text x="480" y="78" class="nav-item">Articles</text>
      <text x="545" y="78" class="nav-item">Contacts</text>

      <g transform="translate(730, 58)">
        <circle cx="20" cy="20" r="20" fill="#15151a" stroke="#282832" stroke-width="1" />
        <text x="20" y="18" class="font-sans" font-size="10.5" font-weight="700" fill="#ffffff" text-anchor="middle">En</text>
        <text x="20" y="29" class="font-sans" font-size="9" font-weight="400" fill="#666672" text-anchor="middle">Ge</text>
      </g>
    </g>

    <!-- HERO -->
    <g id="hero">
      <text x="60" y="210" class="font-title" font-size="56" fill="#ffffff" letter-spacing="-0.5px">${escapeXml(data.heroRole1)}</text>

      <g class="btn-hover" transform="translate(530, 172)">
        <rect width="148" height="42" rx="21" fill="#ffffff" />
        <text x="56" y="26" class="font-sans" font-size="13" font-weight="600" fill="#0f0f12" text-anchor="middle">Projects</text>
        <circle cx="125" cy="21" r="13" fill="#0f0f12" />
        <path d="M122 16 L127 21 L122 26 M126 21 L119 21" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      </g>

      <text x="430" y="285" class="font-title" font-size="56" fill="#ffffff" letter-spacing="-0.5px">${escapeXml(data.heroRole2)}</text>

      <g transform="translate(60, 255)">
        <text x="0" y="0" class="font-sans" font-size="12" fill="#888892">
          My goal is to <tspan font-weight="700" font-style="italic" fill="#e0e0e6">${escapeXml(data.statementLine1)}</tspan>
        </text>
        <text x="0" y="18" class="font-sans" font-size="12" fill="#888892">
          <tspan font-weight="700" font-style="italic" fill="#e0e0e6">${escapeXml(data.statementLine2)}</tspan> to process
        </text>
        <text x="0" y="36" class="font-sans" font-size="12" fill="#888892">
          ${escapeXml(data.statementLine3)}
        </text>
      </g>

      <!-- Socials -->
      <g id="socials" transform="translate(60, 345)">
        <g class="social-pill" transform="translate(0, 0)">
          <rect width="105" height="34" rx="17" fill="#15151a" stroke="#262630" stroke-width="1" />
          <path d="M22 17 C22 13.13 18.87 10 15 10 C11.13 10 8 13.13 8 17 C8 20.09 10.01 22.72 12.8 23.65 C13.15 23.71 13.28 23.5 13.28 23.31 C13.28 23.15 13.27 22.56 13.27 21.89 C11.32 22.31 10.91 21.03 10.91 21.03 C10.59 20.22 10.13 20 10.13 20 C9.5 19.56 10.18 19.57 10.18 19.57 C10.88 19.62 11.25 20.29 11.25 20.29 C11.87 21.36 12.88 21.05 13.28 20.87 C13.34 20.42 13.52 20.11 13.72 19.94 C12.17 19.76 10.53 19.16 10.53 16.48 C10.53 15.72 10.8 15.09 11.25 14.61 C11.18 14.43 10.94 13.73 11.32 12.77 C11.32 12.77 11.91 12.58 13.25 13.49 C13.81 13.33 14.41 13.26 15 13.25 C15.59 13.26 16.19 13.33 16.75 13.49 C18.09 12.58 18.68 12.77 18.68 12.77 C19.06 13.73 18.82 14.43 18.75 14.61 C19.2 15.09 19.47 15.72 19.47 16.48 C19.47 19.17 17.82 19.76 16.27 19.93 C16.53 20.15 16.76 20.6 16.76 21.28 C16.76 22.26 16.75 23.05 16.75 23.31 C16.75 23.51 16.88 23.72 17.24 23.65 C20.03 22.71 22 20.09 22 17 Z" fill="#ffffff" />
          <text x="36" y="21" class="font-sans" font-size="11.5" font-weight="500" fill="#d2d2d8">GitHub</text>
        </g>
        <g class="social-pill" transform="translate(117, 0)">
          <rect width="112" height="34" rx="17" fill="#15151a" stroke="#262630" stroke-width="1" />
          <text x="21" y="22" class="font-sans" font-size="12" font-weight="700" fill="#ffffff">in</text>
          <text x="39" y="21" class="font-sans" font-size="11.5" font-weight="500" fill="#d2d2d8">LinkedIn</text>
        </g>
        <g class="social-pill" transform="translate(241, 0)">
          <rect width="115" height="34" rx="17" fill="#15151a" stroke="#262630" stroke-width="1" />
          <path d="M15 17 L25 12 L19 23 L17 19 L15 17 Z M17 19 L23 14" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          <text x="38" y="21" class="font-sans" font-size="11.5" font-weight="500" fill="#d2d2d8">Telegram</text>
        </g>
        <g class="social-pill" transform="translate(368, 0)">
          <rect width="115" height="34" rx="17" fill="#15151a" stroke="#262630" stroke-width="1" />
          <text x="20" y="22" class="font-sans" font-size="13" font-weight="700" fill="#ffffff">f</text>
          <text x="36" y="21" class="font-sans" font-size="11.5" font-weight="500" fill="#d2d2d8">Facebook</text>
        </g>
        <g class="social-pill" transform="translate(495, 0)">
          <rect width="125" height="34" rx="17" fill="#15151a" stroke="#262630" stroke-width="1" />
          <rect x="14" y="11" width="13" height="13" rx="3.5" stroke="#ffffff" stroke-width="1.5" fill="none" />
          <circle cx="20.5" cy="17.5" r="2.5" stroke="#ffffff" stroke-width="1.2" fill="none" />
          <circle cx="24" cy="14" r="0.8" fill="#ffffff" />
          <text x="38" y="21" class="font-sans" font-size="11.5" font-weight="500" fill="#d2d2d8">Instagram</text>
        </g>
      </g>
    </g>

    <!-- FEATURED CAROUSEL -->
    <g id="featured-carousel" transform="translate(0, 420)">
      <g opacity="0.32" transform="translate(-70, 18)">
        <rect width="320" height="150" rx="22" fill="#15151b" stroke="#262632" stroke-width="1" />
        <text x="35" y="42" class="font-sans" font-size="13" font-weight="600" fill="#ffffff">${escapeXml(data.featuredTitle1)}</text>
        <text x="35" y="60" class="font-sans" font-size="13" font-weight="600" fill="#ffffff">${escapeXml(data.featuredTitle2)}</text>
        <text x="35" y="86" class="font-sans" font-size="9" fill="#888892">${escapeXml(data.featuredDesc1)}</text>
        <text x="35" y="99" class="font-sans" font-size="9" fill="#888892">${escapeXml(data.featuredDesc2)}</text>
        <text x="35" y="112" class="font-sans" font-size="9" fill="#888892">${escapeXml(data.featuredDesc3)}</text>
      </g>
      <g class="btn-hover" transform="translate(110, 83)">
        <circle cx="18" cy="18" r="18" fill="#1b1b22" stroke="#333342" stroke-width="1" />
        <path d="M21 13 L15 18 L21 23" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      </g>

      <!-- Center Active Card with Glowing Pulse & Floating Torus -->
      <g transform="translate(275, 5)">
        <rect class="pulse-card" x="0" y="0" width="375" height="175" rx="26" fill="url(#card-grad)" stroke="#383848" stroke-width="1.5" />
        <g clip-path="url(#sphere-clip)">
          <g class="floating-sphere">
            <image href="data:image/jpeg;base64,${sphereBase64}" xlink:href="data:image/jpeg;base64,${sphereBase64}" x="278" y="435" width="145" height="165" preserveAspectRatio="xMidYMid slice" />
          </g>
        </g>
        <g transform="translate(142, 28)">
          <text x="0" y="0" class="font-sans" font-size="13.5" font-weight="700" fill="#ffffff" letter-spacing="-0.1px">${escapeXml(data.featuredTitle1)}</text>
          <text x="0" y="18" class="font-sans" font-size="13.5" font-weight="700" fill="#ffffff" letter-spacing="-0.1px">${escapeXml(data.featuredTitle2)}</text>
          <text x="0" y="44" class="font-sans" font-size="9.5" fill="#8e8e9a">${escapeXml(data.featuredDesc1)}</text>
          <text x="0" y="58" class="font-sans" font-size="9.5" fill="#8e8e9a">${escapeXml(data.featuredDesc2)}</text>
          <text x="0" y="72" class="font-sans" font-size="9.5" fill="#8e8e9a">${escapeXml(data.featuredDesc3)}</text>

          <g class="btn-hover" transform="translate(0, 94)">
            <rect width="102" height="30" rx="15" fill="#ffffff" />
            <text x="42" y="19" class="font-sans" font-size="11" font-weight="600" fill="#0f0f12" text-anchor="middle">Read more</text>
            <circle cx="85" cy="15" r="9" fill="#0f0f12" />
            <path d="M83 12 L87 15 L83 18 M86 15 L81 15" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        </g>
      </g>

      <g opacity="0.32" transform="translate(680, 18)">
        <rect width="320" height="150" rx="22" fill="#15151b" stroke="#262632" stroke-width="1" />
        <text x="35" y="42" class="font-sans" font-size="13" font-weight="600" fill="#ffffff">${escapeXml(data.featuredTitle1)}</text>
        <text x="35" y="60" class="font-sans" font-size="13" font-weight="600" fill="#ffffff">${escapeXml(data.featuredTitle2)}</text>
        <text x="35" y="86" class="font-sans" font-size="9" fill="#888892">${escapeXml(data.featuredDesc1)}</text>
        <text x="35" y="99" class="font-sans" font-size="9" fill="#888892">${escapeXml(data.featuredDesc2)}</text>
        <text x="35" y="112" class="font-sans" font-size="9" fill="#888892">${escapeXml(data.featuredDesc3)}</text>
      </g>
      <g class="btn-hover" transform="translate(695, 83)">
        <circle cx="18" cy="18" r="18" fill="#1b1b22" stroke="#333342" stroke-width="1" />
        <path d="M15 13 L21 18 L15 23" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      </g>
    </g>

    <!-- ABOUT AND SKILLS -->
    <g id="about-section" transform="translate(60, 680)">
      <text x="0" y="24" class="font-mono" font-size="12" fill="#8c8c96">${escapeXml(data.aboutLabel)}</text>

      <g transform="translate(315, 20)">
        <text x="0" y="0" class="font-sans" font-size="13" fill="#8c8c96">
          Hello! I'm ${escapeXml(data.nameLine1)}, I'm a <tspan font-weight="700" font-style="italic" fill="#ffffff">full-stack developer</tspan>.
        </text>
        <text x="0" y="20" class="font-sans" font-size="13" fill="#8c8c96">
          More than <tspan font-weight="700" fill="#ffffff">5 years</tspan> experience.
        </text>
      </g>

      <!-- Skills Cards -->
      <g id="skills-cards" transform="translate(0, 90)">
        <!-- Front-end -->
        <g transform="translate(0, 0)">
          <rect width="420" height="98" rx="22" fill="#ffffff" />
          <text x="24" y="32" class="font-sans" font-size="13" font-weight="700" fill="#0f0f12">Front-end</text>
          <text x="24" y="58" class="font-sans" font-size="10.5" font-weight="500" fill="#2d2d34">${escapeXml(data.skillsFrontend[0])}</text>
          <text x="24" y="76" class="font-sans" font-size="10.5" font-weight="500" fill="#2d2d34">${escapeXml(data.skillsFrontend[1])}</text>
        </g>

        <!-- Styles -->
        <g transform="translate(0, 116)">
          <rect width="320" height="74" rx="20" fill="#141419" stroke="#252530" stroke-width="1" />
          <text x="22" y="28" class="font-sans" font-size="12.5" font-weight="600" fill="#ffffff">Styles</text>
          <text x="22" y="52" class="font-sans" font-size="10" fill="#8c8c98">${escapeXml(data.skillsStyles)}</text>

          <g transform="translate(345, 14)">
            <circle cx="23" cy="23" r="23" fill="#ffffff" />
            <path d="M16 30 L28 18 M23 15 L25 15 M29 21 L29 23 M30 14 L30 16 M21 21 L23 19" stroke="#0f0f12" stroke-width="2" stroke-linecap="round" />
            <circle cx="16" cy="16" r="1.5" fill="#0f0f12" />
          </g>
        </g>

        <!-- Back-end -->
        <g transform="translate(0, 208)">
          <rect width="420" height="98" rx="20" fill="#141419" stroke="#252530" stroke-width="1" />
          <text x="22" y="28" class="font-sans" font-size="12.5" font-weight="600" fill="#ffffff">Back-end</text>
          <text x="22" y="54" class="font-sans" font-size="10" fill="#8c8c98">${escapeXml(data.skillsBackend[0])}</text>
          <text x="22" y="72" class="font-sans" font-size="10" fill="#8c8c98">${escapeXml(data.skillsBackend[1])}</text>
        </g>

        <!-- DevOps -->
        <g transform="translate(0, 324)">
          <g transform="translate(4, 18)">
            <text x="0" y="0" class="font-sans" font-size="9" fill="#6a6a74">Some of my <tspan font-weight="600" fill="#8c8c96">favorite technologies</tspan>,</text>
            <text x="0" y="14" class="font-sans" font-size="9" fill="#6a6a74"><tspan font-weight="600" fill="#8c8c96">topics, or tools</tspan> that I worked with</text>
          </g>

          <g transform="translate(195, 0)">
            <rect width="225" height="85" rx="18" fill="#141419" stroke="#252530" stroke-width="1" />
            <text x="20" y="26" class="font-sans" font-size="12" font-weight="600" fill="#ffffff">DevOps</text>
            <text x="20" y="48" class="font-sans" font-size="9.5" fill="#8c8c98">${escapeXml(data.skillsDevops[0])}</text>
            <text x="20" y="64" class="font-sans" font-size="9.5" fill="#8c8c98">${escapeXml(data.skillsDevops[1])}</text>
          </g>
        </g>
      </g>

      <!-- Profile Photo -->
      <g transform="translate(460, 90)">
        <rect x="0" y="0" width="260" height="360" rx="28" fill="#181820" stroke="#2d2d38" stroke-width="1.5" />
        <g clip-path="url(#profile-clip)" transform="translate(-520, -770)">
          <image href="data:image/jpeg;base64,${profileBase64}" xlink:href="data:image/jpeg;base64,${profileBase64}" x="520" y="770" width="260" height="360" preserveAspectRatio="xMidYMid slice" />
        </g>
      </g>
    </g>

    <!-- WORK EXPERIENCE -->
    <g id="experience-section" transform="translate(60, 1260)">
      <text x="720" y="40" class="font-title" text-anchor="end" font-size="52" fill="#ffffff" letter-spacing="-0.5px">Work</text>

      <g id="work-table" transform="translate(0, 75)">
        <line x1="0" y1="0" x2="720" y2="0" stroke="#22222a" stroke-width="1" />

        ${data.works.map((work, idx) => {
          const y = idx * 60;
          if (work.active) {
            return `
            <g transform="translate(0, ${y})">
              <rect x="0" y="0" width="720" height="58" fill="#ffffff" rx="2" />
              <text x="12" y="27" class="font-sans" font-size="12" font-weight="700" fill="#0f0f12">${escapeXml(work.period)}</text>
              <text x="12" y="44" class="font-sans" font-size="9.5" font-weight="500" fill="#555560">${escapeXml(work.duration)}</text>
              <text x="180" y="35" class="font-sans" font-size="13" font-weight="700" fill="#0f0f12">${escapeXml(work.company)}</text>
              <text x="420" y="35" class="font-sans" font-size="12" font-weight="500" fill="#0f0f12">
                ${escapeXml(work.role)} <tspan fill="#888890">|</tspan> <tspan font-weight="600">${escapeXml(work.tech)}</tspan>
              </text>
              <!-- Animated Pointer cursor indicator -->
              <g class="animated-cursor">
                <path d="M0 0 L4 12 L7 8 L12 8 Z" fill="#0f0f12" />
              </g>
              <line x1="0" y1="58" x2="720" y2="58" stroke="#ffffff" stroke-width="1" />
            </g>`;
          } else {
            return `
            <g class="work-row" transform="translate(0, ${y})">
              <rect class="row-bg" x="0" y="0" width="720" height="60" fill="transparent" />
              <text x="10" y="28" class="font-sans" font-size="12" font-weight="500" fill="#ffffff">${escapeXml(work.period)}</text>
              <text x="10" y="45" class="font-sans" font-size="9.5" fill="#666672">${escapeXml(work.duration)}</text>
              <text x="180" y="35" class="font-sans" font-size="13" font-weight="700" fill="#ffffff">${escapeXml(work.company)}</text>
              <text x="420" y="35" class="font-sans" font-size="12" fill="#888894">
                ${escapeXml(work.role)} <tspan fill="#444450">|</tspan> <tspan fill="#b0b0b8">${escapeXml(work.tech)}</tspan>
              </text>
              <line x1="0" y1="60" x2="720" y2="60" stroke="#22222a" stroke-width="1" />
            </g>`;
          }
        }).join('\n')}
      </g>

      <g transform="translate(720, 360)">
        <text x="0" y="0" class="font-sans" font-size="11" fill="#777784" text-anchor="end">Work experience</text>
        <text x="0" y="20" class="font-sans" font-size="13" font-weight="600" font-style="italic" fill="#ffffff" text-anchor="end">${escapeXml(data.totalWorkExp)}</text>
      </g>
    </g>
  </g>
</svg>`;
}

// Write file
const master = buildFullSvg(config);
fs.writeFileSync(path.join(__dirname, 'github-profile.svg'), master);
console.log('✓ Animated SVG created: github-profile.svg');
