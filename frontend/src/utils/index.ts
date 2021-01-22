import Swal from 'sweetalert2'

const error = (msg: string) => {
  return Swal.mixin({
    toast: true,
    position: "top-end",
    timer: 3000,
    showConfirmButton: false,
    icon: "error",
    title: msg,
    showClass: {
      popup: "animate__animated animate__slideInRight"
    },
    hideClass: {
      popup: "animate__animated animate__slideOutRight"
    },
    customClass: {
      popup: "notification-danger",
      title: "text-danger"
    }
  }).fire()
}

const success = (msg: string) => {
  return Swal.mixin({
    toast: true,
    position: "top-end",
    timer: 3000,
    showConfirmButton: false,
    icon: "success",
    title: msg,
    showClass: {
      popup: "animate__animated animate__slideInRight"
    },
    hideClass: {
      popup: "animate__animated animate__slideOutRight"
    },
    customClass: {
      popup: "notification-success",
      title: "text-success"
    }
  }).fire()
}

export { error, success }