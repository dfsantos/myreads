import {
  blueGrey50,
  blueGrey900,
  blueGrey700,
  orangeA700,
  white,
  fullBlack,
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey900,
    accent1Color: orangeA700,
    textColor: blueGrey50,
    alternateTextColor: orangeA700,
    canvasColor: blueGrey700,
    shadowColor: fullBlack,
    pickerHeaderColor: orangeA700,
  },
});

export default muiTheme;
