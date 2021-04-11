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
  
	
}));

export default useStyles;