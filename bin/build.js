#!/usr/bin/env node
const fs = require('fs');
const util = require('util');
const yargs = require('yargs');
const path = require('path');

const rcFile = require('../lib/rc-file');

const { resolve } = path;
const { promisify } = util;

const writeFile = promisify(fs.writeFile);

const options = yargs(process.argv.slice(2))
  .usage('Usage: $0 -s /path/to/schema.js')
  .options({
    schema: {
      alias: 's',
      demand: true,
      type: 'string',
      describe: 'Schema file path'
    },
    output: {
      alias: 'o',
      demand: true,
      type: 'string',
      describe: 'Output file path'
    }
  })
  .version()
  .strict()
  .help()
  .argv;

build();

async function build() {
  let schema;

  try {
    schema = require(resolve(options.schema))
  } catch (e) {
    console.log('Bad schema path');
    console.log(e);
    process.exit(1);
  }

  const destinationPath = resolve(options.output);
  const content = rcFile.build(schema);

  await writeFile(destinationPath, content);
}
