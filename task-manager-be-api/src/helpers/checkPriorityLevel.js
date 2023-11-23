function checkPriorityLevel(level) {
  let finalLevel = level.toLowerCase();
  if (finalLevel == 'low' || finalLevel == 'high' || finalLevel == 'medium') {
    return true;
  }
  return false;
}

module.exports = checkPriorityLevel;
