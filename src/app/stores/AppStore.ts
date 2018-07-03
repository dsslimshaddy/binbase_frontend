import { observable, action } from 'mobx';
export class AppStore {
  constructor(theme = 0) {
    this.theme = theme;
  }

  @observable public theme: number;

  @action
  setTheme = (theme: number): void => {
    this.theme = theme;
  };
}

export default AppStore;
