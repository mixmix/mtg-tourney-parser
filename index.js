var extract = require('pdf-text-extract')

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

    var lines = text.join('\n').split('\n')

    if (!isValidReporterFile(lines)) {
      callback("Error: This doesn't appear to be a Wizards Event Reporter pdf")
      return
    }


    var tableRows = extractTableRows(lines)
    var columnData = extractColumnData(tableRows.head)
    var rowData = extractedRowData(tableRows.body, columnData)

    callback(null, rowData)

  })
}

module.exports = parser


