import React from 'react';
import './HomePage.css';
import PrimarySearchAppBar from './NavBar';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import BuildIcon from '@material-ui/icons/Build';
import Typography from '@material-ui/core/Typography';

function HomePage(){
    return(
        <div>
            <PrimarySearchAppBar/>
            <Grid container spacing={1}>
                <Grid item sm xs={12}>
                    <div className='list-title'>
                        <Typography variant='h4'><FileCopyIcon/>To do</Typography>
                    </div>
                    <div className='list-container'>Content</div>
                </Grid>
                <Grid item sm xs={12}>
                    <div className='list-title'>
                        <Typography variant='h4'><BuildIcon/>In Progress</Typography>
                    </div>
                    <div className='list-container'>Content</div>
                </Grid>
                <Grid item sm xs={12}>
                    <div className='list-title'>
                        <Typography variant='h4'><CheckCircleIcon/>Completed</Typography>
                    </div>
                    <div className='list-container'>Content</div>
                </Grid>
            </Grid>
        </div>
    );
}

export default HomePage;