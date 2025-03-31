#!/usr/bin/env ts-node

import { run } from '../lib/index';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argvPromise = yargs(hideBin(process.argv))
  .option('url', { type: 'string', demandOption: true })
  .option('page', { type: 'string', demandOption: true })
  .help()
  .parseAsync();

argvPromise.then(argv => {
  run(argv.url, argv.page);
}).catch(err => {
  console.error('Error parsing arguments:', err);
});
