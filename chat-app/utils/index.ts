import { Dimensions, Platform } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const isIphoneX =
  Platform.OS === "ios" &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 812 || width === 812 || height === 896 || width === 896);
