const fs = require('fs');
const path = 'src/components/sections/IdentityEventsSequence.tsx';
let c = fs.readFileSync(path, 'utf8');
c = c.split('\"').join('"');
c = c.split('\n').join('
');
fs.writeFileSync(path, c);
console.log('Fixed');
