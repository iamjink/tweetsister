import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteScream from './DeleteScream'
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
//Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
//Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

const styles = {
	card: {
		position: 'relative',
		display: 'flex',
		marginBottom: 20
	},
	image: {
		minWidth: 200
	},
	content: {
		padding: 25,
		objectfit: 'cover'
	}
};

class Scream extends Component {
	//check if the post is liked or not
	likedScream = () => {
		if (this.props.user.likes && this.props.user.likes.find((like) => like.screamId === this.props.scream.screamId))
			return true;
		else return false;
	};

	likeScream = () => {
		this.props.likeScream(this.props.scream.screamId);
	};

	unlikeScream = () => {
		this.props.unlikeScream(this.props.scream.screamId);
	};

	render() {
		dayjs.extend(relativeTime);
		//same as const classes = this.props.classes;
		const {
			classes,
			scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount },
			user: { authenticated, credentials: { handle } }
		} = this.props;

		const likeButton = !authenticated ? (
			<MyButton tip="Like">
				<Link to="/login">
					<FavoriteBorder color="primary" />
				</Link>
			</MyButton>
		) : this.likedScream() ? (
			<MyButton tip="Unlike" onClick={this.unlikeScream}>
				<FavoriteIcon color="primary" />
			</MyButton>
		) : (
			<MyButton tip="Like" onClick={this.likeScream}>
				<FavoriteBorder color="primary" />
			</MyButton>
		);

		//delete button shows up if user is logged in and user handle of post is the same as the loggedin user
		const deleteButton = authenticated && userHandle === handle ? <DeleteScream screamId={screamId} /> : null;

		return (
			<Card className={classes.card}>
				<CardMedia image={userImage} title="profile image" className={classes.image} />{' '}
				<CardContent className={classes.content}>
					<Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
						{' '}
						{userHandle}
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{' '}
						{/* converts toISOSstring to relative time from now */}
						{dayjs(createdAt).fromNow()}
					</Typography>
					<Typography variant="body1" color="textSecondary">
						{' '}
						{body}
					</Typography>
					{likeButton}
					<span>{likeCount} Likes</span>
					<MyButton tip="comments">
						<ChatIcon color="primary" />
					</MyButton>
					<span>{commentCount} comments</span>	
					{deleteButton}
				</CardContent>
			</Card>
		);
	}
}

Scream.propTypes = {
	likeScream: PropTypes.func.isRequired,
	unlikeScream: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	scream: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user
});

const mapActionsToProps = {
	likeScream,
	unlikeScream
};

//exports component with styles from MUI
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));
