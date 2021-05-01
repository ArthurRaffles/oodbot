import React from 'react';
import Typography from '@material-ui/core/Typography';

type TitleProps = {children: any};
export default function Title(props: TitleProps) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

// Title.propTypes = {
//   children: PropTypes.node,
// };