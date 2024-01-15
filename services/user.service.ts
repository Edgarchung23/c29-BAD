export interface UserService {
    loginUser(output: { username: string; password: string }): Promise<{ username:string }>

 



    // clientName (output:{ username:string;}):Promise<{ username:string}>


}