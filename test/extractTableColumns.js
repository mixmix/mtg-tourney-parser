import test from 'tape'

import extractColumns from '../utils/extractTableColumns'

test('extractColumns', (t) => {
  const actualTableHead = "Table   Player              DCI          Opponent            DCI          Points"

  const actualColumns = [
    { 
      index: 0,
      start: 0,
      end: 8,
      name: 'Table'
    },
    { 
      index: 1,
      start: 8,
      end: 28,
      name: 'Player'
    },
    {} ,
    {} ,
    {} ,
    { 
      index: 5,
      start: 74,
      end: 80,
      name: 'Points'
    },
  ]

  const extractedColumns = extractColumns(actualTableHead)

  t.deepEqual(extractedColumns[0], actualColumns[0], 'matches first col')
  t.deepEqual(extractedColumns[1], actualColumns[1], 'matches second col')
  t.deepEqual(extractedColumns[5], actualColumns[5], 'matches last col')


  t.end()
})


