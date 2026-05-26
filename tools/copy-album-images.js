#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, 'source');
const albumsDir = path.join(sourceDir, 'albums');

const copies = [
  ...fs.readdirSync(path.join(sourceDir, '_posts', '北京展览馆游览'))
    .filter(f => f.endsWith('.jpeg'))
    .map(f => ({
      src: path.join(sourceDir, '_posts', '北京展览馆游览', f),
      dst: path.join(albumsDir, '0', f)
    })),
  ...fs.readdirSync(path.join(sourceDir, '_posts', '风景独好'))
    .filter(f => f.endsWith('.jpg'))
    .map(f => ({
      src: path.join(sourceDir, '_posts', '风景独好', f),
      dst: path.join(albumsDir, '1', f)
    })),
  { src: path.join(sourceDir, '_posts', '2021年度总结', '琳.jpg'), dst: path.join(albumsDir, '2', '琳.jpg') },
  { src: path.join(sourceDir, '_posts', '也许真的可以', '改变.jpg'), dst: path.join(albumsDir, '2', '改变.jpg') },
  { src: path.join(sourceDir, '_posts', '也许真的可以', '改变1.jpg'), dst: path.join(albumsDir, '2', '改变1.jpg') },
  { src: path.join(sourceDir, 'images', 'slug', 'bjzlg.jpg'), dst: path.join(albumsDir, '2', 'bjzlg.jpg') },
  { src: path.join(sourceDir, 'images', 'slug', 'first_step.png'), dst: path.join(albumsDir, '2', 'first_step.png') },
];

for (const { src, dst } of copies) {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    if (!fs.existsSync(dst)) {
      fs.copyFileSync(src, dst);
      console.log(`Copied: ${path.relative(rootDir, src)} -> ${path.relative(rootDir, dst)}`);
    }
  } else {
    console.error(`Missing: ${path.relative(rootDir, src)}`);
  }
}
