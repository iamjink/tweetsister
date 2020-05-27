import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
	card: {
		display: 'flex',
		marginBottom: 20
    },
    image:{
        minWidth: 200,
    },
    content:{
        padding:25,
        objectfit: 'cover'
    }
};

class Scream extends Component {
	render() {
        dayjs.extend(relativeTime)
		//same as const classes = this.props.classes;
		const {
			classes,
			scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount }
		} = this.props;

		return (
			<Card className={classes.card}>
				<CardMedia image={userImage} title="profile image" className = {classes.image}/>
				<CardContent className={classes.content}>
					<Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary" >
						{userHandle}
					</Typography>
					<Typography variant="body2" color="textSecondary">
                        {/* converts toISOSstring to relative time from now */}
						{dayjs(createdAt).fromNow()}
					</Typography>
					<Typography variant="body1" color="textSecondary">
						{body}
					</Typography>
				</CardContent>
			</Card>
		);
	}
}

//exports component with styles from MUI
export default withStyles(styles)(Scream);
