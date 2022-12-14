import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from '../styles';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function EventCard({ event, setCurrentId }) {
    const navigate = useNavigate();

    const handleSubmit = async () => {
    //    // event.preventDefault();
    //    // const data = new FormData(event.currentTarget);
    //    // console.log({
    //    // email: data.get('email'),
    //    // password: data.get('password'),
    //    // });

    
    //      console.log("customer");
         const data = await axios.post("http://localhost:3010/deleteEvent",{
            eventName:event.eventName
         });
            console.log(data)
         if (data.data.status == true) {
        //    console.log("status is true");

           navigate("/organizer");
        //    setEvents(data.data)
           // setUser({ userId: data.profile._id, type: 10 })
         } else {
           alert("Email or Password is incorrect");
    }
}

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            {/* <CardMedia className={classes.media} image={event.image} title={event.eventName} /> */}
            <img className={classes.media} src={event.image} alt={event.eventName} />
            {/* <div className={classes.overlay}>
                <Typography variant="h6">{event.creator}</Typography>
                <Typography variant="body2">{moment(event.createdAt).fromNow()}</Typography>
            </div> */}
            <div className={classes.overlay2}>
                <Button 
                    style={{color: 'white'}} 
                    size="small" 
                    onClick={() => setCurrentId(event.eventName)}>
                    <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>
            {/* <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{event.tags.map((tag) => `#${tag} `)}</Typography>
            </div> */}
            <Typography className={classes.title} variant="h5" gutterBottom>{event.eventName}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" >{event.location}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => {}} >
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp; Like &nbsp;
                    {event.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => {handleSubmit()}} >
                    <DeleteIcon fontSize="small" />
                    &nbsp; Delete
                </Button>
            </CardActions>

        </Card>
  )
}

export default EventCard