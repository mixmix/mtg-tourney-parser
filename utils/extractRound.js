module.exports = function extractRound (lines) {
  return lines.find(string => /^Round\s+\d+\s?$/.test(string))
}

