function extractTableRows (lines) {
  lines = ensureArrayOfLines(lines)

  return {
    head: extractTableHead(lines),
    body: extractTableBody(lines),
  }
}

function ensureArrayOfLines(lines) {
  if (Array.isArray(lines)) return lines

  return lines.split('\n')
}

function extractTableHead (lines) {
  return lines[horizontalRuleIndex(lines) - 1]
}

function extractTableBody (lines) {
  const linesBelowHR = lines.slice(horizontalRuleIndex(lines) + 1) 
  const indexOfEnd = linesBelowHR.findIndex( line => line.match(/^\s*$/) )

  return linesBelowHR.slice(0, indexOfEnd)
}


function horizontalRuleIndex (lines) {
  lines = ensureArrayOfLines(lines) 
  const hrPattern = /^\s*-{10,}\s*$/   // a line which optionally has spaces at start and end, and at least 10 dashes in middle

  return lines.findIndex( line => line.match(hrPattern) )
}


export default extractTableRows

