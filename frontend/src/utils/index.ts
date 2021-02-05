import Swal, { SweetAlertIcon } from 'sweetalert2'

export const confirmation = (title: string, text: string, confirm: string, cancel: string) => {
  return Swal.fire({
    title,
    text,
    confirmButtonText: confirm,
    cancelButtonText: cancel,
    icon: 'warning',
    showCancelButton: true,
    showClass: {
      popup: "animate__animated animate__fadeInLeftBig"
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutLeftBig"
    },
    confirmButtonColor: "#1d6f42",
    cancelButtonColor: "#c0392b",
    customClass: {
      popup: 'notification-warning',
      title: 'title-warning',
      confirmButton: 'outline-none',
      cancelButton: 'outline-none'
    },
  })
}

export const notification = (className: 'success' | 'danger', icon: SweetAlertIcon, title: string) => {
  return Swal.mixin({
    toast: true,
    position: "top-end",
    timer: 3000,
    showConfirmButton: false,
    showClass: {
      popup: "animate__animated animate__slideInRight"
    },
    hideClass: {
      popup: "animate__animated animate__slideOutRight"
    },
    customClass: {
      popup: `notification-${className}`,
      title: `title-${className}`
    },
  }).fire(title, undefined, icon)
}