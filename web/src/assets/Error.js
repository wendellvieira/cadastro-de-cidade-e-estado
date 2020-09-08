import Swal from 'sweetalert2'

export default error => {
    error.send_message()
}

export class RequestError {
    constructor(error){
        this.message = error
    }

    send_message(){
        Swal.fire({
            icon: 'error',
            title: "Opps..",
            text: this.message
        })
    }
}