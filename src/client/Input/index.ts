import Keyboard from './Keyboard';
import {getIsMobile} from '../mobileHelpers';
import OnScreenControls from './OnScreenControls';

const device = getIsMobile() ? OnScreenControls : Keyboard;

const getDevice = () => device;

export default {
    getDevice
};