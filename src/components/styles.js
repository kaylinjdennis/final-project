import { blue, grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
		// margin: '10px',
		padding: '10% 10%',
		fontSize: '30px',
		// width: '20vw',
		// height: '10vh'
		// maxWidth: "lg",
		// minWidth: "sm"
		flexGrow: '2'
	},
	paper: {
		marginTop: theme.spacing(5),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	icon: {
		margin: theme.spacing(2),
		marginTop: theme.spacing(0),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	root: {
		width: '100%',
		// maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	friends: {
		height: '100%'
	},
	groupForm: {
		paddingTop: 50,
	},
	heading: {
		marginBottom: 25
	},
	barchart: {
		marginBottom: 25,
	},
	billFriends: {
		marginTop: 25,
	},
	groupSelfCheck: {
		margin: 5,
	},
	selfCheckBox: {
		paddingTop: 0,
	}

}));

export default useStyles;