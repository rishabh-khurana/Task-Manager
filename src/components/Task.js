import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import TimerIcon from '@material-ui/icons/Timer';
import WarningIcon from '@material-ui/icons/Warning';
import { CardTypes,ImportanceType } from '../utils/flags';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const styles = (theme) => ({
  card: {
    marginBottom: '1.5rem',
    "&:last-child": {
      marginBottom: '0rem',
    }
  },
  title: {
    fontSize: 20,
  },
  titleIcon: {
    top: '0.2rem',
    position: 'relative',
    marginRight: '0.5rem'
  }
});

class SimpleCard extends React.Component{

  constructor(){
    //const classes = useStyles();
    super()
    this.state={
      //classes:classes
      cardTypes:CardTypes,
      importanceType:ImportanceType
  }
}

  render(){
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} component="h2" gutterBottom>
            {this.props.data.importance === this.state.importanceType.HIGH ? <WarningIcon className={classes.titleIcon}/>:null}
            {this.props.data.taskName}
          </Typography>
          <Typography component="p" color="textSecondary">
            {this.props.data.taskdesc}
          </Typography>
        </CardContent>
        <CardActions>
          {this.props.cardtype === this.state.cardTypes.TODO ? <Button style={{backgroundColor:'#50aa4d', color: 'white'}} onClick={(e)=>this.props.clickHandler(this.props.data)}><PlayCircleOutlineIcon/>Start</Button>:null}
          {this.props.cardtype === this.state.cardTypes.INPROGRESS ? <Button style={{backgroundColor:'#0086f9', color: 'white'}} onClick={(e)=>this.props.clickHandler(this.props.data)}><CheckCircleOutlineIcon/>Done</Button>:null}
          <Button disabled>
            <TimerIcon/>1d 1h 2m 3s
          </Button>
        </CardActions>
      </Card>

    );

  }
}

export default withStyles(styles)(SimpleCard);