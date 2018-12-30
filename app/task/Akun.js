import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, AsyncStorage, ActivityIndicator, FlatList, StatusBar, StyleSheet, Dimensions } from "react-native"
import { Container, Header, Content, Card, CardItem, Icon, ListItem, Item, Left, Body, Right, SwipeRow, Button, H1, Input, Footer, FooterTab, Thumbnail } from "native-base"
import Swiper from 'react-native-swiper';
import { Col, Row, Grid } from "react-native-easy-grid"

export default class Akun extends Component {
	render() {
		return(
			<Container>
				<Header />
				<Content>
					<Card>
						<CardItem>
							<Left>
								<Text>User name</Text>
								<Text note>User is Verified</Text>
							</Left>
						</CardItem>
					</Card>
				</Content>
				<Footer>
					<FooterTab style={{backgroundColor: '#f0f0f0'}}>
						<Button vertical onPress={()=> this.props.navigation.navigate('HomePage')}>
							<Icon name="home" />
							<Text note>Home</Text>
						</Button>
						<Button vertical onPress={()=> this.props.navigation.navigate('Keranjang')}>
							<Icon name="cart" />
							<Text note>Keranjang</Text>
						</Button>
						<Button vertical active style={{backgroundColor: '#f0f0f0'}} onPress={()=> this.props.navigation.navigate('Akun')}>
							<Icon active style={{color: '#101010'}} name="person" />
							<Text note>Akun</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		)
	}
}