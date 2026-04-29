import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';

const files = globSync('/Users/admin/Work/docs-starter/src/content/docs/**/*.mdx');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.startsWith('---')) {
    // Extract title from first # heading if possible
    let title = 'Untitled';
    const match = content.match(/^#\s+(.+)$/m);
    if (match) {
      title = match[1];
    }
    
    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
---
`;
    fs.writeFileSync(file, frontmatter + content);
    console.log(`Added frontmatter to ${file}`);
  }
}
