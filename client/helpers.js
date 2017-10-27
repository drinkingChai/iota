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

export function formatDate (_date) {
  const date = new Date(_date)
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
}
