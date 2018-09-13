/*
export const darkColors = {
    50: '#edf0f8',
    100: '#d3d9ee',
    200: '#b5c0e2',
    300: '#97a6d6',
    400: '#8193ce',
    500: '#6b80c5',
    600: '#6378bf',
    700: '#586db8',
    800: '#4e63b0',
    900: '#3c50a3',
    A100: '#f3f5ff',
    A200: '#c0ccff',
    A400: '#8da2ff',
    A700: '#748dff',
   'contrastDefaultColor': 'dark',
}
*/
export const darkColors = {
    primary: {
        light: "#d3d9ee",
        main: "#6b80c5",
        dark: "#3c50a3",
        contrastText: "#fff",
    }
}

export const AUTH_TOKEN = "AUTH_TOKEN";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const USER_LIST = "USER_LIST";

export const BG_URL = 'http://i.imgur.com/BQFAZTe.jpg?1';

//lits of login users like gmail
export const HASH = {
  join: 'join',
  pwd: 'pwd',
}

export const saveToken = ({ access_token, refresh_token}) => {
  localStorage.setItem(AUTH_TOKEN, access_token);
  localStorage.setItem(REFRESH_TOKEN, refresh_token);
}
export const getToken = () => {
  const access_token = localStorage.getItem(AUTH_TOKEN);
  const refresh_token = localStorage.getItem(REFRESH_TOKEN);
  return {access_token, refresh_token};
}

export const stringToColour = (str) =>  {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

export const pair_decimals = {
  "BTC" : {
    "ETH" : 2
  }
};