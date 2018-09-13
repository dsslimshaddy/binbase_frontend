import { observable, action } from 'mobx';
import { pair_decimals } from 'app/constants';

export class ExchangeStore {
  @observable balance = {};
  @observable base = "";
  @observable rel = "";

  @observable bf_price = "";
  @observable bf_stop = "";
  @observable bf_amount = "";
  @observable bf_total = "";
  
  @observable sf_price = "";
  @observable sf_amount = "";
  @observable sf_stop = "";
  @observable sf_total = "";
  
  @observable decimals = 8;

  @observable sorter = {value: 0, dir: 1};
  @observable currency = [
    {base: "BTC", name: "Bitcoin", index: 1, rel: [
      {ticker: "ETH",index: 1, vol: 4050, priceusd: 463.24, price: 0.00014, last_price: 0.0014, change: -2.3},
      {ticker: "LTC",index: 2, vol: 50, priceusd: 102.24, price: 0.00006, last_price: 0.00004, change: 4.3},
    ]},
    {base: "ETH", name: "Ethereum", index: 2, rel: [
      {ticker: "OMG",index: 1, vol: 1050, priceusd: 10.12, price: 0.01434, last_price: 0.00013, change: 140}
    ]}
  ];

  @action
  toggleSort = (value) => {  
    if(value == this.sorter.value){
      this.sorter = {value, dir: +!this.sorter.dir};
    }else{
      this.sorter = {value, dir: this.sorter.dir};
    }
  };

  @action 
  setBase = (base) => {
    this.base = base;
  }
  @action 
  setRel = (rel) => {
    this.rel = rel;
  }

  @action 
  setPriceB = (price) => {
    this.bf_price = price;
    //@ts-ignore
    this.bf_total = (price * this.bf_amount).toFixed(this.decimals);
  }

  @action 
  setAmountB = (amount) => {
    this.bf_amount = amount;
    
    //@ts-ignore
    this.bf_total = (this.bf_price * amount).toFixed(this.decimals);
  }

  @action 
  setTotalB = (total) => {
    this.bf_total = total;

    //@ts-ignore
    this.bf_amount = (total / this.bf_price).toFixed(pair_decimals[this.base][this.rel] || 0);
  }

  @action 
  setStopB = (stop) => {
    this.bf_stop = stop;
  }

  @action 
  setTotalBP = (percent) => {
    this.bf_total = (percent/100* (this.balance[this.base] || 0) ).toFixed(this.decimals);

    //@ts-ignore
    this.bf_amount = (this.bf_total / this.bf_price).toFixed(pair_decimals[this.base][this.rel] || 0);
  }

  @action 
  setPriceS = (price) => {
    this.sf_price = price;
    //@ts-ignore
    this.sf_total = (price * this.sf_amount).toFixed(this.decimals);
  }

  @action 
  setAmountS = (amount) => {
    this.sf_amount = amount;
    
    //@ts-ignore
    this.sf_total = (this.sf_price * amount).toFixed(this.decimals);
  }

  @action 
  setTotalS = (total) => {
    this.sf_total = total;

    //@ts-ignore
    this.sf_amount = (total / this.sf_price||0).toFixed(pair_decimals[this.base][this.rel] || 0);
  }

  @action 
  setStopS = (stop) => {
    this.sf_stop = stop;
  }

  @action 
  setTotalSP = (percent) => {
    this.sf_total = (percent/100* (this.balance[this.base] || 0) ).toFixed(this.decimals);

    //@ts-ignore
    this.sf_amount = (this.sf_total / this.sf_price).toFixed(pair_decimals[this.base][this.rel] || 0);
  }
}

export default ExchangeStore;
