import { observable, action } from 'mobx';


import enUS from "../language/en";

export class LangStore {
  @observable public lang: string;

  constructor(lang = 'en') {
    this.lang = lang;
  }
  getW = (resource: string): string => {
  	let language;
  	switch(this.lang){
  		case 'en':
  			language = enUS;
  		break;
  	}
  	if (resource.indexOf(".") !== -1) {
	  	return language[resource.split(".")[0]][resource.split(".")[1]];
	}else{
		return language[resource];
	}
  }
  @action
  changeLanguage = (lang: string): void => {
    this.lang = lang;
  };
}

export default LangStore;
