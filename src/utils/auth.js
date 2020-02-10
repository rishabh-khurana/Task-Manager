class Auth{
    constructor(){
        this.authenticated=false
        this.userName=''
    }
    login(cb){
        this.authenticated=true
        cb()
    }
    logout(cb){
        this.authenticated=false
        this.userName=''
        cb()
    }
    isAuthenticated(){
        return this.authenticated
    }
    setUserDetails(name){
        this.userName=name
    }
    getUserDetails(){
        return this.userName
    }
}

export default new Auth();