import { toast } from 'react-toastify'

export const toastError = (msg: string) => {
  toast.error(msg ? msg : 'Something went wrong danger', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}

export const toastWarning = (msg: string) => {
  toast.warn(msg ? msg : 'Something went wrong warn', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    icon: false
  })
}

export const toastSuccess = (msg: string) => {
  toast.success(msg ? msg : 'Success', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}
