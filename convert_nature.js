const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');

const input = path.join(__dirname, 'Nature.mp4');
const output = path.join(__dirname, 'assets', 'nature.gif');

console.log('Converting Nature.mp4 to assets/nature.gif...');
// Scale width to 600 or 760 with 12 fps and optimal palette
const cmd = `"${ffmpeg}" -y -i "${input}" -vf "fps=12,scale=600:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer" -loop 0 "${output}"`;
execSync(cmd, { stdio: 'inherit' });
const stats = fs.statSync(output);
console.log(`Created ${output} (${(stats.size / 1024).toFixed(1)} KB)`);

const thumbOutput = path.join(__dirname, 'assets', 'nature_thumb.jpg');
execSync(`"${ffmpeg}" -y -i "${input}" -vframes 1 "${thumbOutput}"`);
console.log('Created thumbnail assets/nature_thumb.jpg');
