import fs from 'node:fs';
import path from 'node:path';

const SOURCES = [
  {
    name: 'Scramjet',
    path: '/Users/admin/Work/scram-jet/README.md',
    target: 'reference/scramjet.mdx',
    description: 'Universal Capture. Transform. Send.'
  },
  {
    name: 'UberMesh',
    path: '/Users/admin/Work/ubermesh/README.md',
    target: 'reference/ubermesh.mdx',
    description: 'The Content Operating System substrate.'
  },
  {
    name: 'API Mom',
    path: '/Users/admin/Work/scram-jet/packages/api-mom/README.md',
    target: 'reference/api-mom.mdx',
    description: 'Global API Traffic Controller.'
  }
];

const OUTPUT_DIR = './src/content/docs/generated';

function formatToStarlight(name, content, description) {
  // Simulate AI transformation: stripping excessive headers, fixing relative links, etc.
  let cleaned = content.replace(/^# .*$/m, ''); // Remove the first H1 as Starlight adds it from title
  
  return `---
title: ${name}
description: ${description}
---

${cleaned}
`;
}

async function run() {
  console.log('🚀 Starting documentation sync...');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const source of SOURCES) {
    if (fs.existsSync(source.path)) {
      console.log(`📖 Reading ${source.name} from ${source.path}`);
      const content = fs.readFileSync(source.path, 'utf8');
      const formatted = formatToStarlight(source.name, content, source.description);
      
      const targetPath = path.join(OUTPUT_DIR, source.target);
      const targetDir = path.dirname(targetPath);
      
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      fs.writeFileSync(targetPath, formatted);
      console.log(`✅ Projected to ${targetPath}`);
    } else {
      console.warn(`⚠️ Source not found: ${source.path}`);
    }
  }

  console.log('\n✨ Documentation sync complete.');
}

run();
