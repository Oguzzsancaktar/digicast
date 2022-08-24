const timeToSeconds = time => {
  const splited = time.split(':')
  const hours = splited[0]
  const minutes = splited[1]
  const seconds = splited[2]

  let totalSeconds = 0
  if (seconds) {
    totalSeconds = +hours * 60 * 60 + +minutes * 60 + +seconds
  } else {
    totalSeconds = +hours * 60 * 60 + +minutes * 60
  }
  return totalSeconds
}

const clockToSeconds = time => {
  const splited = time.split(' ')
  const seconds = timeToSeconds(splited[0])
  let total = 0

  if (splited[1] === 'am') {
    total = seconds
  } else if (splited[1] === 'pm') {
    total = seconds + 12 * 60 * 60
  } else {
    total = seconds
  }
  return total
}

const secondsToTimeWithDisplay = second => {
  let d = Number(second)
  let h = Math.floor(d / 3600)
  let m = Math.floor((d % 3600) / 60)
  let s = Math.floor((d % 3600) % 60)

  let hDisplay = h > 0 ? h + (h === 1 ? ' hour ' : ' hours ') : ''
  let mDisplay = m > 0 ? m + (m === 1 ? ' minute ' : ' minutes ') : ''
  let sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : ''
  return hDisplay + mDisplay + sDisplay
}

module.exports = {
  clockToSeconds,
  secondsToTimeWithDisplay,
  timeToSeconds
}
