const fs = require('fs');
const path = require('path');

function createFeature(name, packagePath) {
  const featurePath = path.join(packagePath, 'src/features', name);
  
  // Create directories
  fs.mkdirSync(path.join(featurePath, '__tests__'), { recursive: true });
  
  // Create files
  const componentName = name.split('-').map(w => 
    w.charAt(0).toUpperCase() + w.slice(1)
  ).join('');
  
  // Component file
  fs.writeFileSync(
    path.join(featurePath, `${componentName}.tsx`),
    `export const ${componentName} = () => {
  return <div>${componentName}</div>;
};`
  );
  
  // Types file
  fs.writeFileSync(
    path.join(featurePath, `${name}.types.ts`),
    `export interface ${componentName}Props {
  // Add props here
}`
  );
  
  // Test file
  fs.writeFileSync(
    path.join(featurePath, '__tests__', `${componentName}.test.tsx`),
    `import { ${componentName} } from '../${componentName}';

describe('${componentName}', () => {
  it('should render', () => {
    // Add test
  });
});`
  );
  
  console.log(`✅ Created feature: ${name}`);
}

// Usage: node create-feature.js array-element packages/canvas
if (require.main === module) {
  const [,, featureName, packagePath] = process.argv;
  
  if (!featureName || !packagePath) {
    console.log('Usage: node create-feature.js <feature-name> <package-path>');
    console.log('Example: node create-feature.js array-element packages/canvas');
    process.exit(1);
  }
  
  try {
    createFeature(featureName, packagePath);
  } catch (error) {
    console.error('Error creating feature:', error.message);
    process.exit(1);
  }
}

module.exports = { createFeature }; 