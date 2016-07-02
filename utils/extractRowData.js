function extractRowData (tableBodyRows, colsData) {
  return tableBodyRows.map( splitRow(colsData) )
}

function splitRow (colsData) {
  return (row) => {
    return colsData.reduce(
      (prev, next) => { 
        prev[next.name] = tidyFormat( row.slice(next.start, next.end) )
        return prev
      },
      {}
    )
  }
}

function tidyFormat (string) {
  if (string.match(/^\s*$/)) return null

  return isNaN(string) ? 
    string.replace(/\s*$/,'') : 
    Number(string)
}

export default extractRowData

