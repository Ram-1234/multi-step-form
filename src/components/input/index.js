import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const FormField = (props) => {
  const onChangeHandler = (e) => {
    // if (isPreventEmoji) {
    //     let pattern = /[^a-zA-Z0-9][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/gm
    //     if (pattern.test(e)) { return false }
    // }
    if (onChangeText) props.onChangeText(e);
};
  return (
    <View style={styles.formFieldWrapper}>
      <Text style={styles.labelText}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        style={styles.formFieldText}
        keyboardType={props.keyboardType}
        onChangeText={onChangeHandler}
        onChange={(event) =>
          props.handleFormValueChange(props.formKey, event.nativeEvent.text)
        }
        {...props.textInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formFieldWrapper: {},
  formFieldText: {
    fontSize: 20,
    borderRadius: 15,
    borderWidth: 1,
    padding: 12
  },
  labelText: {
    fontSize: 20,
    marginBottom: 12,
    paddingLeft: 10,
    paddingTop: 10
  }
});

export default FormField;
