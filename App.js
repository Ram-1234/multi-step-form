import React, { useReducer, useState } from "react";
import { StyleSheet, View, SafeAreaView, } from "react-native";
import ScreenOne from "./src/components/form/screen-one";
import ScreenThree from "./src/components/form/screen-three";
import ScreenTwo from "./src/components/form/screen-two.js";
import Modal from "./src/components/modal";

const initialState = {
  step: 1,
  user_info: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case "NEXT":
      return { ...state, step: action.payload }
    case "PREV":
      return { ...state, step: action.payload }
    case "SAVE":
      return { ...state, user_info: { ...state.user_info, ...action.payload } }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [modal, setModal] = useState(false);
  //console.log('state', state);

  /** next button clicked */
  const nextStep = (step, data) => {
    dispatch({ type: "SAVE", payload: data })
    if (step === 3) {
      setModal(true);
    } else {
      dispatch({ type: "NEXT", payload: step + 1 })
    }
  }
  /** back button clicked */
  const backStep = (step, data) => {
    if (step > 1) {
      dispatch({ type: "PREV", payload: step - 1 })
    }
  }
  /** save button clicked */
  const saveButton = (step, data) => {
    dispatch({ type: "SAVE", payload: data })
    if (step === 3) {
      setModal(true);
    }
  }

  const closeModal = () => {
    setModal(false);
  }

  const steps = (state, nextStep, saveButton, backStep,) => {
    let allSteps = {
      1: <ScreenOne state={Object.keys(state) && state} step={state?.step} nextStep={nextStep} saveButton={saveButton} backStep={backStep} />,
      2: <ScreenTwo state={Object.keys(state) && state} step={state?.step} nextStep={nextStep} saveButton={saveButton} backStep={backStep} />,
      3: <ScreenThree state={Object.keys(state) && state} step={state?.step} nextStep={nextStep} saveButton={saveButton} backStep={backStep} />,
    }
    return allSteps[state?.step];
  }

  return (
    <SafeAreaView>
      <View style={styles.app}>
        {steps(state, nextStep, saveButton, backStep)}
        {modal && <Modal isVisible={modal} toggleModal={closeModal} userInfo={state?.user_info} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    float: 1,
    marginHorizontal: "auto"
  }
});

export default App;
