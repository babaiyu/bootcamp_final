import React, { Component } from 'react'
import { Text, View, Image, ImageBackground, TouchableOpacity, AsyncStorage, Dimensions, StyleSheet } from 'react-native'
import { Card, Content, Container, Grid, Row, Button, Icon } from 'native-base'
import axios from 'axios'
import Star from 'react-native-star-view';
import { GET_FAVORIT, USER } from '../actions/video';
import { connect } from 'react-redux'
import ip from '../config'
import LinearGradient from 'react-native-linear-gradient';
import { Col } from 'react-native-easy-grid';
import IconI from 'react-native-vector-icons/Ionicons'
const { width } = Dimensions.get('window')



class CardFavorite extends Component {

    state = {
        favorit: false,
        isLogin: this.props.isLogin,
        isLoading: false,
        height: Dimensions.get('window').height,
        focus: this.props.focus,
    }

    favorit = async (item) => {

        const token = await AsyncStorage.getItem('token')

        if (token != null) {
            console.log(item)
            await axios.post(ip + '/user/favorite',
                {
                    series: item
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    },
                }

            ).then(() =>
                this.setState({ favorit: !this.setState.favorit })
            ).catch((error) => {
                console.log(error)
            })
        }
    }

    showFavorit(item) {
        if (this.props.favorite.results.name_series === item.item.series) {
            return (
                <TouchableOpacity disabled={!this.state.isLogin} onPress={() => this.favorit(item.series)}>
                    <View style={{ height: 30, width: null, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopColor: '#D8368C', borderTopWidth: 2 }}>
                        <Text style={{ color: '#D8368C', fontFamily: 'Roboto-Medium', fontSize: 10 }}>
                            Favorit
                    </Text>
                        <Image source={require('../assets/icon/done.png')} style={{ height: 12, width: 12, marginLeft: 5 }} />
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity disabled={!this.state.isLogin} onPress={() => this.favorit(item.item.series)}>
                    <View style={{ height: 30, width: null, backgroundColor: this.state.isLogin ? '#D8368C' : '#929292', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                        <Text style={{ color: 'white', fontFamily: 'Roboto-Medium', fontSize: 10 }}>
                            Add to Favorit
                    </Text>
                        <Image source={require('../assets/icon/add.png')} style={{ height: 12, width: 12, marginLeft: 5 }} />
                    </View>
                </TouchableOpacity>
            )

        }
    }




    static getDerivedStateFromProps(nextProps, prevState) {


        if (nextProps.focus !== "" && (nextProps.focus && nextProps.focus.id) !== (prevState.focus && prevState.focus.id)) {

            return {
                focus: nextProps.focus
            };
        }

        return null;
    }

    render() {
        console.log(this.props.active.data)
        const { item } = this.props
        return (
            <Content style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'transparent', borderWidth: 0, margin: 5, borderColor: 'transparent', width: null, height: 170 }}>

                    <ImageBackground style={{ width: null, height: 150 }} source={{ uri: item.image_url }} imageStyle={this.props.active.data === item.series && { borderWidth: 2, borderColor: '#fff' }}>

                        {this.props.active.data === item.series && <View style={styles.talkBubbleTriangle} />}

                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', marginLeft: 2, margin: 2, marginBottom: 2, height: 40, width: null }}>
                                <View style={{ height: null, width: 110 }}>
                                    <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 12, color: 'white', marginLeft: 5 }}>
                                        {item.series.substring(0, 24)}...
                                    </Text>
                                </View>

                                <Star score={item.rating / 2} style={{ width: 40, height: 8, marginLeft: 5 }} />

                            </View>
                        </View>
                    </ImageBackground>
                </View>

            </Content>

        )
    }
}

const mapStateToProps = (state) => ({
    favorite: state.favoriteReducers,
    active: state.activeReducers
})

export default connect(mapStateToProps)(CardFavorite)

var styles = StyleSheet.create({
    linearGradient: {
        height: 200,
        width: null,
        paddingLeft: 15,
        paddingRight: 15,
        position: 'relative'
    },
    talkBubbleTriangle: {
        position: 'absolute',
        bottom: -26,
        left: 45,
        top: 150,
        width: 0,
        height: 0,
        borderTopColor: '#fff',
        borderTopWidth: 8,
        borderRightWidth: 12,
        borderLeftWidth: 12,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomWidth: 26,
        borderBottomColor: 'transparent'
    }
});
