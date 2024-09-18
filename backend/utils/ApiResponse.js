class ApiResponse{
    
    constructor(status,data,message="Success"){
        this.message=message,
        this.sucess=status<400,
        this.data=data,
        this.status=status
      }
}

export {ApiResponse};


