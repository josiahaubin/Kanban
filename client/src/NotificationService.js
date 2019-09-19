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



  static confirmDelete() {

    return new Promise((resolve, reject) => {
      const swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })




      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'

          )
          resolve(true)
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
          resolve(false)
        }
        resolve(false)
      })
    })

  }

  // static confirmDelete(Boolean) {
  //   swal({
  //     title: "Are you sure?",
  //     text: "Once deleted, you will not be able to recover this comment!",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true
  //   }).then(willDelete => {

  //     if (Boolean == true) {
  //       swal("Poof! Your comment has been deleted!", {
  //         icon: "success"
  //       });
  //     } else {
  //       swal("Your comment has not been deleted!");
  //     }
  //   }
  //   )
  // }
}