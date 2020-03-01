import React, { Component } from 'react';
import Server from 'services/Server/Server';
import yetiLogo from 'static/images/yeti-head.png';
import { css, StyleSheet } from 'aphrodite';
import { Link } from 'react-router-dom';
import { ReactComponent as Antenna } from 'static/svgs/antenna.svg';
import { ReactComponent as Earth } from 'static/svgs/earth.svg';
import { ROUTES } from './constants';
import { white } from 'shared/styles/colors';

interface Props {
  match: any;
}
interface State {
  error: string | null;
  latitude: number | null;
  longitude: number | null;
}

class App extends Component<Props, State> {
  private constructor(props) {
    super(props);
    this.state = {
      error: null,
      latitude: null,
      longitude: null,
    };
  }

  public componentDidMount() {
    this.pollISSPosition();
  }

  public render() {
    const {
      match: { path },
    } = this.props;

    const inAlternateUniverse = path === `/${ROUTES.ALTERNATE_UNIVERSE}`;

    const { latitude, longitude, error } = this.state;

    return (
      <div
        className={css(
          styles.App,
          inAlternateUniverse && styles.AppAlternateUniverse
        )}
      >
        <Earth className={css(styles.earth)} />
        <div className={css(styles.controlPanel)}>
          <Link
            className={css(styles.navigationLink)}
            to={`/${ROUTES.ALTERNATE_UNIVERSE}`}
          >
            <div
              className={css(
                styles.controlPanelButton,
                styles.controlPanelButtonLeft,
                inAlternateUniverse && styles.controlPanelButtonActive
              )}
            >
              Alternate Universe
            </div>
          </Link>
          <Link className={css(styles.navigationLink)} to="/">
            <div
              className={css(
                styles.controlPanelButton,
                styles.controlPanelButtonRight,
                !inAlternateUniverse && styles.controlPanelButtonActive
              )}
            >
              Normal Universe
            </div>
          </Link>
        </div>
        <div className={css(styles.issSection)}>
          <div className={css(styles.issSectionLeft)}>
            <Antenna className={css(styles.antenna)} />
          </div>
          <div className={css(styles.issSectionRight)}>
            <div className={css(styles.uplinkText)}>ISS Uplink Established</div>
            <div className={css(styles.locationSection)}>
              <div className={css(styles.locationText)}>
                <span className={css(styles.locationLabel)}>Latitude: </span>
                {latitude}
              </div>
              <div className={css(styles.locationText)}>
                <span className={css(styles.locationLabel)}>Longitude: </span>
                {longitude}
              </div>
            </div>
          </div>
        </div>
        {error && <div>{error}</div>}
        <div className={css(styles.madeBySection)}>
          <a className={css(styles.link)} href="https://yeti.co" rel="noopener">
            <div className={css(styles.row)}>
              <div className={css(styles.logoText)}>Created by</div>
              <img className={css(styles.image)} src={yetiLogo} alt="logo" />
            </div>
          </a>
        </div>
      </div>
    );
  }

  private pollISSPosition = async () => {
    try {
      const {
        iss_position: { latitude, longitude },
      } = await Server.getPosition();
      this.setState({
        latitude,
        longitude,
      });
      setTimeout(this.pollISSPosition, 1000);
    } catch {
      this.setState({
        error: 'unable to connect to server',
      });
    }
  };
}

export default App;

const styles = StyleSheet.create({
  App: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    background:
      'radial-gradient(circle at left bottom, rgb(48, 0, 140), rgba(48, 0, 121, 1), rgba(29, 8, 64, 1), rgba(20, 5, 33, 1), rgb(0, 0, 0))',
    transition: '0.3s',
  },
  AppAlternateUniverse: {
    filter: 'hue-rotate(100deg)',
  },
  //
  antenna: {
    width: 40,
  },
  controlPanel: {
    position: 'absolute',
    top: 60,
    left: 60,
    display: 'flex',
  },
  controlPanelButton: {
    height: 40,
    width: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: white,
    fontFamily: 'Montserrat',
    fontSize: 14,
    textDecoration: 'none',
  },
  controlPanelButtonActive: {
    backgroundColor: '#36b451',
  },
  controlPanelButtonLeft: {
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  controlPanelButtonRight: {
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  earth: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 500,
    width: 500,
    filter: 'drop-shadow(0px 0px 40px #eee)',
  },
  image: {
    height: 50,
    width: 'auto',
  },
  issSection: {
    display: 'flex',
    position: 'absolute',
    top: 60,
    right: 60,
    border: `1px solid rgba(255, 255, 255, 0.15)`,
    borderRadius: 4,
    overflow: 'hidden',
  },
  issSectionLeft: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  issSectionRight: {
    display: 'flex',
    flexDirection: 'column',
    padding: 24,
  },
  link: {
    fontFamily: 'Orbitron',
    textDecoration: 'none',
    fontWeight: 900,
  },
  navigationLink: {
    textDecoration: 'none',
  },
  uplinkText: {
    fontFamily: 'Orbitron',
    letterSpacing: 1,
    fontSize: 16,
    color: '#14c23d',
    marginBottom: 24,
  },
  locationLabel: {
    fontFamily: 'Orbitron',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  locationSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  locationText: {
    fontFamily: 'Orbitron',
    width: 200,
    color: white,
    marginBottom: 16,
  },
  logoText: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    color: white,
  },
  madeBySection: {
    position: 'absolute',
    bottom: 24,
    right: 32,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
});
