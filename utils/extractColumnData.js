function extractColumns(head) { 
  var colPattern = /\w+(\s{3,}|\s*$)/g  // words characters followed by ( 3 or more spaces || (any spaces && end of line) )
  var rawCols = head.match(colPattern)

  return rawCols.reduce( 
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
}

module.exports = extractColumns

