export function catFrequencyOverTime (thoughts) {
  const frequencyCount = {}
  thoughts.forEach(thought => {
    thought.categories.forEach(c => {
      const mapData = frequencyCount[c.label] ? frequencyCount[c.label] : []
      mapData.push(thought)
      frequencyCount[c.label] = mapData
    })
  })

  Object.keys(frequencyCount).forEach(key => {
    const dateMap = {}
    frequencyCount[key].forEach(thought => {
      const date = dateOnly(thought.createdAt)
      dateMap[date] = dateMap[date] ? ++dateMap[date] : 1
    })
    frequencyCount[key].dateMap = Object.keys(dateMap).map(key => ({
      date: key,
      count: dateMap[key]
    }))
  })

  const frequencyMap = Object.keys(frequencyCount).map(key => ({
    key,
    count: frequencyCount[key].length,
    dateMap: frequencyCount[key].dateMap
  }))
  frequencyMap.sort((a, b) => b.count - a.count)

  return frequencyMap
}

export function thoughtsOverTime (thoughts) {
  return thoughts.reduce((times, thought) => ([ ...times, new Date(thought.createdAt)]), [])
}

export function dateOnly (_date) {
  const date = new Date(_date)
  date.setHours(0, 0, 0, 0)
  return date
}

export function formatDate (_date) {
  const date = new Date(_date)
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours() % 12}:${date.getMinutes()} ${date.getHours() % 12 > 0 ? 'PM' : 'AM' }`
}
