const fs = require('fs');

const file = fs.readFileSync('src/metadata/build-version.json');
const fileContents = JSON.parse(file);

console.log(`Build version ${fileContents.version}`);

fileContents.version += 1;

fs.writeFileSync(
  'src/metadata/build-version.json',
  JSON.stringify(fileContents)
);
