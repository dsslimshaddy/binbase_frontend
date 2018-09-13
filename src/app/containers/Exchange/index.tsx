import * as React from 'react';
import { observer, inject } from 'mobx-react';

//@ts-ignore
import { TabContainer, Fa, FaDiv, Avatar, Div, Span, AButton, Link, TextField } from 'app/components';
import { Tab, Tabs, Icon } from '@material-ui/core';
import * as styles from './style.css';
import * as stylesg from '../../style.css';
import * as cx from 'classnames';
import { compose } from 'recompose';
import { StyleRules, Theme, withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';

import Buy from './buy';
import Sell from './sell';


const styleSheet = (theme: Theme): StyleRules => ({
  root: {
    flexGrow: 1,
  },
  tabsRoot: {},
  tabsIndicator: {
    backgroundColor: 'transparent',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    flex: '0 1 auto',
    background: '#1D1D1D',
    '&:hover': {
      color: '#FFF',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#FFF',
      background: 'rgb(38, 38, 38)',
    },
    '&:focus': {
      color: '#FFF',
    },
  },
  tabcontainer: {
    background: 'rgb(38, 38, 38)',
  },
  tabSelected: {},
});
const maxWidths = {
  "BTC": 0.5,
  "ETH": 4,
  "USDT": 3000,
};
const normalizeWidth = (width) => {
  const max = 100;
  const min = 15;
  if(width > max){
    return max;
  }else if(width < min){
    return min + width;
  }
  return width;
}
const sell_orderbook = [
  {price: 0.00016996, amount: 13},
  {price: 0.00016994, amount: 1463},
  {price: 0.00016990, amount: 14},
];
const buy_orderbook = [
  {price: 0.00016996, amount: 1434},
  {price: 0.00016994, amount: 865},
  {price: 0.00016990, amount: 245645},
];
const base = "BTC";
const rel = "GTO";
const decimals = 8;
const price = 0.00016993;
const last_price = 0.00016994;
const price_usd = 1.21;
const usd_symbol = "$";

const dim = (price) => {
  price = price.toFixed(decimals).toString();
  if(price.substr(-1) != "0"){ 
    return (
      <Span>
        <Span className={cx(styles.dim)}>{price.substr(0,price.length-2)}</Span>
        <Span>{price.substr(-2)}</Span>
      </Span>
   );
  }else{
    return price;
  }
}
const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
@compose(withStyles(styleSheet))
@inject('langStore','exchangeStore')
@observer
class Exchange extends React.Component<any, any>{
  state = {
    bidbox_tab: 0,
  }
  componentDidMount(){
    const { exchangeStore } = this.props;
    const regex2 = /^\/exchange\/(\w{5,12})/;
    const str = window.location.pathname;
    let m;

    if((m = regex2.exec(str)) !== null){
      const _base = m[1].split("_")[0].toUpperCase();
      const _rel = m[1].split("_")[1].toUpperCase();
      
      exchangeStore.setBase(_base);
      exchangeStore.setRel(_rel);
    }    
  }
  handleChangeIndex = index => {
    this.setState({ bidbox_tab: index });
  };
  handleChange = (event, value) => {
    this.setState({ bidbox_tab: value });
  };
  render(){
    const { classes, exchangeStore } = this.props;

  	return (
  		<FaDiv>
  			<FaDiv c className={cx(styles.orderbook)}>
          <FaDiv className={cx(styles.orderbook_header)}>
            <FaDiv button fs vcenter className={cx(styles.pricesz,styles.sorter)}><Fa fs>Price({base})</Fa></FaDiv>
            <FaDiv button fs vcenter className={cx(styles.amountsz,styles.sorter)}><Fa fs tcenter>Amount({rel})</Fa></FaDiv>
            <FaDiv button fs vcenter className={cx(styles.totalsz,styles.sorter)}><Fa fs tcenter>Total({base})</Fa></FaDiv>
          </FaDiv>
          
          <FaDiv fs c className={cx(styles.orderbook_body)}>
            <FaDiv fs c className={cx(styles.orderbook_sell)}>
              {sell_orderbook.map( (o, i)=>{
                return (
                  <FaDiv key={i} className={cx(styles.sell)} onClick={()=>{ 
                    
                    exchangeStore.setPriceB(o.price);
                    exchangeStore.setPriceS(o.price);
                    
                    exchangeStore.setAmountB(o.amount);
                    exchangeStore.setAmountS(o.amount);

                   }}>
                    <Div style={{width: `${normalizeWidth((o.price*o.amount)/maxWidths[base]*100)}%`}} className={cx(styles.bg)}></Div>
                    <FaDiv fs className={cx(styles.bsz)}>
                      <Fa fs className={cx(styles.pricesz,styles.price)}>{dim(o.price)}</Fa>
                      <Fa fs tcenter className={cx(styles.amountsz)}>{numberWithCommas(o.amount)}</Fa>
                      <Fa fs tr className={cx(styles.totalsz)}>{(o.price*o.amount).toFixed(decimals)}</Fa>
                    </FaDiv>
                  </FaDiv>
                  )
              })}
            </FaDiv>
            <FaDiv vcenter className={cx(styles.midprice_box)}>
              <FaDiv vcenter fs className={cx(
                styles.midprice
                ,{[styles.midprice_green]: price>last_price}
                ,{[styles.midprice_red]: price<last_price}
                )}><Fa fs className={cx(styles.midprice_span)}>{price}</Fa>
                  {price>last_price && <Icon>arrow_drop_up</Icon>}
                  {price<last_price && <Icon>arrow_drop_down</Icon>}
                </FaDiv>
              <Fa fs className={cx(styles.midprice_usd)}><Span>{usd_symbol}</Span>{price_usd}</Fa>
            </FaDiv>
            <FaDiv fs c className={cx(styles.orderbook_buy)}>
              {buy_orderbook.map( (o, i)=>{
                return (
                  <FaDiv key={i} className={cx(styles.buy)} onClick={()=>{ 
                    
                    exchangeStore.setPriceB(o.price);
                    exchangeStore.setPriceS(o.price);
                    
                    exchangeStore.setAmountB(o.amount);
                    exchangeStore.setAmountS(o.amount);

                   }}>
                    <Div style={{width: `${normalizeWidth((o.price*o.amount)/maxWidths[base]*100)}%`}} className={cx(styles.bg)}></Div>
                    <FaDiv fs className={cx(styles.bsz)}>
                      <Fa fs className={cx(styles.pricesz,styles.price)}>{dim(o.price)}</Fa>
                      <Fa fs tcenter className={cx(styles.amountsz)}>{numberWithCommas(o.amount)}</Fa>
                      <Fa fs tr className={cx(styles.totalsz)}>{(o.price*o.amount).toFixed(decimals)}</Fa>
                    </FaDiv>
                  </FaDiv>
                  )
              })}
            </FaDiv>
          </FaDiv>

        </FaDiv>
        <FaDiv c className={cx(styles.chart_bid)}>
        <FaDiv c>
          <FaDiv c className={cx(styles.chart)}>
            <FaDiv className={cx(styles.chart_header)}>
              <FaDiv fs>
                <Fa className={cx(styles.sorter)}>Time</Fa>
                <Fa className={cx(styles.sorter)}>M</Fa>
                <Fa className={cx(styles.sorter)}>H</Fa>
                <Fa className={cx(styles.sorter)}>1D</Fa>
                <Fa className={cx(styles.sorter)}>1W</Fa>
                <Fa className={cx(styles.sorter)}>1M</Fa>
                <Fa className={cx(styles.sorter)}>1Y</Fa>
              </FaDiv>
              <FaDiv>
                <Fa className={cx(styles.sorter)}>TradingView</Fa>
                <Fa className={cx(styles.sorter)}>Depth</Fa>
              </FaDiv>
            </FaDiv>
            <FaDiv fs className={cx(styles.chart_body)}></FaDiv>
          </FaDiv>
  			</FaDiv>

        <FaDiv c className={cx(styles.bid_box,stylesg.mar_20_0)}>

            <Div className={cx(classes.root)}>
              <Tabs
                value={this.state.bidbox_tab}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
                classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
              >
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Limit" />
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Market" />
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Stop Limits" />
              </Tabs>
            </Div>
            <SwipeableViews
              axis={'x'}
              index={this.state.bidbox_tab}
              onChangeIndex={this.handleChangeIndex}
              animateHeight={true}
            >
              <TabContainer className={cx(classes.tabcontainer)} swipeableHeight="300px">
                <FaDiv>
                  <Buy />
                  <Sell />
                </FaDiv>
              </TabContainer>
              <TabContainer className={cx(classes.tabcontainer)} swipeableHeight="300px">
                <FaDiv>
                  <Buy kind="market" />
                  <Sell kind="market" />
                </FaDiv>
              </TabContainer>
              <TabContainer className={cx(classes.tabcontainer)} swipeableHeight="300px">
                <FaDiv>
                  <Buy kind="stop" />
                  <Sell kind="stop" />
                </FaDiv>
              </TabContainer>
            </SwipeableViews>

       </FaDiv>        
    </FaDiv>        
	</FaDiv>
	)
  }
}
export default Exchange;