import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  blueGrey50,
  blueGrey900,
  blueGrey700,
  deepOrangeA400,
  fullBlack,
} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  appBar: {
    titleFontWeight: 600,
  },
  palette: {
    primary1Color: blueGrey900,
    accent1Color: deepOrangeA400,
    textColor: blueGrey50,
    alternateTextColor: deepOrangeA400,
    canvasColor: blueGrey700,
    shadowColor: fullBlack,
    pickerHeaderColor: deepOrangeA400,
  },
});

export default muiTheme;
