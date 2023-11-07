import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { Dropdown } from 'react-native-element-dropdown';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput
} from "react-native";
import Checkbox from 'expo-checkbox';
import Button from "../button";
import { formStyle, formFiledStyle, labelTextStyle } from "./helper";
import * as yup from "yup";
import common from "../../config/common";
import Error from "../error/Error";

const validtaionSchema = yup.object().shape({
  condition: yup.boolean()
    .required('Accept T&C'),
  phone_number: yup.string()
    .matches(common.mobile.regex, {
      message: "Must be a valid phone number",
      excludeEmptyString: true,
    })
    .min(10)
    .max(10)
    .required("Phone number required"),
  country_code: yup.string()
    .required("Country code required")
})

const ScreenThree = (props) => {
  const { step, nextStep, saveButton, backStep, state } = props;
  const [isFocus, setIsFocus] = useState(false);

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validtaionSchema), defaultValues: state?.user_info });

  const onSubmit = (data) => {
    console.log('data', data)
    nextStep(step, data)
  }
/**onClickHandler={saveData} */
  const saveData = () => {
    let condition = watch('condition');
    let phone_number = watch('phone_number');
    let country_code = watch('country_code');
    saveButton(step, { condition: condition, phone_number: phone_number, country_code: country_code });
  }

  const prevPage = () => {
    let condition = watch('condition');
    let phone_number = watch('phone_number');
    let country_code = watch('country_code');
    backStep(step, { condition: condition, phone_number: phone_number, country_code: country_code });
  }

  return (
    <ScrollView bounces={true} style={styles.scrollView}>
      <Text
        style={formStyle}
      >
        screen 3
      </Text>
      <View>
        <Text style={labelTextStyle}>Country Code</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value,onBlur } }) => (
            <Dropdown
              style={[styles.dropdown,isFocus && { borderColor: 'blue' }]}
              data={[{ label: 'India (+91)', value: '+91' }, { label: 'America (+1)', value: '+1' }]}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              searchPlaceholder="Search..."
              placeholder={!isFocus ? 'Select item' : '...'}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={onBlur}
              onChange={item => {
              onChange(item.value);
              }}
            />
          )}
          name="country_code"
        />
        {errors?.country_code && <Error title={errors?.country_code?.message} /> }
      </View>
      <View>
        <Text style={labelTextStyle}>Phone Number</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange,onBlur, value } }) => (
            <TextInput
              value={value}
              onBlur={onBlur}
              style={formFiledStyle}
              onChangeText={onChange}
              placeholder="Your phone number"
              maxLength={10}
            />
          )}
          name="phone_number"
        />
        {errors?.phone_number && <Error title={errors?.phone_number?.message} />}
      </View>
      <View>
        <Text style={labelTextStyle}>Accept terms & condition</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              onValueChange={onChange}
              style={styles.checkbox}
              value={value}
              color={value ? '#007FFF' : undefined}
            />
          )}
          name="condition"
        />
        {errors?.condition && <Error title={errors?.condition?.message} />}
      </View>

      <View style={{ float: 1, flexDirection: "row" }}>
        <Button title={"prev"} onClickHandler={prevPage} />
        <Button title={"save all"}  onClickHandler={handleSubmit(onSubmit)} /> 
        <Button title={"save & next"} disabled={true} buttonStyle={{ backgroundColor: "lightgrey" }} onClickHandler={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 10,
    paddingHorizontal: 15
  },
  checkbox: {
    alignSelf: 'center',
  },
  header: {
    fontSize: 20,
    paddingTop: 30
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  formText: {
    fontSize: 20,
    padding: 10,
    paddingLeft: 0
  }
});

export default ScreenThree;
