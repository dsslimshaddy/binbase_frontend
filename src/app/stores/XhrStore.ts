import { observable } from 'mobx';
import axios from 'axios';
const SERVER_URL = 'http://0.0.0.0:4000/api';
export class XhrStore {
  @observable public axios;
  
  constructor() {
	//this.axios = axios;
  }

  getU = ({ errorStore, langStore }, url, callback=()=>{},doResolve = true) => {
	  return new Promise((resolve, reject) => {
	    axios.get(SERVER_URL + url)
	    .then(response => {
	      if(doResolve){
	        resolve();
	        //@ts-ignore
	        callback(response);
	      }else{
	      	//@ts-ignore
	        callback(response, resolve);
	      }
	    })
	    .catch( (err) => {
	          //let code = 0;
	      	  //@ts-ignore
	          if(!err.code){
	          	 return false
	          }
	      	  //@ts-ignore
	          let code = err.code;
	          errorStore.setErrorParams(langStore.getE(code));
	          errorStore.activateError({code : code})
	          resolve();
	      });
	  });
  }
}

export default XhrStore;
