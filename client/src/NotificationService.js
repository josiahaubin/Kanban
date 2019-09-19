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
          confirmButton: 'btn btn-success ml-5',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        width: 600,
        padding: '3em',
        background: '#fff url(/images/trees.png)',
        backdrop: `
    rgba(0,0,123,0.4)
    url("https://media.giphy.com/media/m2Q7FEc0bEr4I/giphy.gif")
    center left
    no-repeat
  `,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,

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

  static confirmLogout() {
    return new Promise((resolve, reject) => {
      const swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ml-5',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to log out?',
        text: "You won't be able to revert this!",
        type: 'warning',
        width: 600,
        padding: '3em',
        background: '#fff url(/images/trees.png)',
        backdrop: `
    rgba(0,0,123,0.4)
    url("https://media.giphy.com/media/3o7aTskHEUdgCQAXde/giphy.gif")
    center left
    no-repeat
  `,
        showCancelButton: true,
        confirmButtonText: 'Yes, Logout!',
        cancelButtonText: 'No, Stay here!',
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'You have been logged out.',
          )
          resolve(true)
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'You are still logged in',
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