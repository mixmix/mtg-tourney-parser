var test = require('tape')
var path = require('path')
var extract = require('pdf-text-extract')

var isValidReporterFile = require('../utils/isValidReporterFile')

test('isWizardsEventReport', (t) => {

  var linesWithEventReport = [
    "Wizards Event Reporter  ",
    "   ",
    " --------------------------- ",
    " something"
  ]

  var linesWithoutEventReport = [
    "Event Reporter  ",
    "   ",
    " ----------------------- ",
    " something"
  ]

  t.true(isValidReporterFile(linesWithEventReport), 'returns true for lines with Wizards Event Report present')
  t.false(isValidReporterFile(linesWithoutEventReport), 'returns false for lines without Wizards Event Report present')

  t.end()
})

