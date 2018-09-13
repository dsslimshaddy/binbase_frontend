import * as React from 'react';
import { observer, inject } from 'mobx-react';

//@ts-ignore
import { TabContainer, Fa, FaDiv, Avatar, Div, Span, AButton, Link, TextField } from 'app/components';
import * as styles from './style.css';
import * as stylesg from '../../style.css';
import * as cx from 'classnames';
import { compose } from 'recompose';
import { StyleRules, Theme, withStyles } from '@material-ui/core/styles';



const styleSheet = (theme: Theme): StyleRules => ({
  root: {
    maxWidth: "275px",
  },
  bootstrapRoot: {
    margin: 4,
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    border: '0px',
    outline: 'none',
    fontSize: 13,
    padding: '4px 8px',
    width: 'calc(100% - 24px)',
    '&:focus': {
      outline: 'none',
      borderColor: theme.palette.primary.main,
    },
  },
  textInputDiv: {
    borderRadius: 0,
    backgroundColor: 'rgb(29, 29, 29)',
    border: '1px solid rgb(51, 51, 51)',
    outline: 'none',
    fontSize: 13,
    width: 'calc(100% - 24px)',
    padding: '0px',
    '&:focus': {
      outline: 'none',
      borderColor: theme.palette.primary.main,
    },
  },
  textTicker: {
    color: "#4a4545",
    paddingRight: "8px"
  }
});

@compose(withStyles(styleSheet))
@inject('exchangeStore')
@observer
class Sell extends React.Component<any, any>{
  render(){
    const { kind, classes, exchangeStore } = this.props;
    const { sf_stop, sf_total, sf_price, sf_amount, rel, base, balance  } = exchangeStore;

    return (
      <FaDiv fs className={cx(stylesg.mar_20,classes.root)} c>
        <FaDiv vcenter>
          <Fa className={cx(styles.bid_head)} fs>Sell {rel}</Fa>
          <Fa>{balance[rel] || 0} {rel}</Fa>
        </FaDiv>
       { kind == "stop" &&
        <FaDiv vcenter>
          <Fa fs className={cx(styles.bid_label)}>Stop At</Fa>
          <FaDiv vcenter className={cx(classes.textInputDiv)}>
              <Fa fs><TextField
                  value={sf_stop}
                  onChange={(e)=>{ exchangeStore.setStopS(e.target.value) }}
                  type="text"
                  fullWidth
            InputProps={{
              disableUnderline: true,
              classes: {
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput,
            },
          }}              
                /></Fa>
            <Fa className={cx(classes.textTicker)}>{base}</Fa>
          </FaDiv>
        </FaDiv>
      }        
        <FaDiv vcenter>
          <Fa fs className={cx(styles.bid_label)}>Price</Fa>
          <FaDiv vcenter className={cx(classes.textInputDiv)}>
              <Fa fs><TextField
                  value={kind == "market" ? "Market Price" : sf_price}
                  onChange={(e)=>{ exchangeStore.setPriceS(e.target.value) }}
                  type="text"
                  fullWidth
                  disabled={kind == "market"}
            InputProps={{
              disableUnderline: true,
              classes: {
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput,
            },
          }}              
                /></Fa>
            <Fa className={cx(classes.textTicker)}>{base}</Fa>
          </FaDiv>
        </FaDiv>
        <FaDiv vcenter>
          <Fa fs className={cx(styles.bid_label)}>Amount</Fa>
            <FaDiv vcenter className={cx(classes.textInputDiv)}>
                <Fa fs><TextField
                    value={sf_amount}
                    onChange={(e)=>{ exchangeStore.setAmountS(e.target.value) }}
                    type="text"
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                      classes: {
                      root: classes.bootstrapRoot,
                      input: classes.bootstrapInput,
                    },
                  }}              
                  /></Fa>
              <Fa className={cx(classes.textTicker)}>{rel}</Fa>
            </FaDiv>

        </FaDiv>
        <FaDiv>
          <Fa className={cx(styles.bid_label,styles.bid_label_empty)}></Fa>
          <FaDiv fs>
            <Fa onClick={()=>{ exchangeStore.setTotalSP(25) }} className={cx(styles.sorter)}>25%</Fa>
            <Fa onClick={()=>{ exchangeStore.setTotalSP(50) }} className={cx(styles.sorter)}>50%</Fa>
            <Fa onClick={()=>{ exchangeStore.setTotalSP(75) }} className={cx(styles.sorter)}>75%</Fa>
            <Fa onClick={()=>{ exchangeStore.setTotalSP(100) }} className={cx(styles.sorter)}>100%</Fa>
          </FaDiv>
        </FaDiv>

        {
          kind != "market" &&
            <FaDiv vcenter>
              <Fa fs className={cx(styles.bid_label)}>Total</Fa>
              <FaDiv vcenter className={cx(classes.textInputDiv)}>
                <Fa fs>
                <TextField
                    value={sf_total}
                    type="text"
                    fullWidth
                    onChange={(e)=>{ 
                      exchangeStore.setTotalS(e.target.value)
                    }}
                    InputProps={{
                      disableUnderline: true,
                      classes: {
                      root: classes.bootstrapRoot,
                      input: classes.bootstrapInput,
                    },
                  }}              
                /></Fa>
                <Fa className={cx(classes.textTicker)}>{base}</Fa>
             </FaDiv>
            </FaDiv>
        }
        
        <FaDiv>
          <AButton
            type="button"
            className={cx(stylesg.pad_20, stylesg.mar_20_0)}
            color="secondary"
            variant="contained"
            fullWidth >Sell {rel}</AButton>
        </FaDiv>

      </FaDiv>

  )
  }
}
export default Sell;