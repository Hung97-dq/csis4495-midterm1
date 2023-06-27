import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
    paper: {
      padding: '2px',
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    buttonSubmit: {
      marginBottom: 10,
    },
    formControl: {
      margin: theme.spacing(1),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));