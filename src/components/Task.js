import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import TimerIcon from '@material-ui/icons/Timer';

const useStyles = makeStyles({
  card: {
  },
  title: {
    fontSize: 20,
  }
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          Title of the Task
        </Typography>
        <Typography component="p" color="textSecondary">
          This is the description of the task
        </Typography>
      </CardContent>
      <CardActions>
        <Button><PlayCircleOutlineIcon/>Start</Button>
        <Button>
          <TimerIcon/>1h 2m 3s
        </Button>
      </CardActions>
    </Card>
  );
}