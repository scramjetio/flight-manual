import fs from 'node:fs';
import path from 'node:path';
import { schemas } from '../src/backend/schemas.mjs';

const OUTPUT_DIR = './src/content/docs/generated/api';

function extractTypeInfo(field) {
  let isOptional = false;
  let defaultValue = null;

  // Unwrap optional, default, nullable
  let inner = field;
  while (inner._def && (inner._def.type === 'optional' || inner._def.type === 'default' || inner._def.type === 'nullable')) {
    if (inner._def.type === 'optional') isOptional = true;
    if (inner._def.defaultValue) {
      try { defaultValue = inner._def.defaultValue(); } catch(e) {}
    }
    inner = inner._def.innerType;
  }
  
  const typeName = inner._def?.type || inner.type || 'unknown';
  const description = field.description || field._def?.description || inner.description || inner._def?.description || '';

  return { typeName, inner, isOptional, defaultValue, description };
}

function parseField(name, field, depth = 0) {
  const { typeName, inner, isOptional, defaultValue, description } = extractTypeInfo(field);
  
  let typeStr = typeName;
  let childrenMdx = '';

  if (typeName === 'object') {
    typeStr = 'object';
    const shape = inner.shape;
    if (shape) {
      childrenMdx = `\n<Expandable title="View Properties">\n`;
      for (const [childKey, childField] of Object.entries(shape)) {
        childrenMdx += parseField(childKey, childField, depth + 1) + '\n';
      }
      childrenMdx += `</Expandable>\n`;
    }
  } else if (typeName === 'array') {
    if (inner._def.element) {
      const elementInfo = extractTypeInfo(inner._def.element);
      typeStr = `${elementInfo.typeName}[]`;
      
      if (elementInfo.typeName === 'object') {
        const shape = elementInfo.inner.shape;
        if (shape) {
          childrenMdx = `\n<Expandable title="Array Item Properties">\n`;
          for (const [childKey, childField] of Object.entries(shape)) {
            childrenMdx += parseField(childKey, childField, depth + 1) + '\n';
          }
          childrenMdx += `</Expandable>\n`;
        }
      }
    } else {
      typeStr = 'array';
    }
  } else if (typeName === 'union') {
    const options = inner._def.options || [];
    const types = options.map(opt => {
      if (opt._def?.type === 'literal') return `'${opt._def.values[0]}'`;
      return extractTypeInfo(opt).typeName;
    });
    typeStr = types.join(' | ');
  } else if (typeName === 'record') {
    const vType = inner._def.valueType || inner._def.keyType; // fallback if undefined
    if (vType) {
      const valueInfo = extractTypeInfo(vType);
      typeStr = `Record<string, ${valueInfo.typeName}>`;
    } else {
      typeStr = 'Record<string, any>';
    }
  }

  let defaultStr = defaultValue ? ` defaultValue="${defaultValue}"` : '';
  let requiredStr = !isOptional ? ' required' : '';

  return `<ApiField name="${name}" type="${typeStr}"${requiredStr}${defaultStr}>
  ${description}${childrenMdx}
</ApiField>\n`;
}

function formatToStarlight(schemaName, zodSchema) {
  let mdx = `---
title: ${schemaName}
description: "API Reference for the ${schemaName} object."
---

import ApiField from '@/components/docs/ApiField.astro';
import Expandable from '@/components/docs/Expandable.astro';

## Schema Properties

`;

  const shape = zodSchema.shape;
  
  if (!shape) {
    return mdx + "*(No properties found)*";
  }

  for (const [key, field] of Object.entries(shape)) {
    mdx += parseField(key, field) + '\n';
  }

  return mdx;
}

async function run() {
  console.log('🚀 Starting Recursive Zod-to-MDX codegen pipeline...');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const [schemaName, zodSchema] of Object.entries(schemas)) {
    console.log(`📖 Parsing Zod Schema: ${schemaName}`);
    
    const formatted = formatToStarlight(schemaName, zodSchema);
    
    const targetPath = path.join(OUTPUT_DIR, `${schemaName.toLowerCase()}.mdx`);
    
    fs.writeFileSync(targetPath, formatted);
    console.log(`✅ Projected to ${targetPath}`);
  }

  console.log('\n✨ Documentation sync complete.');
}

run();
