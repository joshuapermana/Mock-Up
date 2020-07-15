'use strict';
import React, { Component } from 'react';
import { AppRegistry,Clipboard,ToastAndroid, SafeAreaView, PermissionsAndroid, ActivityIndicator, Picker, TouchableNativeFeedback, Dimensions, Linking, KeyboardAvoidingView, Alert, RefreshControl, TouchableHighlight, BackHandler, Text, FlatList, ImageBackground, View, StatusBar, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, TouchableHighlightBase, TouchableOpacityBase, } from "react-native";
import Modal from 'react-native-modalbox';
import { Icon, } from "native-base";

export default class detailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            close: false
        };
        this.arrayholder = []
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params)
    }
    formatM(num) {
        return 'Rp. ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    parWaktu(waktu) {
        var timeStr = waktu,
            temp = timeStr.split(" ")[0].split("-").reverse(),
            newFormat;
        newFormat = temp.join("-");
        if (newFormat.charAt(0) === "0") {
            newFormat = newFormat.slice(0);
        }
        return newFormat
    }
    showToast = () => {
        ToastAndroid.show("Copied", ToastAndroid.SHORT);
      };    
    render() {
        const { navigation } = this.props;
        const { params } = this.props.navigation.state;
        return (
            <SafeAreaView style={{ backgroundColor: '#fAFAFA', flex: 1 }}>
                <View style={{ width: '100%', height: 50, backgroundColor: 'white', padding: 10, justifyContent: 'space-between', elevation: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon type="Ionicons" name="ios-arrow-back-sharp" style={{ color: '#f36341', fontSize: 23, marginRight: 5, marginLeft: 5 }} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'Roboto', fontSize: 14 }}>Detail Transaction</Text>
                    </View>
                    <View />
                </View>
                <View style={{ margin: 20 }}>
                    <View style={{ backgroundColor: 'white', width: '100%', padding: 20, alignItems: 'center', borderRadius: 5,flexDirection:'row' }}>
                        <Text style={styles.textReg}>ID TRANSAKSI: #{params.detail.id} </Text>
                        <TouchableOpacity onPress={() => {Clipboard.setString(params.detail.id),this.showToast()}}>
                            <Icon type="Feather" name="copy" style={{ color: '#f36341', fontSize: 14, marginRight: 5, marginLeft: 5 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: 'white', width: '100%', padding: 20, justifyContent: 'center', borderRadius: 5, marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.textReg}>DETAIL TRANSAKSI</Text>
                            {
                                this.state.close == true ?
                                    <TouchableOpacity onPress={() => this.setState({ close: false })}>
                                        <Text style={styles.textStatus, { color: '#f36341' }}>BUKA</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => this.setState({ close: true })}>
                                        <Text style={styles.textStatus, { color: '#f36341' }}>TUTUP</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                        <View>
                            {this.state.close == false ?
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.textTransfer}>{params.detail.sender_bank}</Text>
                                        <Icon type="AntDesign" name="arrowright" style={{ color: 'black', fontSize: 20, marginRight: 5, marginLeft: 5 }} />
                                        <Text style={styles.textTransfer}>{params.detail.beneficiary_bank}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:20 }}>
                                        <View>
                                            <Text style={styles.textNama}>{params.detail.beneficiary_name}</Text>
                                            <Text style={styles.textStatus}>{params.detail.account_number}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.textNama}>NOMINAL</Text>
                                            <Text style={styles.textStatus}>{this.formatM(params.detail.amount)}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:20 }}>
                                        <View>
                                            <Text style={styles.textNama}>BERITA TRANSFER</Text>
                                            <Text style={styles.textStatus}>{params.detail.remark}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.textNama}>KODE UNIK</Text>
                                            <Text style={styles.textStatus}>{params.detail.unique_code}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:20 }}>
                                        <View>
                                            <Text style={styles.textNama}>WAKTU DIBUAT</Text>
                                            <Text style={styles.textStatus}>{this.parWaktu(params.detail.created_at)}</Text>
                                        </View>
                                    </View>
                                </View>
                                :
                                null
                            }
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    textReg: {
        fontSize: 14, fontFamily: 'Roboto', color: 'black', fontWeight: 'bold'
    },
    textNama: {
        fontSize: 14, fontFamily: 'Roboto', color: 'black', fontWeight: 'bold'
    },
    textNominal: {
        fontSize: 10, fontFamily: 'Roboto', marginTop: 5, color: '#7D7D7D',
    },
    textStatus: {
        fontSize: 12, fontFamily: 'Roboto', fontWeight: 'bold'
    },
    textTransfer: {
        fontSize: 18, fontFamily: 'Roboto', color: 'black', fontWeight: 'bold'
    },
})
