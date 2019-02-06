export class User {
  id: string;
  userID: string;
  userName: string;
  userPassword: string;
  token: string;

  constructor(user: User = {} as User) {
    let {
      id = null,
      userID = '',
      userName = '',
      userPassword = '',
      token = ''
    } = user;

    this.id = id;
    this.userID = userID;
    this.userName = userName;
    this.userPassword = userPassword;
    this.token = token;
  }
}
