var extract = require('pdf-text-extract')

var extractTableRows  = require('./utils/extractTableRows')
var extractColumnData = require('./utils/extractColumnData')
var extractedRowData  = require('./utils/extractRowData')

function parser (filePath, callback) {
  extract(filePath, (err, text) => {
    if (err) {
      callback(err)
      return
    }

    var lines = text.join('\n').split('\n')
    var tableRows = extractTableRows(lines)
    var columnData = extractColumnData(tableRows.head)
    var rowData = extractedRowData(tableRows.body, columnData)

    callback(null, rowData)

  })
}

module.exports = parser


