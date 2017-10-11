export class User {
  name:string;
  email:string;
  password:string;
  code:string;
  
  constructor(name:string, email:string, password:string, code?:string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.code = code;
  }
}