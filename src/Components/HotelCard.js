import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  makeStyles,
  CardActions,
  Button,
} from '@material-ui/core';
import Hotel from '../Models/Hotel';
import defaultImage from '../images/default.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    height: 300,
    margin: theme.spacing(2, 0, 0, 0),
    padding: theme.spacing(1),
  },
  details: {
    flexGrow: 3,
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    width: '100%',
    display: 'block',
  },
  mediaWrapper: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      gridColumn: 1,
      display: 'flex',
      flexGrow: 2,
    },
  },
  info: {
    gridColumn: '1 / span 2',
    flexGrow: 2,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      gridColumn: 2,
    },
  },
  actions: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    width: 'auto',
  },
}));

const HotelCard = ({ hotel, onOpenFullHotel }) => {
  const { location } = hotel;
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <div className={classes.mediaWrapper}>
        <CardMedia
          className={classes.media}
          image={hotel.mainImage ? hotel.mainImage : defaultImage}
        />
      </div>
      <div className={classes.info}>
        <div className={classes.details}>
          <CardHeader title={hotel.name} />
          <CardContent>
            <Typography>
              <b>Country</b> {location?.country}
            </Typography>
            <Typography>
              <b>Region</b> {location?.region}
            </Typography>
            <Typography>
              <b>City</b> {location?.city}
            </Typography>
            <Typography>
              <b>Street</b> {location?.street}, {location?.buildingNumber}
            </Typography>
          </CardContent>
        </div>
        <CardActions className={classes.actions}>
          <Button onClick={() => onOpenFullHotel(hotel)}>Explore</Button>
        </CardActions>
      </div>
    </Card>
  );
};

HotelCard.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  onOpenFullHotel: PropTypes.func.isRequired,
};

export default HotelCard;
