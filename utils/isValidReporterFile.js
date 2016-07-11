var tableMatcher = /-{10,}/
var wizardsHeaderMatcher = /Wizards\s+Event\s+Report/

function isValidReporterFile(lines) {
  if (lines.find( line => line.match(wizardsHeaderMatcher)) === undefined) return false
  if (lines.find( line => line.match(tableMatcher)) === undefined) return false

  return true
}

module.exports = isValidReporterFile

