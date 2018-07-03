//@flow weak

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as cx from 'classnames';
import { Div } from '../Div';

const styleSheetExport = theme => ({
  fa: {
    flex: "0 1 auto"
  },
  fs: {
    flex: "1 1 auto"
  }
});

const FaFlexbox = (props) => {
  const {children, classes, className, fs,...other} = props;
  return(
    <Div
      className={cx(
        {[classes.fa]: (!fs) },
        {[classes.fs]: fs === true},
         className)}
       {...other}>
      {children}
    </Div>
  );
}

export default withStyles(styleSheetExport)(FaFlexbox)
