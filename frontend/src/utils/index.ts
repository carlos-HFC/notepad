import Swal, { SweetAlertIcon } from 'sweetalert2'

const notification = (className: 'success' | 'danger', icon: SweetAlertIcon, title: string) => {
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

export { notification }