var test = require('tape')

var extractRowData = require('../utils/extractRowData')

test('extractRowData', t => {

  var tableCols = [
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

  var fullRow = [
    pad('1', 8),
    pad('Ariadne Name-thing', 20),
    pad('42', 8)
  ].join('')

  var partialRow = [
    pad('', 8),
    'Nissa Revanae',
    ''
  ].join('')


  var tableBodyRows = [
    fullRow,
    partialRow
  ]

  var extractedRowData = extractRowData(tableBodyRows, tableCols)

  var fullRowData = {
    Table: 1,
    Player: 'Ariadne Name-thing',
    Points: 42,
  }

  var partialRowData = {
    Table: null,
    Player: 'Nissa Revanae',
    Points: null,
  }

  t.deepEqual(extractedRowData[0], fullRowData, 'extracts full row of data correctly')
  t.deepEqual(extractedRowData[1], partialRowData, 'extracts partial row of data correctly')
      
    
  t.end()
})

function pad (string, requiredLength) {
  var diff = requiredLength - string.length

  return string + Array(diff).fill(' ').join('')
}


