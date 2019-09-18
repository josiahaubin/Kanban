import swal from 'sweetalert2'
export default class NotificationService {
  static toast(text = "", title = text, timer = 5500) {
    swal.fire({
      title,
      type: "success",
      timer,
      showConfirmButton: false,
      position: "top-right",
      toast: true
    });
  }

  static toastError(error) {
    if (error.isAxiosError) {
      error.message = error.response.data
    }

    swal.fire({
      title: "A Notification",
      text: error.message,
      type: "error",
      timer: 8500,
      showConfirmButton: false,
      position: "top-right",
      toast: true
    });
  }
}