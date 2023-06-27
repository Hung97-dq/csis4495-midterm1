import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) =>({
    appBar: {
        display: 'flex',
        flexDirection: 'row!important',
        borderRadius: 15,
        margin: '30px 0',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
      },
      image: {
        marginLeft: '15px',
      },
     
}));