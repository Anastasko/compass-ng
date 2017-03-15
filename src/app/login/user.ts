import { Entity } from "../common/model/entity";
export class User extends Entity {

  token?: string;
  username?: string;
  password?: string;

  constructor(o: any) {
    super(o);
    this.token = o.token;
    this.username = o.username;
    this.password = o.password;
  }
}
