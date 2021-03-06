import React from 'react';
import PropTypes from 'prop-types';
import { Link, Toolbar, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountSection from '../Components/AccountSection/AccountSection';
import User from '../Models/User';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    margin: theme.spacing(0, 0, 3, 0),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    color: 'white',
    '&:hover': { textDecoration: 'none' },
  },
  account: {
    flexGrow: 1,
    display: 'flex',
    width: 'auto',
    justifyContent: 'flex-end',
    marginLeft: theme.spacing(1),
  },
}));

const Navbar = ({
  loggedUser,
  onLogoutClick,
  openHotelsManagement,
  openUsersManagement,
  openReservations,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" variant="outlined">
        <Toolbar className={classes.toolbar}>
          <Link href="/Hotels" variant="h6" className={classes.title}>
            Hotel Reservation System
          </Link>

          <div className={classes.account}>
            <AccountSection
              loggedUser={loggedUser}
              logout={onLogoutClick}
              openHotelsManagement={openHotelsManagement}
              openUsersManagement={openUsersManagement}
              openReservationsSection={openReservations}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  loggedUser: PropTypes.instanceOf(User),
  onLogoutClick: PropTypes.func.isRequired,
  openHotelsManagement: PropTypes.func.isRequired,
  openUsersManagement: PropTypes.func.isRequired,
  openReservations: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  loggedUser: null,
};

export default Navbar;
