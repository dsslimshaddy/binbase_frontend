import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { TabContainer, Avatar, Div, Span, AButton, Link, TextField } from 'app/components';
import SwipeableViews from 'react-swipeable-views';

import * as styles from '../../style.css';
import * as cx from 'classnames';
import { compose } from 'recompose';

import { Icon, List, Paper, Typography } from '@material-ui/core';
import { ListItem, ListItemText } from 'app/components';
import { StyleRules, Theme, withStyles } from '@material-ui/core/styles';
import { AUTH_TOKEN, USER_LIST, BG_URL , HASH, saveToken } from 'app/constants';



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

    appStore.authenticate(!!localStorage.getItem(AUTH_TOKEN));

    document.body.style.backgroundImage = `url(${BG_URL})`;
    const users = JSON.parse(localStorage.getItem(USER_LIST));
    if(users && users.length > 0){
      appStore.setUsers(users);
    }

    if(location.hash.substr(1) == HASH.join){
      loginStore.handleChangeIndex(1);
    }
  }

  getHeader = () => {
    const { appStore, langStore, loginStore } = this.props;
    const ret =
    (appStore.user) ?
    (<Div>
      <Div>
        <Typography variant="headline">
          {`${langStore.getW("hi")}, ${appStore.user.email.split("@")[0]}`}
        </Typography>
      </Div>
      <List>
        <ListItem>
          <Icon onClick={()=>{
              appStore.authenticate(false);
              appStore.setUser(null);
              loginStore.force(false);            
          }} color="secondary">arrow_back</Icon>
          <Avatar src={appStore.user.pp || appStore.user.email} />
          <ListItemText primary={appStore.user.email} />
        </ListItem>
      </List>
    </Div>)
    : (<Typography variant="headline">{langStore.getW("sign_in")}</Typography>);
    return ret;
  }
  render() {
    const { langStore, loginStore, appStore, classes } = this.props;
    const { forcedAlien, index } = loginStore;
    const { is_authenticated, users } = appStore;

    const H1 = this.getHeader();
    let out;
    if(is_authenticated || forcedAlien || !users || users.length == 0){
      out = (
        <SwipeableViews index={index} animateHeight={true}>
          <TabContainer swipeableHeight="360px">
            {H1}
            <LoginForm />
          </TabContainer>
          <TabContainer  swipeableHeight="360px">
            <Typography variant="headline">{langStore.getW("join")}</Typography>
            <SignupForm />
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
          {users.map( (o,i) =>
            {
              return(
                <ListItem
                  key={i}
                  button 
                  onClick={()=>{
                    appStore.setUser(o);
                    appStore.authenticate();
                  }}
                  >
                  <Avatar src={o.pp || o.email} />
                  <ListItemText
                    primary={o.email}
                    secondary={o.email}
                    />
                </ListItem>
              )
          }
          )}
          <ListItem
            key={users.length+1}
            button
            onClick={()=>{
              appStore.authenticate(false);
              appStore.setUser(null);
              loginStore.force();
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



@inject('appStore','errorStore','langStore','loginStore','xhrStore')
@observer
class LoginForm extends React.Component<any, any>{

  state = {
    index: 0,
    emailField: '',
    passwordField: '',
    gAuth: '',
  };
  componentDidMount(){
    const { user } = this.props.loginStore;
      if(user && user.email){
        this.setState({ emailField:  user.email });
        this.handleChangeIndex(1);
      }
   }
  render(){
    const { langStore, loginStore, appStore } = this.props;
    const {
      index,
      emailField,
      passwordField,
      gAuth,
    } = this.state;
    return(
    <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex} animateHeight={true}>
        <TabContainer  swipeableHeight="240px">
          {/*<form>*/}
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
              type="button"
              className={cx(styles.pad_20, styles.mar_20_0)}
              color="primary"
              fullWidth
              variant="contained" >
              {langStore.getW("next")}
            </AButton>
          {/*</form>*/}
          <Div
            className={cx(styles.mar_20_0)}
            >
            <Span className={cx(styles.hint)}>Need an account? </Span>
            <Link onClick={()=>{ loginStore.handleChangeIndex(1) }} to="#join">Register Now</Link>
          </Div>
        </TabContainer>
        <TabContainer swipeableHeight="340px">
          {/*<form>*/}
            <TextField
              className={cx(styles.mar_20_0)}
              value={passwordField}
              onChange={this.handlePasswordField}
              label={langStore.getW("pass")}
              InputProps={{ placeholder: langStore.getW("pass") }}
              type="password"
              fullWidth />
            <TextField
              className={cx(styles.mar_20_0)}
              value={gAuth}
              onChange={this.handleGAuth}
              label={langStore.getW("guath")}
              InputProps={{ placeholder: langStore.getW("guath") }}
              fullWidth />
            <Link faded to="/forgot">Forgot password?</Link>
            <AButton
              onClick={this.handleSignIn}
              className={cx(styles.pad_20,styles.mar_20_0)}
              color="primary"
              type="button"
              variant="contained"
              fullWidth >
            {langStore.getW("sign_in")}
          </AButton>
         {/*</form>*/}
          <Div>
            <Span className={cx(styles.hint)}>Missed Something? </Span>
            <Link onClick={()=>{ appStore.setUser(null); this.handleChangeIndex(0); }} to="/#">Go back</Link>
          </Div>
        </TabContainer>
      </SwipeableViews>
    );
  }
  handleSignIn = () => {
    
    return this.props.xhrStore.post(this.props, "/sign_in", {
      email: this.state.emailField,
      password: this.state.passwordField,
      g_auth: this.state.gAuth,
     },(res)=>{
       const { access_token, refresh_token, id } = res;
       saveToken({ access_token, refresh_token });

       const user = Object.assign({},this.props.appStore.user,{id, access_token, refresh_token});
       this.props.appStore.addUser(user);
    });
    
  }
  handleCheckEmail = () => {
    return this.props.xhrStore.get(this.props, `/check_email?email=${this.state.emailField}`,(res) => {
      this.handleChangeIndex(1);
      this.props.appStore.setUser({
        email: res.email,
      })
    });
  }
  handleEmailField = (e) => {
    this.setState({ emailField: e.target.value });
  }
  handleGAuth = (e) => {
    this.setState({ gAuth: e.target.value });
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

@inject('appStore','loginStore','langStore','errorStore','xhrStore')
@observer
class SignupForm extends React.Component<any, any>{

   state = {
      captchaResponse: null,
      email: '',
      password: '',
      invite_code: '',
   };

  componentDidMount() {
    //this.recaptcha.reset();
  }
  render (){

      const { langStore, loginStore } = this.props;
      //@ts-ignore
      const { captchaResponse, email, password, invite_code }  = this.state;

      return (
            <Div>
              <Div>
                  <TextField
                    fullWidth
                    className={cx(styles.mar_20_0)}
                    label="Email"
                    value={email}
                    onChange={this.handleEmail} />
                  <TextField
                    type="password"
                    fullWidth
                    className={cx(styles.mar_20_0)}
                    label="Password"
                    value={password}
                    onChange={this.handlePassword} />
                  <TextField
                    fullWidth
                    className={cx(styles.mar_20_0)}
                    label="Invite Code (Optional)"
                    value={invite_code}
                    onChange={this.handleInviteCode} />
              </Div>
              <Div>
                <Div className={cx(styles.hint,styles.mar_20_0)}>{langStore.getW("agree_terms")}</Div>
                <AButton
                  className={cx(styles.pad_20,styles.mar_20_0)}
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={this.onSignupFormSubmit}
                  >
                  Create Account
                </AButton>
                <Div>
                  <Span className={cx(styles.hint)}>Already member? </Span>
                  <Link onClick={()=>{ loginStore.handleChangeIndex(0); }} to="#login">Login</Link>
                </Div>
              </Div>
            </Div>
      );
  }
  handleEmail = (e) => { this.setState({ email: e.target.value }); }
  handlePassword = (e) => { this.setState({ password: e.target.value }); }
  handleInviteCode = (e) => { this.setState({ invite_code: e.target.value }); }

  onSignupFormSubmit = () => {
    this.handleCaptchaResolved();
  }
  handleCaptchaResolved = () => {
    return new Promise((resolve, reject) => {
      //this.setState({ captchaResponse : this.recaptcha.getResponse() });
      setTimeout(()=>{
        this.handleSignup();
      },3000);
    });
  }
  handleSignup = () => {
    const { email, password, invite_code } = this.state;
    return this.props.xhrStore.post(this.props, `/register`,{
      email,
      password,
      invite_code,
      //captchaResponse: this.state.captchaResponse,
    },(res) => {
       const { access_token, refresh_token, id } = res;
       saveToken({access_token, refresh_token});
       this.props.appStore.addUser({ id, email });      
    });
  }
}

export default Login;


