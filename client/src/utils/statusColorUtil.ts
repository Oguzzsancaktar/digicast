import colors from '@/constants/colors'
import { EActivity, EStatus, ETaskStatus } from '@/models'

export const selectColorForStatus = (status: number) => {
  let color = colors.white.bg

  if (status === EStatus.Active) {
    return (color = colors.green.primary)
  }

  if (status === EStatus.Inactive) {
    return (color = colors.gray.primary)
  }

  if (status === ETaskStatus.Completed) {
    return (color = colors.green.primary)
  }

  if (status === ETaskStatus.Canceled) {
    return (color = colors.red.primary)
  }

  if (status === ETaskStatus.Not_Started) {
    return (color = colors.gray.primary)
  }

  if (status === ETaskStatus.Progress) {
    return (color = colors.blue.primary)
  }

  return color
}

export const selectColorForTaskStatus = (status: number) => {
  let color = colors.white.bg

  if (status === ETaskStatus.Completed) {
    return (color = colors.green.primary)
  }

  if (status === ETaskStatus.Canceled) {
    return (color = colors.red.primary)
  }

  if (status === ETaskStatus.Not_Started) {
    return (color = colors.gray.primary)
  }

  if (status === ETaskStatus.Progress) {
    return (color = colors.blue.primary)
  }

  return color
}

export const selectColorForActivityType = (status: number) => {
  let color = colors.white.bg

  if (status === EActivity.NORMAL_NOTE) {
    return (color = colors.indigo.primary)
  }

  if (status === EActivity.TASK_CANCELED) {
    return (color = colors.red.primary)
  }

  if (status === EActivity.TASK_CHECKLIST_CHECKED) {
    return (color = colors.blue.primary)
  }

  if (status === EActivity.TASK_FINISHED) {
    return (color = colors.green.primary)
  }

  if (status === EActivity.TASK_POSTPONED) {
    return (color = colors.orange.primary)
  }

  if (status === EActivity.TASK_RESPONSIBLE_CHANGED) {
    return (color = colors.purple.primary)
  }

  if (status === EActivity.TASK_STARTED) {
    return (color = colors.pink.primary)
  }

  return color
}
