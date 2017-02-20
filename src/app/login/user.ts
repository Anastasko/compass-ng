export class User {
  id?: string;
  token?: string;
  username?: string;
  password?: string;

  constructor(o : any){
      this.id = o.id;
      this.token = o.token;
      this.username = o.username;
      this.password = o.password;
  }
}