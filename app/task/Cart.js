import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, AsyncStorage, ActivityIndicator, FlatList, StatusBar } from "react-native"
import { Container, Header, Content, Card, CardItem, Icon, ListItem, Item, Left, Body, Right, SwipeRow, Button, H1 } from "native-base"

import { connect } from 'react-redux'
import { GET_ORDERS, GET_PRODUCTS } from "../actions/video";
import axios from "axios";

class Cart extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
		  isLoading: false,
		}
	}
	
	
	componentDidMount() {
		this.props.dispatch(GET_ORDERS())
		this.props.dispatch(GET_PRODUCTS())
		alert(JSON.stringify(this.props.orders.results))
	}
	
	
	render() {
		return(
			<Container>
				<Content padder>
					<H1 style={{marginBottom: 25}}>Cart</H1>
						{this.props.orders.isLoading
                  ?
                  <ActivityIndicator />
                  :
                  <FlatList
                    data={ this.props.orders.results }
                    renderItem={({item, key}) =>
                        <SwipeRow key={key}
							  rightOpenValue={-75}
							  body={
								<View style={{ flexDirection: 'row' }}>
								  <View style={{ height: 90, marginLeft: 10, justifyContent: 'center' }}>
									<View>
									  <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 16 }}>
										Total Shop = {item.qty}
									  </Text>
									  <Text note>Total Price = {item.price}</Text>
									</View>
								  </View>
								</View>
								/* {this.props.products.results.map((item, key)=> {
									<View key={key}>
										
									</View>
								}} */
							  }
							  right={
								<Button full danger>
								  <Icon active name="trash" />
								</Button>
							  }
							/>
						}
						ListEmptyComponent={
						<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
						  <Image source={require('../assets/img/cone.png')} style={{width: 150, height: 150}} />
						  <Text style={{fontWeight: 'bold'}}>Oops you have not any favorites anime in list</Text>
						  <Text note>back to Home and select your favorites anime</Text>
						</View>}
					  />
					}
						
						
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
  orders: state.ordersReducer,
  products: state.productsReducer
})


export default connect(mapStateToProps)(Cart)