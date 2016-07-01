import test from 'tape'
import path from 'path'

import parser, { extract, tableColumns } from '../index.js'

const examplePDF = path.join(__dirname, 'example_round_listing.pdf')

test('finds table columns', (t) => {
  extract(examplePDF, (err, text) => {
    if (err) { 
      console.log (err)
      t.end()
      return 
    }
    if (Array.isArray(text)) text = text.join('/n')

    const colsData = tableColumns(text)

    const expectedRawTableHead = "Table   Player              DCI          Opponent            DCI          Points"
    t.equal(colsData.rawTableHead, expectedRawTableHead, 'it locates the raw table head')

    const expectedColumns = []
    expectedColumns[0] = { 
      index: 0,
      start: 0,
      end: 8,
      name: 'Table'
    }
    expectedColumns[1] = { 
      index: 1,
      start: 8,
      end: 28,
      name: 'Player'
    }
    expectedColumns[5] = { 
      index: 5,
      start: 74,
      end: 80,
      name: 'Points'
    }

    t.deepEqual(colsData.columns[0], expectedColumns[0], 'matches first col')
    t.deepEqual(colsData.columns[1], expectedColumns[1], 'matches second col')
    t.deepEqual(colsData.columns[5], expectedColumns[5], 'matches last col')


    t.end()
  })
})


