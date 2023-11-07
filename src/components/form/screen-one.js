import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";

import Button from "../button";
import { formStyle, formFiledStyle, labelTextStyle } from "./styles";
import common from "../../config/common";
import Error from "../error/Error";


const validtaionSchema = yup.object().shape({
  email: yup
    .string()
    .email("must be a valid email")
    .matches(/\S+@\S+\.\S+|^$/, { message: "must be a valid email" })
    .required("Please enter valid email"),
  password: yup.string()
    .matches(common.password.regex, {
      message: "Must contain min 2 capital letters, 2 small letter, 2 numbers and 2 special characters",
      excludeEmptyString: true
    })
    .min(8)
    .required("Password Required")
})

const ScreenOne = (props) => {
  const { step, nextStep, saveButton, backStep, state } = props;
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validtaionSchema), defaultValues: state?.user_info });

  const onSubmit = (data) => {
    nextStep(step, data)
  }

  const saveData = () => {
    let email = watch('email');
    let password = watch('password');
    saveButton(step, { email: email, password: password });
  }

  return (

    <ScrollView bounces={true} style={styles.scrollView}>
      <Text
        style={formStyle}
      >
        Screen 1
      </Text>
      <View>
        <Text style={labelTextStyle}>Email</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              required={true}
              type="email"
              errors={errors}
              value={value}
              style={formFiledStyle}
              onChangeText={onChange}
              name="email"
              placeholder="Your email id"
            />
          )}
          name="email"
        />
        {errors?.email && <Error title={errors?.email?.message || "Enter valid email"} />}
      </View>
      <View>
        <Text style={labelTextStyle}>Password</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={formFiledStyle}
              placeholder="Your password"
              secureTextEntry={true}
              label="Password"
            />
          )}
          name="password"
        />
        {errors?.password && <Error title={errors?.password.message || 'Enter strong password'} />}
      </View>
      <View style={{ float: 1, flexDirection: "row" }}>
        <Button title={"prev"} disabled={true} buttonStyle={{ backgroundColor: "lightgrey" }} />
        <Button title={"save"} onClickHandler={saveData} />
        <Button title={"save & next"} onClickHandler={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 10,
    paddingHorizontal: 15
  },
  header: {
    fontSize: 20,
    paddingTop: 30
  },
  formText: {
    fontSize: 20,
    padding: 10,
    paddingLeft: 0
  }
});

export default ScreenOne;
