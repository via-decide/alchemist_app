/**
 * Document Structure Engine (core/structure.js)
 * Automatically detects headings and generates proper EPUB navigation (TOC + nav map).
 */

const { parse } = require('htmlparser2');
const fs = require('fs');
const path = require('path');

// Content Parser
function scanContentBlocks(html) {
  const parser = new parse.Parser({
    onopentag: (name, attribs) => {
      if (name === 'h1' || name === 'h2' || name === 'h3') {
        // Detect heading levels
        const headingLevel = getHeadingLevel(name);
        return { headingLevel };
      }
    },
  });

  parser.write(html);
  parser.end();

  return parser.results;
}

// Heading Level Detection
function getHeadingLevel(tagName) {
  switch (tagName) {
    case 'h1':
      return 1;
    case 'h2':
      return 2;
    case 'h3':
      return 3;
    default:
      // Fallback detection using text patterns
      const headingText = parser.results[0].attribs.text;
      if (headingText.includes('Chapter')) {
        return 1;
      } else if (headingText.includes('Section')) {
        return 2;
      } else if (headingText.includes('Subsection')) {
        return 3;
      }
      return null;
  }
}

// EPUB Navigation Generation
function generateEPUBNavigation(contentBlocks) {
  const toc = [];
  let currentLevel = 0;

  contentBlocks.forEach((block) => {
    const headingLevel = block.headingLevel;
    if (headingLevel > currentLevel) {
      // New level, add to TOC and nav map
      toc.push({ text: block.attribs.text, level: headingLevel });
      currentLevel = headingLevel;
    } else if (headingLevel < currentLevel) {
      // Backtracking, remove from TOC and nav map
      while (currentLevel > headingLevel) {
        toc.pop();
        currentLevel--;
      }
    }
  });

  return { toc, navMap: generateNavMap(toc) };
}

// Nav Map Generation
function generateNavMap(toc) {
  const navMap = [];

  toc.forEach((entry) => {
    navMap.push({ text: entry.text, level: entry.level });
  });

  return navMap;
}

// Main Function
async function main() {
  // Load HTML content from file or database
  const html = fs.readFileSync('content.html', 'utf8');

  // Scan content blocks and detect headings
  const contentBlocks = scanContentBlocks(html);

  // Generate EPUB navigation (TOC + nav map)
  const epubNavigation = generateEPUBNavigation(contentBlocks);

  // Output EPUB navigation as JSON
  console.log(JSON.stringify(epubNavigation, null, 2));
}

main();