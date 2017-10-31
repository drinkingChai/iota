export function catFrequency (thoughts) {
  const frequencyCount = {}
  thoughts.forEach(thought => {
    thought.classifications.forEach(c => {
      const mapData = frequencyCount[c.label] ? frequencyCount[c.label] : []
      mapData.push(thought)
      frequencyCount[c.label] = mapData
    })
  })

  const frequencyMap = Object.keys(frequencyCount).map(key => ({ key, count: frequencyCount[key].length }))
  frequencyMap.sort((a, b) => b.count - a.count)
  return frequencyMap
}

export function catFrequencyOverTime (thoughts) {
  const frequencyCount = {}
  thoughts.forEach(thought => {
    thought.classifications.forEach(c => {
      const mapData = frequencyCount[c.label] ? frequencyCount[c.label] : []
      mapData.push(thought)
      frequencyCount[c.label] = mapData
    })
  })

  Object.keys(frequencyCount).forEach(key => {
    const dateMap = {}
    frequencyCount[key].forEach(thought => {
      const date = dateOnly(thought.created)
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

export function singleCatOverTime (thoughts, cat) {
  const frequencyCount = thoughts.reduce((map, thought) => {
    thought.classifications.forEach(c => {
      if (c.label == cat.label) {
        let date = dateOnly(c.thought_category.createdAt),
          entry = map[date] || []
        entry.push(thought)
        map[date] = entry
      }
    })
    return map
  }, {})

  const frequencyMap = Object.keys(frequencyCount).map(key => ({
    key,
    thoughts: frequencyCount[key]
  }))

  frequencyMap.sort((a, b) => a.date - b.date)

  return frequencyMap
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
