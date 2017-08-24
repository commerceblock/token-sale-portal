'use strict';

const editorconfig = require('editorconfig').parseSync('./.editorconfig')

module.exports = {
  "extends": "stylelint-config-standard",
  "rules":
  {
    'no-missing-end-of-source-newline': editorconfig.insert_final_newline,
    'indentation': editorconfig.indent_size,
    'no-eol-whitespace': editorconfig.trim_trailing_whitespace
  }
}
