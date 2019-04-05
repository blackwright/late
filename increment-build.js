const fs = require('fs');

const file = fs.readFileSync('src/metadata/build-version.json');
const fileContents = JSON.parse(file);
fileContents.version += 1;

console.log(`Build version ${fileContents.version}...`);

fs.writeFileSync(
  'src/metadata/build-version.json',
  JSON.stringify(fileContents)
);
