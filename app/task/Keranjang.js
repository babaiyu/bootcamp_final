import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, AsyncStorage, ActivityIndicator, FlatList, StatusBar, StyleSheet, Dimensions } from "react-native"
import { Container, Header, Content, Card, CardItem, Icon, ListItem, Item, Left, Body, Right, SwipeRow, Button, H1, Input, Footer, FooterTab } from "native-base"
import Swiper from 'react-native-swiper';
import { Col, Row, Grid } from "react-native-easy-grid"
import TimerCountdown from 'react-native-timer-countdown';
import CountDown from 'react-native-countdown-component';

export default class Keranjang extends Component {
	render() {
		return(
			<Container>
				<Header transparent>
					<Left><Text>Keranjang</Text></Left>
					<Right>
						<Button transparent onPress={()=> alert('Terimakasih telah berbelanja')}>
							<Icon name="barcode" style={{color: 'green'}} />
							<Text style={{color: 'green', marginLeft: 5}} >Check Out</Text>
						</Button>
					</Right>
				</Header>
				<Content padder style={{backgroundColor: '#f0f0f0'}} >
					<Card >
						<CardItem>
							<View style={{flexDirection: 'row'}}>
								<View>
									<Image source={{uri: 'https://ecs7.tokopedia.net/img/cache/700/catalog/2017/7/28/20723476/20723476_e1750f60-c9f2-4cb1-8f24-e44bc6e80e52.png'}} style={{width: 100, height: 100}} />
								</View>
								<View style={{flexDirection: 'column', marginLeft: 20}}>
									<Text>Asus ROCK</Text>
									<Text note style={{color: 'red'}}>Rp. 8.000.000</Text>
									<Text note>2 Qty</Text>
								</View>
							</View>
							<Text style={{alignItems: 'flex-end', translateX: -40, marginTop: 100}}>Total: Rp. 16.000.000</Text>
						</CardItem>
					</Card>
				</Content>
				<Footer>
					<FooterTab style={{backgroundColor: '#f0f0f0'}}>
						<Button vertical onPress={()=> this.props.navigation.navigate('HomePage')}>
							<Icon name="home" />
							<Text note>Home</Text>
						</Button>
						<Button vertical active style={{backgroundColor: '#f0f0f0'}} onPress={()=> this.props.navigation.navigate('Keranjang')}>
							<Icon active name="cart" style={{color: '#101010'}} />
							<Text note>Keranjang</Text>
						</Button>
						<Button vertical onPress={()=> this.props.navigation.navigate('Akun')}>
							<Icon name="person" />
							<Text note>Akun</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		)
	}
}