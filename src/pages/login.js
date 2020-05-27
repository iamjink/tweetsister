import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';

//MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
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
	}
});

class login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
	}

	//will receive props from redux and show errors on login form
	componentWillReceiveProps(nextProps){
		if(nextProps.UI.errors){
			this.setState({errors: nextProps.UI.errors});
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginUser(userData, this.props.history);
	};
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	render() {
		const { classes, UI: { loading } } = this.props;
		const { errors } = this.state;

		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<img
						src={AppIcon}
						alt="logoImage"
						style={{
							width: '20%',
							height: 'auto'
						}}
						className={classes.image}
					/>{' '}
					<Typography variant="h2" className={classes.pageTitle}>
						Login{' '}
					</Typography>{' '}
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="email"
							name="email"
							type="email"
							label="Email"
							helperText={errors.email}
							error={errors.email ? true : false}
							className={classes.textField}
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="password"
							name="password"
							type="password"
							label="Password"
							helperText={errors.password}
							error={errors.password ? true : false}
							className={classes.textField}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
						/>{' '}
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{' '}
								{errors.general}{' '}
							</Typography>
						)}{' '}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							classsName={classes.button}
							disabled={loading}
						>
							{' '}
							{loading && <CircularProgress size={30} className={classes.progress} />}
							Login{' '}
						</Button>{' '}
						<br />
						<small>
							Don 't have an account? sign up <Link to="/signup">here</Link>{' '}
						</small>{' '}
					</form>{' '}
				</Grid>{' '}
				<Grid item sm />
			</Grid>
		);
	}
}

//Redux stuff
login.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired
};

//graabs global state, and brings to props
const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI
});

const mapActionsToProps = {
	loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
