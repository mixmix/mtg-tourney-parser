function extractColumns(rowData) { 
  var colPattern = /[\w\d]+-?(\s{3,}|\s*$)/g  // words characters
                                            // follower optionally by a -
                                            // followed by ( 3 or more spaces || (any spaces && end of line) )
  var rawCols = rowData.head.match(colPattern)

  var colData = rawCols.reduce( 
    (prev, next, index) => {
      var start = prev[0] ? prev[ prev.length - 1 ].end : 0

      return [
        ...prev,
        {
          index,
          start,
          end:   start + next.length,
          name:  next.replace(/\s+$/,'')   // cut trailing spaces
        }
      ]
    }, 
    []
  )

  fixLastNamedCol(colData, rowData)
  addPointsColIfMissing(colData)

  return colData
  
}

function fixLastNamedCol(colData, rowData) {
  var lastNamedCol = colData[colData.length-1]
  var exampleRow = rowData.body[0]

  var colMatcher = new RegExp(`.{${lastNamedCol.start}}([\\w\\d-]+\\s*)`)

  var actualColWidth = exampleRow.match(colMatcher)[1].length
  var proposedEnd = lastNamedCol.start + actualColWidth

  if (proposedEnd > lastNamedCol.end) 
    lastNamedCol.end = proposedEnd
}

function addPointsColIfMissing(colData) {
  var colNameThatIsPointlike = colData.map( col => col.name ).find( name => name.match(/point/i) )
  if (colNameThatIsPointlike) return
  
  var lastNamedCol = colData[colData.length-1]
  colData.push({
    index: colData.length,
    name:  'Points',
    start: lastNamedCol.end,
    end:   lastNamedCol.end + 6,
  })
}



module.exports = extractColumns

