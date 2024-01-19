export interface UserService {
    loginUser(output: { username: string; password: string }): Promise<{ username:string }>
    getUserByEmail(email: string): Promise<any>
    saveUser(output: {
        email: string,
        username: string,
        hashed: string,
        is_admin: boolean
      }): Promise<void>
 



    // clientName (output:{ username:string;}):Promise<{ username:string}>


}