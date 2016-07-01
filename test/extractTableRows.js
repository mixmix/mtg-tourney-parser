import test from 'tape'
import path from 'path'
import extract from 'pdf-text-extract'

import extractTableRows from '../utils/extractTableRows'

const examplePDF = path.join(__dirname, 'example_round_listing.pdf')

test('extractTable', (t) => {
  extract(examplePDF, (err, text) => {
    if (err) { 
      t.end()
      return 
    }
    if (Array.isArray(text)) text = text.join('/n')

    const actualTableHead = "Table   Player              DCI          Opponent            DCI          Points"

    const table = extractTableRows(text)

    t.equal(table.head, actualTableHead, 'it locates the raw table head')
    t.true(Array.isArray(table.body), 'it extracts the raw table body into an array of lines')
    t.equal(table.body.length, 41, 'there are as many lines in body as in table')

    const headLessLastCol = actualTableHead.replace(/\w+\s*$/, '')
    table.body.forEach( (row,i) => {
      const whiteSpacePattern = /\s{2,}/g
      t.true(row.length > headLessLastCol.length, `row ${i} has enough characters to fill all the cols`)
    })

    t.end()
  })
})

