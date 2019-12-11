import React from 'react';
import './HomePage.css';
import PrimarySearchAppBar from './NavBar';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import BuildIcon from '@material-ui/icons/Build';
import Typography from '@material-ui/core/Typography';
import SimpleCard from './Task';


function RenderTasks(Testdata) {

    let result=Testdata.map((e)=>{
        return <SimpleCard key={e.indexNo} data={e}></SimpleCard>;
    })
    return result
}


function HomePage(){
    let Testdata = [
        [
            {
                indexNo:1,
                taskName:"Task One",
                taskdesc:"This is the first task which in Todo",
                timeOfRegister:"20/11/2019",
                importance:"High"
            },
            {
                indexNo:2,
                taskName:"Task One",
                taskdesc:"This is the second task which in Todo",
                timeOfRegister:"21/11/2019",
                importance:"Low"
            }
        ],
        [
            {
                indexNo:1,
                taskName:"Task One",
                taskdesc:"This is the first task which in Progress",
                timeOfRegister:"20/11/2019",
                importance:"High"
            }
        ],
        [
            {
                indexNo:1,
                taskName:"Task One",
                taskdesc:"This is the first task which complete",
                timeOfRegister:"20/11/2019",
                importance:"High"
            }
        ],
    ]

    return(
        <div>
            <PrimarySearchAppBar/>
            <Grid container spacing={1}>
                <Grid item sm xs={12}>
                    <div className='list-title'>
                        <Typography variant='h4'><FileCopyIcon/>To do</Typography>
                    </div>
                    <div className='list-container'>
                        {RenderTasks(Testdata[0])}
                    </div>
                </Grid>
                <Grid item sm xs={12}>
                    <div className='list-title'>
                        <Typography variant='h4'><BuildIcon/>In Progress</Typography>
                    </div>
                    <div className='list-container'>
                        {RenderTasks(Testdata[1])}
                    </div>
                </Grid>
                <Grid item sm xs={12}>
                    <div className='list-title'>
                        <Typography variant='h4'><CheckCircleIcon/>Completed</Typography>
                    </div>
                    <div className='list-container'>
                        {RenderTasks(Testdata[2])}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default HomePage;