import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import Hotel from '../../Models/Hotel';
import Navbar from '../../Common/Navbar';
import HotelsPage from '../HotelsPage';
import HotelFull from '../HotelFull/HotelFull';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import HotelsManagement from '../HotelsManagement/HotelsManagement';
import UsersManagement from '../UsersManagement/UsersManagement';
import OrdersSection from '../OrdersSection/OrdersSection';
import Constants from '../../Common/Constants';
import Profile from '../Profile/Profile';
import LoggedUser from '../../Models/LoggedUser';

const RoutesComponent = ({
  loggedUser,
  hotels,
  totalPages,
  totalResults,
  pageChanged,
  loguot,
  submit,
  searchHotels,
  isHotelsManagementOpen,
  closeHotelsManagement,
  openHotelsManagement,
  isUsersManagementOpen,
  closeUsersManagement,
  openUsersManagement,
  dateIn,
  dateOut,
  onDateInChange,
  onDateOutChange,
  isReservationsOpen,
  openReservations,
  closeReservations,
}) => {
  return (
    <Router>
      <Navbar
        onLogoutClick={loguot}
        openHotelsManagement={openHotelsManagement}
        openUsersManagement={openUsersManagement}
        openReservations={openReservations}
      />

      {loggedUser &&
      (loggedUser?.roles?.includes(Constants.adminRole) ||
        loggedUser?.roles?.includes(Constants.managerRole)) ? (
        <HotelsManagement
          isOpen={isHotelsManagementOpen}
          close={closeHotelsManagement}
        />
      ) : null}

      {loggedUser && loggedUser?.roles?.includes(Constants.adminRole) ? (
        <UsersManagement
          isOpen={isUsersManagementOpen}
          close={closeUsersManagement}
        />
      ) : null}

      {loggedUser ? (
        <OrdersSection isOpen={isReservationsOpen} close={closeReservations} />
      ) : null}

      <Switch>
        <Route path="/Hotels/:id">
          <HotelFull
            dateIn={dateIn}
            dateOut={dateOut}
            searchHotels={searchHotels}
            onDateInChange={onDateInChange}
            onDateOutChange={onDateOutChange}
          />
        </Route>

        <Route path="/Hotels">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {hotels ? (
              <HotelsPage
                hotels={hotels}
                totalPages={totalPages}
                totalResults={totalResults}
                onPageChanged={pageChanged}
                searchHotels={searchHotels}
                dateIn={dateIn}
                dateOut={dateOut}
                onDateInChange={onDateInChange}
                onDateOutChange={onDateOutChange}
              />
            ) : (
              <CircularProgress />
            )}
          </div>
        </Route>

        <Route path="/Profile">
          <Profile loggedUserId={loggedUser?.id} />
        </Route>

        <Route path="/SignIn">
          <SignIn onSignIn={submit} />
        </Route>

        <Route path="/SignUp">
          <SignUp onSignUp={submit} />
        </Route>

        <Redirect to="/Hotels" />
      </Switch>
    </Router>
  );
};

RoutesComponent.propTypes = {
  loggedUser: PropTypes.instanceOf(LoggedUser),
  hotels: PropTypes.arrayOf(Hotel),
  totalPages: PropTypes.number,
  totalResults: PropTypes.number,
  pageChanged: PropTypes.func.isRequired,
  loguot: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  searchHotels: PropTypes.func.isRequired,
  isHotelsManagementOpen: PropTypes.bool.isRequired,
  closeHotelsManagement: PropTypes.func.isRequired,
  openHotelsManagement: PropTypes.func.isRequired,
  isUsersManagementOpen: PropTypes.bool.isRequired,
  closeUsersManagement: PropTypes.func.isRequired,
  openUsersManagement: PropTypes.func.isRequired,
  dateIn: PropTypes.string,
  dateOut: PropTypes.string,
  onDateInChange: PropTypes.func.isRequired,
  onDateOutChange: PropTypes.func.isRequired,
  isReservationsOpen: PropTypes.bool.isRequired,
  openReservations: PropTypes.func.isRequired,
  closeReservations: PropTypes.func.isRequired,
};

RoutesComponent.defaultProps = {
  loggedUser: null,
  hotels: null,
  totalPages: 0,
  totalResults: 0,
  dateIn: null,
  dateOut: null,
};

export default RoutesComponent;
