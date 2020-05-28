import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';
//MUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
//Icons
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
//Redux
import { connect } from 'react-redux';
import { postScream } from '../redux/actions/dataActions';

const styles = {
	submitButton: {
		position: 'relative'
	},
	progressSpinner: {
		positoin: 'absolute'
	},
	closeButton: {
		position: 'absolute',
		left: '90%',
		top: '10%'
	},
	typography: {
		useNextVariants: true
	},
	form: {
		textAlign: 'center'
	},
	image: {
		margin: '20px auto 20px auto'
	},
	pageTitle: {
		margin: '10px auto 10px auto'
	},
	textField: {
		margin: '10px auto 10px auto'
	},
	button: {
		marginTop: 20,
		position: 'relative'
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10
	},
	progress: {
		position: 'absolute'
	},
	invisibleSeparator: {
		border: 'none',
		margin: 4
	},
	visibleSeparator: {
		width: '100%',
		borderBottom: '1px solid rgba(0,0,0,0.1)',
		marginBottom: 20
	},
	paper: {
		padding: 20
	},
	profile: {
		'& .image-wrapper': {
			textAlign: 'center',
			position: 'relative',
			'& button': {
				position: 'absolute',
				top: '80%',
				left: '70%'
			}
		},
		'& .profile-image': {
			width: 200,
			height: 200,
			objectFit: 'cover',
			maxWidth: '100%',
			borderRadius: '50%'
		},
		'& .profile-details': {
			textAlign: 'center',
			'& span, svg': {
				verticalAlign: 'middle'
			},
			'& a': {
				color: '#00bcd4'
			}
		},
		'& hr': {
			border: 'none',
			margin: '0 0 10px 0'
		},
		'& svg.button': {
			'&:hover': {
				cursor: 'pointer'
			}
		}
	},
	buttons: {
		textAlign: 'center',
		'& a': {
			margin: '20px 10px'
		}
	}
};

class PostScream extends Component {
	state = {
		open: false,
		body: '',
		errors: {}
	};
	handleOpen = () => {
		this.setState({
			open: true
		});
	};

	handleClose = () => {
		this.setState({
			open: false
		});
	};

	render() {
		const { errors } = this.state;
		const { classes, UI: { loading } } = this.props;
		return (
			<Fragment>
				<MyButton onClick={this.handleOpen} tip="Make a post!">
					<AddIcon />
				</MyButton>
				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
						<CloseIcon />
					</MyButton>
					<DialogTitle> Post a new scream</DialogTitle>
					<DialogContent>
						<form onSubmit={this.handleSubmit}>
							<TextField
								name="body"
								type="text"
								label="Post!"
								multiline
								rows="3"
								placehoder="Make a post!"
								error={errors.body ? true : false}
								helperText={errors.body}
								className={classes.textField}
								onChange={this.handleChange}
								fullWidth
							/>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submitButton}
								disabled={loading}
							>
								{loading && (<CircularProgress size={30} className={classes.progressSpinner} />)}
								Submit
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

PostScream.propTypes = {
	postScream: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	UI: state.UI
});

export default connect(mapStateToProps, { postScream })(withStyles(styles)(PostScream));
