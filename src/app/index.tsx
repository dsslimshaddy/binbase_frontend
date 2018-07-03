import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from 'react-router';
import { MuiThemeProvider, createMuiTheme, withStyles, createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { observer } from 'mobx-react';
//import { withRouter } from 'react-router';
//import { darkColors } from 'app/constants';
import Error from 'app/containers/Error';
// render react DOM
import { Provider } from 'mobx-react';
import { compose } from "recompose";

import { createBrowserHistory } from 'history';
import { createStores } from 'app/stores';

//@ts-ignore
import asyncComponent from 'app/utils/asyncComponent';

import Login from 'app/containers/Login';
//@ts-ignore
//const Login = asyncComponent(() => import('app/containers/Login').then(module => module.default), { name: 'Login' });
import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";

const styleNode = document.createComment("insertion-point-jss");
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
//@ts-ignore
jss.options.insertionPoint = "insertion-point-jss";


const history = createBrowserHistory();
const rootStore = createStores(history);

export const App = hot(module)(() => (
	<JssProvider jss={jss} generateClassName={generateClassName}>
  		<AppFragment />
  	</JssProvider>
));



const styleSheet = theme => ({
  overlay: {},
  dark_visible: {
    '& $overlay': {
      animation: '.15s growDarkOverlay',
      transition: '.25s transform',
    },
  },
  dark_invisible: {
    '& $overlay': {
      transition: '.25s transform',
    },
  },
  app_container: {
    '&$dark_invisible': {
      '& $overlay': {
        transform: 'scale(0)',
      }
    },
    '&$dark_visible': {
      '& $overlay': {
        transform: 'scale(1)',
        background: 'rgba(0,0,0,.3)',
      }
    },
  },
});

//@withRouter
@compose(withStyles(styleSheet))
@observer
class AppFragment extends React.Component<any, any>{
	public theme;
	constructor(props){
		super(props)
		this.theme = createMuiTheme({
		      	palette: {
		        	type: (rootStore.appStore.theme == 0) ? 'dark' : 'light',
				    primary: {
				        light: "#d3d9ee",
				        main: "#6b80c5",
				        dark: "#3c50a3",
				        contrastText: "#fff",
				    }
		      	}
	      });
	}
	render(){
		return (
		  <MuiThemeProvider theme={this.theme} >
		  	<CssBaseline />
		  	<Provider {...rootStore} >
		  	<div>
			  	<Error overlayClassName={this.props.classes.overlay} />
			    <Router history={history}>
			      <Switch>
	            	<Route path="/login" component={Login} />
			      </Switch>
			    </Router>
			</div>
			</Provider>
		  </MuiThemeProvider>
		)		
	}
}