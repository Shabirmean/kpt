const data = require('./catalog.json');
const table = require('markdown-table');

function tableByType(type) {
    let t = [['Image', 'Args', 'Description', 'Example', 'Source', 'Toolchain']];
    data.filter(r => r.type === type).forEach(r => {
        let desc = r.description;
        if (r.demo === true) {
            desc = '[Demo] ' + desc;
        }
        let example = ``;
        if (r.example != undefined) {
          example = `[Example](${r.example})`;
        }
        const source = `[Source](${r.source})`;
        let toolchain = ``;
        if (r.toolchain === "golang") {
          toolchain = "[Go Library](../../../../producer/functions/golang/)";
        } else if (r.toolchain === "typescript") {
          toolchain = "[Typescript SDK](../../../../producer/functions/ts/)";
        } else if (r.toolchain === "starlark") {
          toolchain = "[Starlark Runtime](../../../../producer/functions/starlark/)";
        }
        t.push([r.image, r.args, desc, example, source, toolchain]);
    });
    return table(t);
}

const descriptions = {
"source": `
A Source takes no \`input\`:

{{< png src="images/source" >}}

Instead, the function typically produces the \`output\` by reading configurations
from an external system (e.g. reading files from a filesystem).
`,
"sink": `
A Sink produces no \`output\`:

{{< png src="images/sink" >}}

Instead, the function typically writes configurations to an external system
(e.g. writing files to a filesystem).
`,
"generator": `
Generators create packages for new services by building a configuration for
a namespace with organization-mandated config defaults.
`,
"transformer": `
A transformer mutates resources, by an action such as changing a namespace or
the image used in a pod, without adding new resources.
`,
"validator": `
A validator verifies that a resource satisfies certain conditions without creating
or modifying any resources. Validator functions are managed by function authors who
desire to verify the state (optionally) recorded in the \`--results-dir\` path
provided by \`kpt\`.

For example, a replica may be specified to be within a certain range and verified
using a validator function.
`
}

const name = process.argv[2]

const README = `---
title: "${name} Catalog"
linkTitle: "${name}s"
type: docs
description: >
    Catalog of ${name} Functions.
---
<!---
DO NOT EDIT. Generated by: "cd ../catalog; npm run gen-docs"
-->
${descriptions[name.toLowerCase()] || ""}
## ${name} Functions

${tableByType(name.toLowerCase())}

## Next Steps

- Learn more ways of using the kpt fn command from the [reference] doc.

[reference]: ../../../../../reference/fn/run/`;

console.log(README);
