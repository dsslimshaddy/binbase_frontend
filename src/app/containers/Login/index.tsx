import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { Div, Span, AButton, Link, TextField } from 'app/components';
import SwipeableViews from 'react-swipeable-views';

//import { saveToken } from 'shared/utils/auth.js';
import * as styles from '../../style.css';
import * as cx from 'classnames';
import { compose } from 'recompose';

import { Avatar, Icon, List, Paper, Typography } from '@material-ui/core';
import { ListItem, ListItemText } from 'app/components';
import { StyleRules, Theme, withStyles } from '@material-ui/core/styles';
import { AUTH_TOKEN, USER_LIST, BG_URL , HASH } from 'app/constants';

const swipeableHeight = '240px';
const TabContainer = (props: TabContainerProps) =>
  (<Div style={{minHeight: swipeableHeight}}>
    {props.children}
  </Div>)

interface TabContainerProps {
  children: React.ReactNode,
}

//import { SignupForm } from '../Signup';
//import { Avatar } from 'shared';


const styleSheet = (theme: Theme): StyleRules => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '500px',
  },
  center: {
    flexShrink: 0,
    width: '450px',
    position: 'relative',
    padding: '20px',
  },
  paper: {
    background: 'rgba(60, 60, 61, 0.75)',
    position: 'relative',
    zIndex: 10,
    padding: '70px 30px 30px',
  },
  blur: {
    filter: 'blur(10px)',
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#2f3136',
    backgroundSize: 'cover',
    backgroundPosition: '50%',

    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  accountIcon: {
    backgroundColor: 'transparent',
  },
});

@compose(withStyles(styleSheet))
@inject('appStore','langStore','loginStore')
@observer
class Login extends React.Component<any, any>{
  componentDidMount(){
    const { loginStore, appStore } = this.props;
    
    appStore.alien = !localStorage.getItem(AUTH_TOKEN);
    document.body.style.backgroundImage = `url(${BG_URL})`;
    const userList = JSON.parse(localStorage.getItem(USER_LIST));
    if(userList !== false && userList!==null && userList.length > 0){
      loginStore.setValue("userList",JSON.parse(userList));
    }

    if(location.hash.substr(1) == HASH.join){
      loginStore.handleChangeIndex(1);
    }
  }

  getHeader = () => {
    const { langStore, loginStore } = this.props;
    const ret =
    (loginStore.user) ?
    (<Div>
      <Div>
        <Typography variant="headline">
          {`${langStore.getW("hi")}, ${loginStore.user.name.split(" ")[0]}`}
        </Typography>
      </Div>
      <List>
        <ListItem>
          <Avatar src={loginStore.user.pp} />
          <ListItemText primary={loginStore.user.email} />
        </ListItem>
      </List>
    </Div>)
    : (<Typography variant="headline">{langStore.getW("sign_in")}</Typography>);
    return ret;
  }
  render() {
    const { langStore, loginStore, classes } = this.props;
    const { alien, forcedAlien, index, userList } = loginStore;
    const H1 = this.getHeader();
    let out;
    if(forcedAlien || alien || !userList|| userList.length < 1){
      out = (
        <SwipeableViews index={index} /*onChangeIndex={this.handleChangeIndex}*/ animateHeight={true}>
          <TabContainer>
            {H1}
            <LoginForm />
          </TabContainer>
          <TabContainer>
            <Typography variant="headline">{langStore.getW("join")}</Typography>
            {/*<SignupForm />*/}
          </TabContainer>
        </SwipeableViews>
      );
    }else{
      out = (
        <Div>
          <Typography
          className={cx(styles.pad_20)}
          variant="headline">{langStore.getW("choose_account")}</Typography>
          <List
            className={cx(styles.pad_20)}
          >
          {userList.map( (o,i) =>
            {
              return(
                <ListItem
                  key={i}
                  button 
                  onClick={()=>{
                    loginStore.setValue("currentHit", o);
                    loginStore.setValue("forcedAlien", true);
                  }}
                  >
                  <Avatar src={o.pp} />
                  <ListItemText
                    primary={o.name}
                    secondary={o.email}
                    />
                </ListItem>
              )
          }
          )}
          <ListItem
            key={userList.length+1}
            button
            onClick={()=>{
              loginStore.setValue("forcedAlien", true);
              loginStore.setValue("currentHit", null);
            }}
            >
            <Avatar
            className={classes.accountIcon}
            >
              <Icon color="secondary">account_circle</Icon>
            </Avatar>
            <ListItemText primary={langStore.getW("another_account")} />
          </ListItem>
          </List>
        </Div>
      );
    }
    return (
      <Div className={classes.root} >
        <Div className={cx(classes.center)} >
          <Div className={cx(classes.blur)} >
            <Div className={cx(classes.bg)} style={{backgroundImage: `url(${BG_URL})`}}></Div>
          </Div>
            <Paper className={cx(classes.paper)} >{out}</Paper>
          </Div>
        </Div>
    );
  }
}



