import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, AsyncStorage, ActivityIndicator, FlatList, StatusBar, StyleSheet, Dimensions, TextInput } from "react-native"
import { Container, Header, Content, Card, CardItem, Icon, ListItem, Item, Left, Body, Right, SwipeRow, Button, H1, Input, Footer, FooterTab, Form, Label } from "native-base"
import Swiper from 'react-native-swiper';
import { Col, Row, Grid } from "react-native-easy-grid"
import TimerCountdown from 'react-native-timer-countdown';
import CountDown from 'react-native-countdown-component';

import { connect } from 'react-redux'
import { GET_PRODUCTS } from "../actions/video";
import axios from "axios";

class Product extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			isLoading: false,
			data: [
				{
					name: 'Asus ROG',
					price: '9000',
					image_url: 'https://images-na.ssl-images-amazon.com/images/I/81fAWl4QZKL._SX425_.jpg'
				},
				{
					name: 'Acer Predator',
					price: '8000',
					image_url: 'https://static.acer.com/up/Resource/Acer/Predator_Minisite/Header/20171011/Predator_Helios_300.png'
				},
				{
					name: 'Surface Pro',
					price: '9999999',
					image_url: 'https://icdn2.digitaltrends.com/image/surface-pro-6-press-1200x630-c-ar1.91.jpg'
				},
			],
		}
	}
	render() {
		return(
			<Container>
				<Content>
						<FlatList
							data={ this.state.data }
							renderItem={({item, key}) =>
								<Card key={key}>
									<CardItem>
										<View style={{flexDirection: 'row'}}>
											<View>
												<Image source={{uri: item.image_url}} style={{width: 100, height: 100}} />
											</View>
											<View style={{flexDirection: 'column', marginLeft: 20}}>
												<Text>{item.name}</Text>
												<Text note style={{color: 'red'}}>{item.price}</Text>
											</View>
										</View>
										<Text style={{alignItems: 'flex-end', translateX: -40, marginTop: 100}}>Tambahkan ke keranjang</Text>
									</CardItem>
								</Card>
							}
							
						/>
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
  products: state.productsReducer
})


export default connect(mapStateToProps)(Product)