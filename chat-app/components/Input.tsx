import * as React from "react";
import { ViewStyle, StyleSheet, TextInputProps, View, TextInput } from "react-native";

interface InputProps extends TextInputProps {
  noWrapper?: boolean;
  containerStyle?: ViewStyle;
}

export const Input = (props: InputProps) => {
  const { noWrapper, containerStyle, ...other } = props;

  return (
    <View style={[!noWrapper && styles.wrapper, containerStyle]}>
      <View style={styles.container}>
        <TextInput
          {...other}
          placeholderTextColor={'#8D8D8D'}
          allowFontScaling={false}
          selectionColor={'#007BFF'}
          style={[props.style, styles.input]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: '#F2F3F5'
  },
  wrapper: {
    marginHorizontal: 16,
    marginBottom: 16
  },
  input: {
    fontSize: 17, 
    lineHeight: 22, 
    fontWeight: '400',
    color: '#262626',
    flexGrow: 1,
    height: 54,
    minHeight: 54,
    paddingHorizontal: 16,
  }
});
