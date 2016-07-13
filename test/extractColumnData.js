var test = require('tape')

var extractColumns = require('../utils/extractColumnData')

test('extractColumns, nice case', (t) => {
  var tableRowsData = {
    head:  "Table   Player              DCI          Opponent            DCI          Points",
    body: ["3       Lane, James         2345612      Last, Firstname     11122233     5-0"],
  }

  var expectedColumns = [
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
    {},
    {},
    {
      index: 4,
      start: 61,
      end: 74,
      name: 'DCI'
    },
    { 
      index: 5,
      start: 74,
      end: 80,
      name: 'Points'
    },
  ]

  var actualColumns = extractColumns(tableRowsData)

  t.deepEqual(expectedColumns[0], actualColumns[0], 'matches first col')
  t.deepEqual(expectedColumns[1], actualColumns[1], 'matches second col')
  t.deepEqual(expectedColumns[4], actualColumns[4], 'matches fifth col')
  t.deepEqual(expectedColumns[5], actualColumns[5], 'matches last col')


  t.end()
})


test('extractColumns, ugly Points-column missing case', (t) => {
  var tableRowsData = {
    head:  "Table   Player              DCI          Opponent            DCI ",
    body: ["3       Lane, James         2345612      Last, Firstname     11122233     5-0"],
  }

  var expectedColumns = [
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
    {},
    {},
    {
      index: 4,
      start: 61,
      end: 74,
      name: 'DCI'
    },
    { 
      index: 5,
      start: 74,
      end: 80,
      name: 'Points'
    },
  ]

  var actualColumns = extractColumns(tableRowsData)

  t.deepEqual(expectedColumns[0], actualColumns[0], 'matches first col')
  t.deepEqual(expectedColumns[1], actualColumns[1], 'matches second col')
  t.deepEqual(expectedColumns[4], actualColumns[4], 'matches fifth col')
  t.deepEqual(expectedColumns[5], actualColumns[5], 'matches last col')


  t.end()
})
