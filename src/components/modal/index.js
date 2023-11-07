import { View, Text, StyleSheet, Button, SafeAreaView, } from "react-native"
import Modal from "react-native-modal";

const ModalComponent = (props) => {
    const {userInfo,isVisible, toggleModal}=props
   
    return (
        <SafeAreaView>
            <View style={styles.container} onPress={toggleModal}>
                <Modal isVisible={isVisible}>
                    <View style={styles.view}>
                        <Text style={styles.title}>FullName: {userInfo?.firstname +" "+ (userInfo.lastname || '')}</Text>
                        <Text style={styles.title}>Email: {userInfo?.email}</Text>
                        <Text style={styles.title}>Phone Number: {userInfo?.country_code+ " " + userInfo?.phone_number }</Text>
                        <Text style={styles.title}>Address: {userInfo?.address}</Text>
                    </View>
                <Button title="close" onPress={toggleModal} />
                </Modal>
            </View>
        </SafeAreaView>
    )
}

export default ModalComponent

const styles=StyleSheet.create({
    container:{
        margin:30,
        top:20
    },
    view:{
        backgroundColor:"lightgrey",
        paddingTop:20,
        paddingBottom:20,
        borderRadius:8
    },title:{
        textAlign:"center",
        margin:2
    }
})