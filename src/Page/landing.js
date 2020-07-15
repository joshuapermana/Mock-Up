'use strict';
import React, { Component } from 'react';
import { AppRegistry, SafeAreaView, PermissionsAndroid, ActivityIndicator, Picker, TouchableNativeFeedback, Dimensions, Linking, KeyboardAvoidingView, Alert, RefreshControl, TouchableHighlight, BackHandler, Text, FlatList, ImageBackground, View, StatusBar, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, TouchableHighlightBase, TouchableOpacityBase, } from "react-native";
import Modal from 'react-native-modalbox';
import { Icon, } from "native-base";
let arr = []
let filtered = []
export default class landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction: [],
            convert: [],
            searchMode: false,
            keyword: '',
            detailTrans:[]
        };
        this.tempHold = []
    }

    componentDidMount() {
        this.mainContent()
    }
    mainContent() {
        var url = 'https://nextar.flip.id/frontend-test';
        return fetch(url, {
            method: 'GET',
            headers: {
            },
        })
            .then(res => res.json())
            .then(response => {
                this.setState({ transaction: response })
                this.tempHold = response
                this.cOa()
            });
    }
    cOa() {
        Object.keys(this.tempHold).map((d, key) => {
            arr.push(this.tempHold[d])
            // console.log(arr);
        })
    }
    search() {
        filtered.length = []
        const newData = arr.filter(item => {
            const itemData = `${item.beneficiary_name.toUpperCase()}`;
            const itemBank = `${item.sender_bank.toUpperCase()}`
            const itemAmount = `${item.amount}`
            const textData = this.state.keyword.toUpperCase();
            console.log(itemData)
            return (
                itemData.indexOf(textData) > -1 ||
                itemBank.indexOf(textData) > -1 ||
                itemAmount.indexOf(textData) > -1
            )
        });
        this.setState({
            searchMode: true,
        });
        filtered.push(newData)
    };
    AscName() {
        filtered.length = []
        this.setState({
            searchMode: true,
        });
        const sort = arr.sort((a, b) => {
            return a.beneficiary_name.localeCompare(b.beneficiary_name)
        })
        filtered.push(sort)
        this.refs.filter.close()
        console.log(sort)
    }
    DscName() {
        filtered.length = []
        this.setState({
            searchMode: true,
        });
        const sort = arr.sort((a, b) => {
            return b.beneficiary_name.localeCompare(a.beneficiary_name)
        })
        filtered.push(sort)
        this.refs.filter.close()
    }
    AscDate() {

        filtered.length = []
        this.setState({
            searchMode: true,
        });
        const sort = arr.sort((a, b) => {
            return a.created_at - b.created_at
        })
        filtered.push(sort)
        this.refs.filter.close()
    }
    DscDate() {

        filtered.length = []
        this.setState({
            searchMode: true,
        });
        const sort = arr.sort((a, b) => {
            return b.created_at - a.created_at
        })
        filtered.push(sort)
        this.refs.filter.close()
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
    render() {
        const { navigation } = this.props;
        const { keyword } = this.state;
        return (
            <SafeAreaView style={{ backgroundColor: '#f5f5f5', flex: 1, }}>
                <ScrollView>
                    <View style={{ margin: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ height: 50, justifyContent: 'center', backgroundColor: 'white', paddingLeft: 5 }}>

                                <Icon type="AntDesign" name="search1" style={{ color: '#f36341', fontSize: 20, backgroundColor: 'white', }} />
                            </View>
                            <TextInput
                                placeholder="Cari nama, bank atau nominal"
                                value={keyword}
                                onChangeText={keyword => { keyword.length == 0 ? this.setState({ searchMode: false, keyword: '' }) : this.setState({ keyword }) }}
                                style={{ backgroundColor: 'white', height: 50, width: '85%', fontSize: 12, paddingLeft: 10, }}
                                autoCorrect={false}
                                onEndEditing={() => this.search()}
                            />
                            {
                                this.state.keyword == "" ?
                                    <TouchableOpacity onPress={() => { this.refs.filter.open() }} style={{ width: '10%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                                        <Icon type="AntDesign" name="filter" style={{ color: '#f36341', fontSize: 20, backgroundColor: 'white' }} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => { this.setState({ searchMode: false, keyword: '' }) }} style={{ width: '10%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                                        <Icon type="AntDesign" name="closecircle" style={{ color: '#f36341', fontSize: 20, backgroundColor: 'white' }} />
                                    </TouchableOpacity>

                            }
                        </View>
                        <View style={{}}>
                            {this.state.searchMode == false ?
                                <View>
                                    {
                                        Object.keys(this.state.transaction).map((d, key) => {
                                            return (
                                                <TouchableOpacity onPress={() => {navigation.navigate('detailPage',{detail:this.state.transaction[d]})}}>
                                                    <View style={{ width: '100%', height: 90, backgroundColor: 'white', marginTop: 20, borderRadius: 10, flexDirection: 'row' }}>
                                                        {
                                                            this.state.transaction[d].status == "SUCCESS" ?
                                                                <View style={{ width: '4%', height: '100%', backgroundColor: '#79d988', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}/>
                                                                :
                                                                <View style={{ width: '4%', height: '100%', backgroundColor: '#f36341', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}/>
                                                        }
                                                        <View style={{ width: '95%', height: '100%', padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                                                            <View style={{ width: '70%', height: '100%', justifyContent: 'center' }}>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                    <Text style={styles.textBank}>{this.state.transaction[d].sender_bank}</Text>
                                                                    <Icon type="AntDesign" name="arrowright" style={{ color: 'black', fontSize: 10, marginRight: 5, marginLeft: 5 }} />
                                                                    <Text style={styles.textBank}>{this.state.transaction[d].beneficiary_bank}</Text>
                                                                </View>
                                                                <Text style={styles.textNama}>{this.state.transaction[d].beneficiary_name}</Text>
                                                                <Text style={styles.textNama}>{this.formatM(this.state.transaction[d].amount)} <Icon type="Entypo" name="dot-single" style={{ color: 'black', fontSize: 15, marginRight: 5, marginLeft: 5,fontWeight:'bold' }} /> {this.parWaktu(this.state.transaction[d].created_at)}</Text>
                                                            </View>
                                                            <View style={{ width: '30%', height: '100%', alignItems: 'center', justifyContent: 'center', padding: 10 }}>

                                                                {
                                                                    this.state.transaction[d].status == "SUCCESS" ?
                                                                        <View style={{ width: '100%', height: 40, borderRadius: 5, backgroundColor: '#79d988', justifyContent: 'center', alignItems: 'center' }}>
                                                                            <Text style={styles.textStatus, { color: 'white' }}>{this.state.transaction[d].status}</Text>
                                                                        </View>
                                                                        :
                                                                        <View style={{ width: '100%', height: 40, borderRadius: 5, borderWidth: 1, borderColor: '#f36341', justifyContent: 'center', alignItems: 'center' }}>
                                                                            <Text style={styles.textStatus, { color: '#f36341' }}>{this.state.transaction[d].status}</Text>
                                                                        </View>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>

                                                </TouchableOpacity>
                                            )
                                        })
                                    }

                                </View>
                                :
                                <View>
                                    {
                                        filtered[0].map((d, key) => {
                                            return (
                                                <TouchableOpacity  onPress={() => {navigation.navigate('detailPage',{detail:d})}}>
                                                    <View style={{ width: '100%', height: 90, backgroundColor: 'white', marginTop: 20, borderRadius: 10, flexDirection: 'row' }}>
                                                        {
                                                            d.status == "SUCCESS" ?
                                                                <View style={{ width: '4%', height: '100%', backgroundColor: '#79d988', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}/>
                                                                :
                                                                <View style={{ width: '4%', height: '100%', backgroundColor: '#f36341', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}/>
                                                        }
                                                        <View style={{ width: '95%', height: '100%', padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                                                            <View style={{ width: '70%', height: '100%' }}>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                    <Text style={styles.textBank}>{d.sender_bank}</Text>
                                                                    <Icon type="AntDesign" name="arrowright" style={{ color: 'black', fontSize: 10, marginRight: 5, marginLeft: 5 }} />
                                                                    <Text style={styles.textBank}>{d.beneficiary_bank}</Text>
                                                                </View>
                                                                <Text style={styles.textNama}>{d.beneficiary_name}</Text> 
                                                                <Text style={styles.textNama}>{this.formatM(d.amount)} <Icon type="Entypo" name="dot-single" style={{ color: 'black', fontSize: 15, marginRight: 5, marginLeft: 5,fontWeight:'bold' }} /> {this.parWaktu(d.created_at)}</Text>
                                                            </View>
                                                            <View style={{ width: '30%', height: '100%', alignItems: 'center', justifyContent: 'center', padding: 10 }}>

                                                                {
                                                                    d.status == "SUCCESS" ?
                                                                        <View style={{ width: '100%', height: 40, borderRadius: 5, backgroundColor: '#79d988', justifyContent: 'center', alignItems: 'center' }}>
                                                                            <Text style={styles.textStatus, { color: 'white' }}>{d.status}</Text>
                                                                        </View>
                                                                        :
                                                                        <View style={{ width: '100%', height: 40, borderRadius: 5, borderWidth: 1, borderColor: '#f36341', justifyContent: 'center', alignItems: 'center' }}>
                                                                            <Text style={styles.textStatus, { color: '#f36341' }}>{d.status}</Text>
                                                                        </View>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }

                                </View>
                            }

                        </View>
                    </View>
                </ScrollView >
                <Modal
                    backButtonClose={true}
                    style={{ height: '50%', width: '70%', borderRadius: 10 }}
                    position={"center"}
                    ref={"filter"}
                    swipeToClose={false}
                >
                    <View style={{ height: '100%', width: '100%', padding: 10, justifyContent: 'center' }}>
                        <View style={{ height: '20%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Urut berdasarkan : </Text>
                        </View>
                        <View style={{ height: '20%', width: '100%', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.AscName()} style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
                                <Text>Nama A-Z</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: '20%', width: '100%', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.DscName()} style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
                                <Text>Nama Z-A</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: '20%', width: '100%', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
                                <Text>Tanggal Terbaru</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: '20%', width: '100%', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
                                <Text>Tanggal Terlama</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView >
        );
    }
}
const styles = StyleSheet.create({
    textBank: {
        fontSize: 14, fontFamily: 'Roboto', color: 'black', fontWeight: 'bold'
    },
    textNama: {
        fontSize: 14, fontFamily: 'Roboto', color: 'black',
    },
    textNominal: {
        fontSize: 10, fontFamily: 'Roboto', marginTop: 5, color: '#7D7D7D',
    },
    textStatus: {
        fontSize: 10, fontFamily: 'Roboto',
    },
})

