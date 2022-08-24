export const secondsToTimeWithDisplay = second => {
  let d = Number(second)
  var h = Math.floor(d / 3600)
  var m = Math.floor((d % 3600) / 60)
  var s = Math.floor((d % 3600) % 60)

  var hDisplay = h > 0 ? h + (h === 1 ? ' hour ' : ' hours ') : ''
  var mDisplay = m > 0 ? m + (m === 1 ? ' minute ' : ' minutes ') : ''
  var sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : ''
  return hDisplay + mDisplay + sDisplay
}

export const secondsToHourMin = (seconds: number, showSecond: boolean = false) => {
  let d = Number(seconds)
  var h: string | number = Math.floor(d / 3600)
  var m: string | number = Math.floor((d % 3600) / 60)
  var s: string | number = Math.floor((d % 3600) % 60)
  let output = '--00:00:00'

  if (h.toString().split('').length === 1) {
    h = '0' + h
  }
  if (m.toString().split('').length === 1) {
    m = '0' + m
  }

  if (s.toString().split('').length === 1) {
    s = '0' + s
  }

  if (showSecond) {
    output = h + ':' + m + ':' + s
  } else {
    output = h + ':' + m + ' '
  }

  return output
}

export const secondsToTimeString = (seconds: number) => {
  let d = Number(seconds)
  var h: string | number = Math.floor(d / 3600)
  var m: string | number = Math.floor((d % 3600) / 60)
  var s: string | number = Math.floor((d % 3600) % 60)
  var amPm = 'am'
  let output = '--00:00:00'

  if (h >= 12) {
    amPm = 'pm'
    h = h - 12
  }

  if (s > 0) {
    if (h.toString().split('').length === 1) {
      h = '0' + h
    }
    if (m.toString().split('').length === 1) {
      m = '0' + m
    }
    if (s.toString().split('').length === 1) {
      s = '0' + s
    }
    output = h + ':' + m + ':' + s + amPm
  } else {
    if (h.toString().split('').length === 1) {
      h = '0' + h
    }
    if (m.toString().split('').length === 1) {
      m = '0' + m
    }

    output = h + ':' + m + ' ' + amPm
  }
  return output
}

export const timeToSeconds = (time: string) => {
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

export const clockToSeconds = (time: string) => {
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
