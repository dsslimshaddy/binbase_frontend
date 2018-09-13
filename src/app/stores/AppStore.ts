import { observable, action } from 'mobx';
import { USER_LIST, AUTH_TOKEN} from 'app/constants';


const removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

export class AppStore {
  @observable theme: number;
  @observable is_authenticated: boolean;
  @observable user;
  @observable users = [];

  constructor(theme = 0) {
    this.theme = theme;
    this.is_authenticated = !!localStorage.getItem(AUTH_TOKEN);
    if(this.is_authenticated){
    	this.users = JSON.parse(localStorage.getItem(USER_LIST));
    	this.user = this.users[0];
    }
  }
  @action
  setTheme = (theme: number): void => {
    this.theme = theme;
  };

  @action
  authenticate = (s = true) => {
    this.is_authenticated = s;
  };

  @action
  setUser = (user) => {
    this.user = user;
  };

  @action
  setUsers = (users) => {
    this.users = users;
  };


  @action
  addUser = (user) => {
    let u = this.users;
    u.unshift(user);
    u = removeDuplicates(u,"id");
    this.users = u;
    localStorage.setItem(USER_LIST, JSON.stringify(this.users));
  };
}

export default AppStore;
