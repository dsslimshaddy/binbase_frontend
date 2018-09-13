import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { TextField, FaDiv, Div } from 'app/components';
import { Input, FormControl, InputLabel, MenuItem, Select, Paper, Typography } from '@material-ui/core';

//import * as styles from '../../style.css';
import * as stylesg from '../../style.css';
import * as cx from 'classnames';
import { compose } from 'recompose';
import { StyleRules, Theme, withStyles } from '@material-ui/core/styles';


const styleSheet = (theme: Theme): StyleRules => ({
  root: {
  },
  formControl: {
    minWidth: "100%",
    margin: "10px 0",
  },
});
const coins = [
  {name: "Ethereum", ticker: "ETH"},
  {name: "Bitcoin", ticker: "BTC"},
 ];
@compose(withStyles(styleSheet))
@inject('langStore','loginStore')
@observer
class Deposit extends React.Component<any, any>{
  state = {
    coinIndex: 0,
    depositAddress: "",
  };
  render(){
    const {classes} = this.props;
    const {coinIndex, depositAddress} = this.state;
  	return (
  			<FaDiv>
  				<Paper className={cx(stylesg.mar_20,stylesg.fs,stylesg.pad_20)}>
			        <Typography variant="headline" component="h3">Deposit Assets</Typography>


              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="coinIndex">Select a coin to deposit</InputLabel>
                <Select
                  value={this.state.coinIndex}
                  onChange={(e)=>{  this.setState({ coinIndex: e.target.value }) }}
                  input={<Input id="coinIndex" />}             
                >
                {coins.map( (o, i) =>{
                  return (<MenuItem key={i} value={i+1}>{o.name} - {o.ticker}</MenuItem>)
                })}
              </Select>                
             </FormControl>                
             {coinIndex > 0 && 
               <Div>
              <TextField
                className={cx(stylesg.mar_20_0)}
                value={depositAddress}
                label={`${coins[coinIndex-1].name} Deposit Address`}
                type="text"
                disabled
                fullWidth />                 
               </Div>
             }

  				</Paper>
  				<Paper className={cx(stylesg.mar_20,stylesg.fs,stylesg.pad_20)}>
			        <Typography variant="headline" component="h3">Deposits History</Typography>
  				</Paper>
  			</FaDiv>
  		)
  }
}
export default Deposit;