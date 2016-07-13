function extractRowData (tableBodyRows, colsData) {
  return tableBodyRows.map( splitRow(colsData) )
}

function splitRow (colsData) {
  return (row) => {
    var rowData = colsData.reduce(
      (prev, next) => { 
        prev[next.name] = tidyFormat( row.slice(next.start, next.end) )
        return prev
      },
      {}
    )

    return rowData
  }
}

function tidyFormat (string) {
  if (string.match(/^\s*$/)) return null

  return isNaN(string) ? 
    string.replace(/\s*$/,'') : 
    Number(string)
}

module.exports = extractRowData

