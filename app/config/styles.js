import { Platform } from 'react-native';

import colors from './colors';

export default {
  colors,
  text: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto": "Avenir"
  },
  heading: {
    color: colors.dark,
    fontSize: 24,
    fontWeight: "600",
    paddingTop: 10,
  },
  miniHeading: {
    color: colors.dark,
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 2,
  },
};