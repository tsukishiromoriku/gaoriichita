const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');

const workspaceDir = __dirname;
const assetsDir = path.join(workspaceDir, 'assets');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const videos = [
  {
    input: path.join(workspaceDir, 'Cat Meme 1.mp4'),
    output: path.join(assetsDir, 'char_meme1.gif'),
    name: 'Si Pasrah'
  },
  {
    input: path.join(workspaceDir, 'Cat Meme 2.mp4'),
    output: path.join(assetsDir, 'char_meme2.gif'),
    name: 'Si Menghina'
  },
  {
    input: path.join(workspaceDir, 'Cat Meme 3.mp4'),
    output: path.join(assetsDir, 'char_meme3.gif'),
    name: 'Si 0 Gram'
  }
];

for (const v of videos) {
  console.log(`Converting ${v.name} from "${v.input}"...`);
  // Generate square cropped 140x140 GIF with optimal palette
  // crop to square centered, scale to 140x140, 12 fps
  const cmd = `"${ffmpeg}" -y -i "${v.input}" -vf "fps=12,crop='min(iw,ih)':'min(iw,ih)',scale=140:140:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer" -loop 0 "${v.output}"`;
  execSync(cmd, { stdio: 'inherit' });
  const stats = fs.statSync(v.output);
  console.log(`Created ${v.output} (${(stats.size / 1024).toFixed(1)} KB)`);
}

console.log('Conversion complete!');
