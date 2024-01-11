import { compare, hash } from "bcryptjs"
import * as bcrypt from "bcryptjs"


const ROUND = 12

// beenotung
export function hashPassword(password:string):Promise<string>{
    return hash(password, ROUND)
}

// doctor Adam 
export async function hashedPassword(plainPassword:string){
    const hash: string = await bcrypt.hash(plainPassword, ROUND);
    return hash;
}

export function comparePassword (options:{
    password:string
    password_hash:string
}):Promise<boolean>{
    return compare(options.password, options.password_hash)
}

export async function checkPassword(options:{
    plainPassword: string;
    hashedPassword: string;
}){
    const isMatched:boolean = await bcrypt.compare(
        options.plainPassword,
        options.hashedPassword
    );
    return isMatched;
}