var test = require('tape')
var path = require('path')
var extract = require('pdf-text-extract')

var extractTableRows = require('../utils/extractTableRows')

var examplePDF = path.join(__dirname, 'example_round_listing.pdf')

test('extractTable', (t) => {
  extract(examplePDF, (err, text) => {
    if (err) { 
      t.end()
      return 
    }
    if (Array.isArray(text)) text = text.join('/n')

    var actualTableHead = "Table   Player              DCI          Opponent            DCI          Points"

    var table = extractTableRows(text)

    t.equal(table.head, actualTableHead, 'it locates the raw table head')
    t.true(Array.isArray(table.body), 'it extracts the raw table body into an array of lines')
    t.equal(table.body.length, 41, 'there are as many lines in body as in table')

    var headLessLastCol = actualTableHead.replace(/\w+\s*$/, '')
    table.body.forEach( (row,i) => {
      var whiteSpacePattern = /\s{2,}/g
      t.true(row.length > headLessLastCol.length, `row ${i} has enough characters to fill all the cols`)
    })

    t.end()
  })
})

