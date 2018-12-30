import React, { Component } from "react"
import { Text, View, Image, TouchableOpacity, AsyncStorage, ActivityIndicator, FlatList, StatusBar } from "react-native"
import { Container, Header, Content, Card, CardItem, Icon, ListItem, Item, Left, Body, Right, SwipeRow, Button, H1 } from "native-base"
import Star from 'react-native-star-view'
import deviceStorage from '../deviceStorage'
import { connect } from 'react-redux'
import { GET_FAVORIT } from "../actions/video";
import axios from "axios";
import ip from "../config";

class ProfileScreen extends Component {

  constructor(props) {

    super(props);
    this.state = {
      isLogin: false,
      isLoading: false,
      dataFavorite: [
         {
           title: 'cans',
         },
         {
           title: 'emang',
         },
         {
           title: 'kamu',
         },
         {
           title: 'semua',
         },
         {
           title: 'halo',
         },
      ]
    }

  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      this.props.dispatch(GET_FAVORIT(token))
      this.setState({ isLogin: true })
    } else {
      this.setState({ isLogin: false })
    }
  }

  loginLogout = async () => {
    this.setState({ isLoading: true })
    if (this.state.isLogin) {
      await AsyncStorage.removeItem('token').then(() =>
        this.props.navigation.push('Home'),
        this.setState({ isLoading: false })
      )
    } else {
      this.setState({ isLoading: false })
      this.props.navigation.navigate('LoginScreen')
    }
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  render() {
    console.log(this.props.favorite.results)
    return (
      <Container style={{ backgroundColor: '#232426' }}>
        <StatusBar
          backgroundColor='black'
          barStyle="light-content"
        />
        <Header transparent>
          <Left style={{justifyContent: 'center'}}>
            <Button transparent>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Right style={{alignItems: 'center'}}>
            <View style={{backgroundColor: 'transparent', borderWidth: 2, borderColor: '#e84393', borderRadius: 5, width: 100, height: 30, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#fff'}}>User Name</Text>
            </View>
            <Button transparent>
              <Icon name="ios-log-out" />
            </Button>
          </Right>
        </Header>
        <Content padder >
          <View style={{marginTop: 10, backgroundColor: '#232426' }}>
              {this.state.isLogin &&
                <View></View>
              }
              {this.state.isLogin ||
              <View>
                <Text note
                  style={{
                    fontFamily: "Roboto-Medium",
                    margin: 10,
                  }}
                >
                  Silahkan Login Untuk Dapat Menambahkan Ke List Favorite Dan Mendapatkan Update Terkini
                </Text>
              </View>
              }
              {/* <TouchableOpacity onPress={this.loginLogout}>
                <View
                  style={{
                    justifyContent: "flex-end",
                    flex: 1,
                    marginBottom: 20
                  }}
                >

                  <View
                    style={{
                      marginTop: 20,
                      width: 250,
                      height: 40,
                      backgroundColor: this.state.isLogin ? "red" : "green",
                      alignSelf: "center",
                      borderRadius: 20,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    {this.state.isLoading ? <ActivityIndicator /> :
                      <View>
                      <Text
                        style={{
                          fontFamily: "Roboto-Medium",
                          fontSize: 16,
                          color: "white"
                        }}
                      >
                        {this.state.isLogin ? "Logout" : "Login"}
                      </Text>
                      
                      </View>
                    }
                  </View>
                </View>
              </TouchableOpacity> */}
          

          {/* {this.state.isLogin &&
            <View>
              <Text
                style={{
                  fontFamily: "Roboto-Medium",
                  fontSize: 18,
                  marginLeft: 20,
                  color: 'black'
                }}
              >
                Favorite
            </Text>
              {/* <List
                leftOpenValue={75}
                rightOpenValue={-75}
                dataSource={this.props.favorite.results}
                renderRow={data =>
                  <ListItem>
                    <Text> {data.name_series} </Text>
                  </ListItem>}
                renderLeftHiddenRow={data =>
                  <Button full onPress={() => alert(data)}>
                    <Icon active name="information-circle" />
                  </Button>}
                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                  <Button full danger onPress={}>
                    <Icon active name="trash" />
                  </Button>}
              /> */}

                <H1 style={{color: '#fff', marginBottom: 25}}>Favorite List</H1>
                {this.props.favorite.isLoading
                  ?
                  <ActivityIndicator />
                  :
                  <FlatList
                    data={ this.props.favorite.results }
                    renderItem={({item, key}) =>
                        <SwipeRow key={key}
                          rightOpenValue={-75}
                          style={{backgroundColor: '#232426'}}
                          body={
                            <View style={{ flexDirection: 'row' }}>
                              <View style={{ height: 90, marginLeft: 10, justifyContent: 'center' }}>
                                <View>
                                  <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 16, color: '#fff' }}>
                                    {item.name_series}
                                  </Text>
                                </View>
                                <Star score={3} style={{ width: 90, height: 20, marginTop: 10 }} />

                              </View>
                            </View>
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
                      <Text style={{fontWeight: 'bold', color: '#fff'}}>Oops you have not any favorites anime in list</Text>
                      <Text note style={{color: '#f0f0f0'}}>back to Home and select your favorites anime</Text>
                    </View>}
                  />
                }
                
              

              {/* {this.state.dataFavorite.map((data, key)=> {
                if(key > 0) {
                  return (
                    <SwipeRow key={key}
                      rightOpenValue={-75}
                      body={
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ height: 90, marginLeft: 10, justifyContent: 'center' }}>
                            <View>
                              <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 16, }}>
                                {data.title}
                              </Text>
                            </View>
                            <Star score={3} style={{ width: 90, height: 20, marginTop: 10 }} />

                          </View>
                        </View>
                      }
                      right={
                        <Button full danger>
                          <Icon active name="trash" />
                        </Button>
                      }
                    />
                  
                  ) 
                } else if(key=0) {
                  return (
                    <View key={key} style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                      <Image source={require('../assets/img/cone.png')} style={{width: 150, height: 150}} />
                      <Text style={{fontWeight: 'bold', color: '#fff'}}>Oops you have not any favorites anime list</Text>
                      <Text note style={{color: '#f0f0f0'}}>back to Home and select your favorites anime</Text>
                    </View>
                  )
                }
              })} */}

              {/* {this.props.favorite.isLoading ? <ActivityIndicator /> : this.props.favorite.results.map((data, key)=> {
                if(this.props.favorite.results.length < 0)
                  return (
                    <SwipeRow key={key}
                      rightOpenValue={-75}
                      body={
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ height: 90, marginLeft: 10, justifyContent: 'center' }}>
                            <View>
                              <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 16, }}>
                                {data.name_series}
                              </Text>
                            </View>
                            <Star score={3} style={{ width: 90, height: 20, marginTop: 10 }} />

                          </View>
                        </View>
                      }
                      right={
                        <Button full danger>
                          <Icon active name="trash" />
                        </Button>
                      }
                    />
                  )

                  return (
                    

                    <View key={key} style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                      <Image source={require('../assets/img/cone.png')} style={{width: 150, height: 150}} />
                      <Text style={{fontWeight: 'bold', color: '#fff'}}>Oops you have not any favorites anime list</Text>
                      <Text note style={{color: '#f0f0f0'}}>back to Home and select your favorites anime</Text>
                    </View>

                  )
              })} */}

              {/* {this.props.favorite.isLoading ? <ActivityIndicator /> : this.props.favorite.results.map((data, key)=> {
                  return this.props.favorite.results.length < 0 ?
                    <SwipeRow key={key}
                      rightOpenValue={-75}
                      body={
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ height: 90, marginLeft: 10, justifyContent: 'center' }}>
                            <View>
                              <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 16, }}>
                                {data.name_series}
                              </Text>
                            </View>
                            <Star score={3} style={{ width: 90, height: 20, marginTop: 10 }} />

                          </View>
                        </View>
                      }
                      right={
                        <Button full danger>
                          <Icon active name="trash" />
                        </Button>
                      }
                    />
                    :
                    <View key={key} style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                      <Image source={require('../assets/img/cone.png')} style={{width: 150, height: 150}} />
                      <Text style={{fontWeight: 'bold', color: '#fff'}}>Oops you have not any favorites anime list</Text>
                      <Text note style={{color: '#f0f0f0'}}>back to Home and select your favorites anime</Text>
                    </View>
              })
              } */}

              {/* {this.props.favorite.isLoading ? <ActivityIndicator /> : this.props.favorite.results.map((data, key) => {
                
                return <SwipeRow key={key}
                  rightOpenValue={-75}
                  body={
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ height: 90, marginLeft: 10, justifyContent: 'center' }}>
                        <View>
                          <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 16, }}>
                            {data.name_series}
                          </Text>
                        </View>
                        <Star score={3} style={{ width: 90, height: 20, marginTop: 10 }} />

                      </View>
                    </View>
                  }
                  right={
                    <Button full danger>
                      <Icon active name="trash" />
                    </Button>
                  }
                />
              

              })} */}

          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  favorite: state.favoriteReducers
})


export default connect(mapStateToProps)(ProfileScreen)