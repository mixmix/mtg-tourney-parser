import extract from 'pdf-text-extract'

function tableColumns (text) {
  const lines = text.split('\n')
  const rawTableHead = tableHead(lines)
  const columns = tableCols(rawTableHead)

  return {
    rawTableHead,
    columns,
  }
}

function tableHead (lines) {
  const hrPattern = /^\s*-{10,}\s*$/   // a line which optionally has spaces at start and end, and at least 10 dashes in middle
  const horizontalRuleIndex = lines.findIndex( (el) => el.match(hrPattern) )

  return lines[horizontalRuleIndex - 1]
}


function tableCols(head) { 
  const colPattern = /\w+(\s{3,}|\s*$)/g  // words characters followed by ( 3 or more spaces || (any spaces && end of line) )
  const rawCols = head.match(colPattern)

  return rawCols.reduce( 
    (prev, next, index) => {
      const start = prev[0] ? prev[ prev.length - 1 ].end : 0

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

function parser (path) {

}

export default parser
export { tableColumns, extract }

