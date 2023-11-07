import * as yup from "yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  firstname: yup.string()
    .matches(common.alphabets, {
      message: "Firstname must be alphabets",
      excludeEmptyString: true
    })
    .min(2)
    .max(50)
    .required('Firstname Required'),
  lastname: yup
    .string()
    .matches(common.alphabets, {
      message: "Lastname must be alphabets",
      excludeEmptyString: true
    })
    // .required("Lastname Required")
    .nullable(true),
  address: yup.string()
    .matches(common.alphabets, {
      message: "Adddress must be alphabets",
      excludeEmptyString: true
    })
    .min(10)
    .required("Address required")
})

const ScreenTwo = (props) => {
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
    let firstname = watch('firstname');
    let lastname = watch('lastname');
    let address = watch('address');
    saveButton(step, { firstname: firstname, lastname: lastname, address: address });
  }

  const prevPage = () => {
    let firstname = watch('firstname');
    let lastname = watch('lastname');
    let address = watch('address');
    backStep(step, { firstname: firstname, lastname: lastname, address: address })
  }

  return (

    <ScrollView bounces={true} style={styles.scrollView}>
      <Text
        style={formStyle}
      >
        screen 2
      </Text>
      <View>
        <Text style={labelTextStyle}>FirstName</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              style={formFiledStyle}
              onChangeText={onChange}
              placeholder="Your firstname"
            />
          )}
          name="firstname"
        />
        {errors?.firstname && <Error title={errors?.firstname?.message} />}
      </View>
      <View>
        <Text style={labelTextStyle}>LastName</Text>
        <Controller
          control={control}
          rules={{ required: false }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              style={formFiledStyle}
              onChangeText={onChange}
              placeholder="Your lastname"
            />
          )}
          name="lastname"
        />
        {errors?.lastname && <Error title={errors?.lastname?.message} />}
      </View>
      <View>
        <Text style={labelTextStyle}>Address</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              style={formFiledStyle}
              onChangeText={onChange}
              placeholder="Your address"
            />
          )}
          name="address"
        />
        {errors?.address && <Error title={errors?.address?.message} />}
      </View>
      <View style={{ float: 1, flexDirection: "row" }}>
        <Button title={"prev"} onClickHandler={prevPage} />
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

export default ScreenTwo;
