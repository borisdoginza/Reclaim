export function groupConsecutiveHours(entries) {
  return entries.reduce((groups, entry) => {
    const previousGroup = groups[groups.length - 1]
    const previousEntry = previousGroup?.entries.at(-1)

    if (
      previousEntry
      && previousEntry.closed === entry.closed
      && previousEntry.opening === entry.opening
      && previousEntry.closing === entry.closing
    ) {
      previousGroup.entries.push(entry)
    } else {
      groups.push({ entries: [entry] })
    }

    return groups
  }, [])
}
