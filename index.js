var extract = require('pdf-text-extract')

var extractRound      = require('./utils/extractRound')
var extractTableRows  = require('./utils/extractTableRows')
var extractColumnData = require('./utils/extractColumnData')
var extractedRowData  = require('./utils/extractRowData')
var isValidReporterFile  = require('./utils/isValidReporterFile')

function parser (filePath, callback) {
  extract(filePath, (err, text) => {
    if (err) {
      callback(err)
      return
    }

    var lines = text.join('').split('\n')

    if (!isValidReporterFile(lines)) {
      callback("Error: This doesn't appear to be a Wizards Event Reporter pdf")
      return
    }

    var round      = extractRound(lines)
    var tableRows  = extractTableRows(lines)
    var columnData = extractColumnData(tableRows)
    var rowData    = extractedRowData(tableRows.body, columnData)

    callback(null, rowData, round)
  })
}

module.exports = parser