@inject('errorStore','langStore','loginStore')
@observer
class LoginForm extends React.Component<any, any>{

  state = {
    index: 0,
    emailField: '',
    passwordField: '',
    loginSRC: 'https://cdn.discordapp.com/icons/301788644036050954/9ee2d59ab1c0cb881903da9995ad7ef4.png',
  };
  componentDidMount(){
    const { currentHit } = this.props.loginStore;
      if(currentHit && currentHit.name){
        this.setState({ emailField:  currentHit.email });
        this.handleChangeIndex(1);
      }
   }
  render(){
    const { langStore, loginStore } = this.props;
    const {
      index,
      emailField,
      passwordField,
      //loginSRC,
    } = this.state;
    return(
    <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex} animateHeight={true}>
        <TabContainer>
          <form>
            <TextField
              className={cx(styles.mar_20_0)}
              value={emailField}
              onChange={this.handleEmailField}
              label={langStore.getW("emailphone")}
              type="text"
              fullWidth />
              <Link faded to="/forgot">Forgot Email?</Link>
            <AButton
              onClick={this.handleCheckEmail}
              type="submit"
              className={cx(styles.pad_20, styles.mar_20_0)}
              color="primary"
              fullWidth
              variant="contained" >
              {langStore.getW("next")}
            </AButton>
          </form>
          <Div
            className={cx(styles.mar_20_0)}
            >
            <Span className={cx(styles.hint)}>Need an account? </Span>
            <Link onClick={()=>{ loginStore.handleChangeIndex(1) }} to="/#join">Register Now</Link>
          </Div>
        </TabContainer>
        <TabContainer>
          <form>
            <TextField
              className={cx(styles.mar_20_0)}
              value={passwordField}
              onChange={this.handlePasswordField}
              label={langStore.getW("pass")}
              InputProps={{ placeholder: langStore.getW("pass") }}
              type="password"
              fullWidth />
            <Link faded to="/forgot">Forgot password?</Link>
            <AButton
              onClick={this.handleSignIn}
              className={cx(styles.pad_20,styles.mar_20_0)}
              color="primary"
              type="submit"
              variant="contained"
              fullWidth >
            {langStore.getW("sign_in")}
          </AButton>
         </form>
          <Div>
            <Span className={cx(styles.hint)}>Missed Something? </Span>
            <Link onClick={()=>{ loginStore.setCurrentHit(null); this.handleChangeIndex(0); }} to="/#">Go back</Link>
          </Div>
        </TabContainer>
      </SwipeableViews>
    );
  }
  handleSignIn = () => {
    /*
    return queryGQL(this.props, SignIn, {
      email: this.state.emailField,
      password: this.state.passwordField,
     },(res)=>{
       const { access_token, refresh_token, id } = res;
       saveToken({ access_token, refresh_token });

       const user = Object.assign({},this.props.loginStore.currentHit,{id, access_token, refresh_token});
       this.props.loginStore.addUserList(user);

    });
    */
  }
  handleCheckEmail = () => {
    //const { errorStore, langStore, loginStore } = this.props;
    /*
    return queryGQL(this.props, EmailCheck, {
      email: this.state.emailField,
    },(res)=>{
      this.handleChangeIndex(1);
      this.props.loginStore.currentHit = {
        email: res.email,
        name: res.name,
        pp: res.pp,
      };
      loginStore.setCurrentHit(res);
    });
    */
  }
  handleEmailField = (e) => {
    this.setState({ emailField: e.target.value });
  }
  handlePasswordField = (e) => {
    if(e.keyCode == 13){
      this.handleSignIn();
      return false;
    }
    this.setState({ passwordField: e.target.value });
  }
  handleChangeIndex = (index) => {
    this.setState({ index });
  }
}

export default Login;
