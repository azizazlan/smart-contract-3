const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '325px',
    marginTop: 2,
    marginLeft: 3,
    marginRight: 3,
  },
  formButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'right',
    width: '100%',
    marginTop: '7px',
  },
  mobileFormButtons: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '7px',
    height: window.innerHeight - 375,
  },
};
export default styles;
