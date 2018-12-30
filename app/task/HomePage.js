import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, AsyncStorage, ActivityIndicator, FlatList, StatusBar, StyleSheet, Dimensions } from "react-native"
import { Container, Header, Content, Card, CardItem, Icon, ListItem, Item, Left, Body, Right, SwipeRow, Button, H1, Input, Footer, FooterTab } from "native-base"
import Swiper from 'react-native-swiper';
import { Col, Row, Grid } from "react-native-easy-grid"
import TimerCountdown from 'react-native-timer-countdown';
import CountDown from 'react-native-countdown-component';
import { connect } from 'react-redux'
import { GET_PRODUCTS } from "../actions/video";
import axios from "axios";

const { width } = Dimensions.get('window')

class HomePage extends Component {	
	
	render() {
		return(
			<Container>
				<StatusBar
					hidden
				/>
				<Header searchBar rounded style={{backgroundColor: '#f0f0f0'}}>
				  <Item onPress={()=> alert('Hai')}>
					<Icon name="ios-search" />
					<Input placeholder="Cari" disabled />
				  </Item>
				  <Button transparent>
					<Text>Search</Text>
				  </Button>
				</Header>
				<Content>
					<Image source={{uri: 'https://ecs7.tokopedia.net/img/cache/1242/banner/2018/12/21/25618007/25618007_17ff97b7-c0d0-4e93-9c33-de5e155212ea.jpg'}} style={{width, height: 200 }} />
						<View style={{backgroundColor: '#f0f0f0'}}>
							<Grid>
								<Row style={{ marginTop: 10, marginBottom: 10}}>
									<Col style={{alignItems: 'center'}} onPress={()=> this.props.navigation.navigate('Product')}><Icon name="laptop" /><Text note>Laptop</Text></Col>
									<Col style={{alignItems: 'center'}} onPress={()=> this.props.navigation.navigate('Product')}><Icon name="card" /><Text note>Kredit</Text></Col>
									<Col style={{alignItems: 'center'}} onPress={()=> this.props.navigation.navigate('Product')}><Icon name="checkbox" /><Text note>Official</Text></Col>
									<Col style={{alignItems: 'center'}} onPress={()=> this.props.navigation.navigate('Product')}><Icon name="analytics" /><Text note>Pinjaman</Text></Col>
									<Col style={{justifyContent: 'center', alignItems: 'center', flex: 1}} onPress={()=> this.props.navigation.navigate('Product')}><Icon name="car" /><Text note>Mobil</Text></Col>
								</Row>
								<Row style={{ marginTop: 10, marginBottom: 10}}>
									<Col style={{alignItems: 'center'}} onPress={()=> this.props.navigation.navigate('Product')}><Icon name="train" /><Text note>Kereta</Text></Col>
									<Col style={{alignItems: 'center'}} onPress={()=> this.props.navigation.navigate('Product')}><Icon name="bluetooth" /><Text note>BlueTooth</Text></Col>
									<Col style={{alignItems: 'center'}} onPress={()=> this.props.navigation.navigate('Product')}><Icon name="pizza" /><Text note>Makanan</Text></Col>
									<Col style={{alignItems: 'center'}} onPress={()=> this.props.navigation.navigate('Product')}><Icon name="phone-portrait" /><Text note>Handphone</Text></Col>
									<Col style={{alignItems: 'center'}} onPress={()=> this.props.navigation.navigate('Product')}><Icon name="grid" /><Text note>Lainnya</Text></Col>
									
								</Row>
							</Grid>
						</View>
						
					<View style={{marginTop: 10}}>
						<View>
							<Grid>
								<Col>
									<Text style={{fontSize: 20, marginLeft: 10}}>Flash Shale</Text>
								</Col>
								<Col>
									<CountDown
										until={999999}
										onFinish={() => alert('finished')}
										onPress={() => alert('hello')}
										size={15}
									/>
								</Col>
							</Grid>
						</View>
						<Grid style={{marginTop: 10, marginBottom: 10}}>
							<Row>
								<Col onPress={()=> this.props.navigation.navigate('Product')} style={{alignItems: 'center'}}><Image style={{width: 100, height: 100}} source={{uri: 'https://ecs7.tokopedia.net/img/cache/700/catalog/2017/7/28/20723476/20723476_e1750f60-c9f2-4cb1-8f24-e44bc6e80e52.png'}} />
									<Text note style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>Rp. 10.000.000</Text>
									<Text style={{color: 'red'}}>Rp 8.199.999</Text>
								</Col>
								<Col onPress={()=> this.props.navigation.navigate('Product')} style={{alignItems: 'center'}}><Image style={{width: 100, height: 100, alignItems: 'center'}} source={{uri: 'https://ecs7.tokopedia.net/img/cache/700/catalog/2017/7/28/20723476/20723476_e1750f60-c9f2-4cb1-8f24-e44bc6e80e52.png'}} />
									<Text note style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>Rp. 10.000.000</Text>
									<Text style={{color: 'red'}}>Rp 8.199.999</Text>
								</Col>
								<Col onPress={()=> this.props.navigation.navigate('Product')} style={{alignItems: 'center'}}><Image style={{width: 100, height: 100, alignItems: 'center'}} source={{uri: 'https://ecs7.tokopedia.net/img/cache/700/catalog/2017/7/28/20723476/20723476_e1750f60-c9f2-4cb1-8f24-e44bc6e80e52.png'}} />
									<Text note style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>Rp. 10.000.000</Text>
									<Text style={{color: 'red'}}>Rp 8.199.999</Text>
								</Col>
							</Row>
							<Row>
								<Col onPress={()=> this.props.navigation.navigate('Product')} style={{alignItems: 'center'}}><Image style={{width: 100, height: 100, alignItems: 'center'}} source={{uri: 'https://ecs7.tokopedia.net/img/cache/700/catalog/2017/7/28/20723476/20723476_e1750f60-c9f2-4cb1-8f24-e44bc6e80e52.png'}} />
									<Text note style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>Rp. 10.000.000</Text>
									<Text style={{color: 'red'}}>Rp 8.199.999</Text>
								</Col>
								<Col onPress={()=> this.props.navigation.navigate('Product')} style={{alignItems: 'center'}}><Image style={{width: 100, height: 100, alignItems: 'center'}} source={{uri: 'https://ecs7.tokopedia.net/img/cache/700/catalog/2017/7/28/20723476/20723476_e1750f60-c9f2-4cb1-8f24-e44bc6e80e52.png'}} />
									<Text note style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>Rp. 10.000.000</Text>
									<Text style={{color: 'red'}}>Rp 8.199.999</Text>
								</Col>
								<Col onPress={()=> this.props.navigation.navigate('Product')} style={{alignItems: 'center'}}><Image style={{width: 100, height: 100, alignItems: 'center'}} source={{uri: 'https://ecs7.tokopedia.net/img/cache/700/catalog/2017/7/28/20723476/20723476_e1750f60-c9f2-4cb1-8f24-e44bc6e80e52.png'}} />
									<Text note style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>Rp. 10.000.000</Text>
									<Text style={{color: 'red'}}>Rp 8.199.999</Text>
								</Col>
							</Row>
						</Grid>
					</View>
						
					<View style={{marginTop: 10}}>
						<Text style={{fontSize: 18}}>Kategori Pilihan</Text>
						<Grid style={{marginTop: 10, marginBottom: 10}}>
							<Row>
								<Col onPress={()=> this.props.navigation.navigate('Product')} style={{alignItems: 'center'}}><Image style={{width: 100, height: 100}} source={{uri: 'https://brain-images-ssl.cdn.dixons.com/9/4/10180949/u_10180949.jpg'}} />
									<Text>Laptop</Text>
								</Col>
								<Col onPress={()=> this.props.navigation.navigate('Product')} style={{alignItems: 'center'}}><Image style={{width: 100, height: 100, alignItems: 'center'}} source={{uri: 'https://www.cyberpowerpc.com/images/cs/p400/blkw_220.png?v3'}} />
									<Text>PC Gaming</Text>
								</Col>
								<Col onPress={()=> this.props.navigation.navigate('Product')} style={{alignItems: 'center'}}><Image style={{width: 100, height: 100, alignItems: 'center'}} source={{uri: 'https://images.duniamasak.com/images/11480/kulkas-polytron-prm21-maroon-22550_521.png'}} />
									<Text>Kulkas</Text>
								</Col>
							</Row>
							<Row>
								<Col onPress={()=> this.props.navigation.navigate('Product')} style={{alignItems: 'center'}}><Image style={{width: 100, height: 100, alignItems: 'center'}} source={{uri: 'https://www.jakartanotebook.com/images/products/19/63/27854/2/tas-ransel-backpack-oxford-dengan-usb-charger-port-black-2.jpg'}} />
									<Text>Tas</Text>
								</Col>
								<Col onPress={()=> this.props.navigation.navigate('Product')} style={{alignItems: 'center'}}><Image style={{width: 100, height: 100, alignItems: 'center'}} source={{uri: 'https://dj7u9rvtp3yka.cloudfront.net/products/PIM-1526543382867-93b9d46a-7bba-4af8-acb5-5027e0d0ba32_v1-small.jpg'}} />
									<Text>Sepatu</Text>
								</Col>
								<Col onPress={()=> this.props.navigation.navigate('Product')} style={{alignItems: 'center'}}><Image style={{width: 100, height: 100, alignItems: 'center'}} source={{uri: 'https://image1ws.indotrading.com/s3/productimages/co23084/p405274/w300-h300/b4610afd-eaf4-4bff-a216-9513cb6a1bccw.jpg'}} />
									<Text>Beras</Text>
								</Col>
							</Row>
						</Grid>
					</View>
				</Content>
				<Footer>
					<FooterTab style={{backgroundColor: '#f0f0f0'}}>
						<Button vertical active style={{backgroundColor: '#f0f0f0'}}>
							<Icon active name="home" style={{color: '#101010'}} />
							<Text note>Home</Text>
						</Button>
						<Button vertical onPress={()=> this.props.navigation.navigate('Keranjang')}>
							<Icon name="cart" />
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

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  swipImage: {
	  width: 300,
	  height: 200
  }
})

const mapStateToProps = (state) => ({
  products: state.productsReducer
})


export default connect(mapStateToProps)(HomePage)