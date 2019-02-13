export class User {
  id: string;
  userID: string;
  userName: string;
  userPassword: string;
  userDesc: string;
  token: string;

  constructor(user: any = {} as User) {
    let {
      id = null,
      userID = '',
      userName = '',
      userPassword = '',
      userDesc = '',
      token = ''
    } = user;

    this.id = id;
    this.userID = userID;
    this.userName = userName;
    this.userPassword = userPassword;
    this.userDesc = userDesc;
    this.token = token;
  }
}
