# MTG-Tourney-Parser

This module is designed for parse pdfs that have been generated by Wizards Event Reporter 4.
This should enable data presented in more accessible formats.

## Dependencies

mtg-tourney-parser uses [pdf-text-extract](https://www.npmjs.com/package/pdf-text-extract), which depends on the `pdftotext` binary.

On Debian / Ubuntu, the `poppler-utils` is a package that provides this.

To use this package on Heroku, add `poppler-utils` to an `Aptfile` in the root of your project, then tell heroku you want to install those prior to your application startup : 

```bash
heroku buildpack:set https://github.com/heroku/heroku-buildpack-multi.git -a NAME_OF_YOUR_HEROKU_APP
```

## Usage

```js
var parser = require('mtg-tourney-parser')
var path = require('path')

parser( path.join(__dirname, 'test/example_round_listing.pdf'), (err, data) => {
  if (err) console.error(err)

  console.log('success!', data)
})
```

