import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, AsyncStorage, ActivityIndicator, FlatList, StatusBar, StyleSheet, Dimensions, TextInput } from "react-native"
import { Container, Header, Content, Card, CardItem, Icon, ListItem, Item, Left, Body, Right, SwipeRow, Button, H1, Input, Footer, FooterTab, Form, Label } from "native-base"
import Swiper from 'react-native-swiper';
import { Col, Row, Grid } from "react-native-easy-grid"
import TimerCountdown from 'react-native-timer-countdown';
import CountDown from 'react-native-countdown-component';

export default class Login extends Component {
	render() {
		return (
			<Container>
				<Header transparent>
					<Left><Text>Masuk</Text></Left>
					<Right>
						<Button transparent onPress={()=> this.props.navigation.navigate('Register')}>
							<Text style={{color: 'green'}}>Daftar</Text>
						</Button>
					</Right>
				</Header>
				<Content padder style={{backgroundColor: '#f0f0f0'}}>
							<Form style={{marginBottom: 40}}>
								<Item floatingLabel>
									<Label>Email</Label>
									<TextInput
									   underlineColorAndroid="transparent"
									   placeholder="Your Placeholder"
									 />
								</Item>
								<Item floatingLabel>
									<Label>Kata Sandi</Label>
									<TextInput
									   underlineColorAndroid="transparent"
									   placeholder="Your Placeholder"
									 />
								</Item>
							</Form>
							<Button full style={{backgroundColor: 'green', borderRadius: 5}} onPress={()=> this.props.navigation.navigate('HomePage')}>
								<Text style={{color: '#fff'}}>Masuk</Text>
							</Button>
							
							<Text style={{marginBottom: 10, marginTop: 50}}>Atau masuk dengan:</Text>
							
							<Button full bordered style={{marginBottom: 10, borderRadius: 15, borderColor: 'grey'}}><Icon name="aperture" /><Text>Google</Text></Button>
							<Button full bordered style={{marginBottom: 10, borderRadius: 15, borderColor: 'grey'}}><Icon name="git-branch" /><Text>Github</Text></Button>
				</Content>
			</Container>
		)
	}
}