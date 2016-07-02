import test from 'tape'

import extractRowData from '../utils/extractRowData'

test('extractRowData', t => {

  const tableCols = [
    { 
      index: 0,
      start: 0,
      end: 8,
      name: 'Table'
    }, { 
      index: 1,
      start: 8,
      end: 28,
      name: 'Player'
    }, { 
      index: 5,
      start: 28,
      end: 36,
      name: 'Points'
    },
  ]

  const fullRow = [
    pad('1', 8),
    pad('Ariadne Name-thing', 20),
    pad('42', 8)
  ].join('')

  const partialRow = [
    pad('', 8),
    'Nissa Revanae',
    ''
  ].join('')


  const tableBodyRows = [
    fullRow,
    partialRow
  ]

  const extractedRowData = extractRowData(tableBodyRows, tableCols)

  const fullRowData = {
    Table: 1,
    Player: 'Ariadne Name-thing',
    Points: 42,
  }

  const partialRowData = {
    Table: null,
    Player: 'Nissa Revanae',
    Points: null,
  }

  t.deepEqual(extractedRowData[0], fullRowData, 'extracts full row of data correctly')
  t.deepEqual(extractedRowData[1], partialRowData, 'extracts partial row of data correctly')
      
    
  t.end()
})

function pad (string, requiredLength) {
  const diff = requiredLength - string.length

  return string + Array(diff).fill(' ').join('')
}


