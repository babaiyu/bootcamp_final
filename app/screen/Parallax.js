import React, { Component } from "react";
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Image,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  TouchableHighlight,
  Alert
} from "react-native";
import Star from "react-native-star-view";
import Video from "react-native-video";
const { width } = Dimensions.get("window");

import LinearGradient from "react-native-linear-gradient";
import Shimmer from "./Shimmer";
import CardFavorite from "../components/CardFavorite";
import IconI from "react-native-vector-icons/Ionicons";
import { POPULAR, ALL_VIDEOS, USER, DETAIL_VIDEO, ACTIVE } from "../actions/video";

import { connect } from "react-redux";
import axios from "axios";
import ip from "../config";

import IconA from "react-native-vector-icons/FontAwesome";

import { Header, Left, Body, Right, Icon, Content, Button,Col, Row, Grid  } from "native-base";

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

class Parallax extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
      ),
      refreshing: false,
      token: "",
      isLoading: false,
      isLogin: false,
      videos: 5,
      popular: 5,
      preview: false,
      slug: '',
      offset: 5,
      focus: '',
      data: {}
    };
  }
  

  async componentDidMount() {

    const token = await AsyncStorage.getItem('token')
    this.props.dispatch(POPULAR(this.state.popular))
    this.props.dispatch(ALL_VIDEOS(this.state.offset, this.state.videos))

    if (token) {

      // this.props.dispatch(GET_FAVORIT(token));

      this.setState({ isLogin: true, preview: false })

      const result = await axios.get(ip + '/user/profile', {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      this.props.dispatch(USER(result.data));
    } else {
      this.setState({ isLogin: false });
    }
  }

  loginLogout = () => {
    this.setState({ isLoading: true });

    if (this.state.isLogin) {
      Alert.alert(
        'Do you want logout ?',
        'u will dont have any add favorite and update again',
        [
          {
            text: 'OK', onPress: async () =>
              await AsyncStorage.removeItem("token").then(
                () => this.props.navigation.push("Home"),
                this.setState({ isLoading: false })
              )

          },
          { text: 'Cancel', onPress: () => this.setState({ isLoading: false }), style: 'cancel' },
        ],
        { cancelable: true }
      )

    } else {

      this.setState({ isLoading: false });
      this.props.navigation.navigate("LoginScreen");

    }
  };


  preview = async (series) => {

    data = series.replace(/\s+/g, "-").toLowerCase() + "-episode-1"

    this.setState({ preview: true, data: series })
    await this.props.dispatch(ACTIVE(series))
    await this.props.dispatch(DETAIL_VIDEO(data))

  }

  handleMorePopular = () => {
    this.setState({ popular: this.state.popular + 2 });
    this.props.dispatch(POPULAR(this.state.popular + 2));
  };

  footerComponent = () => {
    return (
      <FlatList
        keyExtractor={index => `index${index}`}
        data={[1, 2, 3]}
        numColumns={3}
        renderItem={() => (
          <Shimmer
            style={{ height: 180, width: 110, marginRight: 10 }}
            autoRun={true}
          />
        )}
      />
    );
  };

  sendState = () => {
    console.log(this.state.focus)
    return this.state.focus
  }

  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
      <View style={styles.scrollViewContent}>
        <Content padder>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text
              style={{
                alignSelf: "center",
                paddingHorizontal: 5,
                color: "#E0E0E0",
                fontFamily: "Roboto-Bold",
                fontSize: 16,
                fontWeight: "500"
              }}
            >
              New Release
            </Text>
          </View>

          <FlatList
            onEndReachedThreshold={0.7}
            onEndReached={this.handleMorePopular}
            keyExtractor={(item, index) => `index${index}`}
            horizontal={true}
            ListFooterComponent={this.footerComponent}
            data={this.props.popular.results}
            showsHorizontalScrollIndicator={false}
            emptyComponent={this.showShimmer1}
            renderPlaceholder
            renderItem={({ item }) => (

              <TouchableOpacity
                style={{ justifyContent: "center", alignItems: "center", flex: 1, marginRight: 10 }} onPress={() => this.preview(item.series)} >
                <CardFavorite item={item} {...this.props} />
              </TouchableOpacity>
            )}
          />

          {this.state.preview &&
            <View style={{
              height: null,
              width,
              marginTop: 5,
              marginRight: 20
            }}>
              <Video
                muted={true}
                ref={(ref) => {
                  this.player = ref
                }}
                paused={this.state.paused}
                source={{ uri: "https://r4---sn-4pgnuhxqp5-jb3r.googlevideo.com/videoplayback?id=16e9c24ff2516de7&itag=18&source=blogger&mm=31&mn=sn-4pgnuhxqp5-jb3r&ms=au&mv=m&pl=19&ei=530mXMbnNNKk-gPggLnABg&susc=bl&mime=video/mp4&dur=1457.980&lmt=1545885999346045&mt=1546026346&ip=139.193.70.16&ipbits=0&expire=1546055271&sparams=ip,ipbits,expire,id,itag,source,mm,mn,ms,mv,pl,ei,susc,mime,dur,lmt&signature=B1B74C31785CFF567C7BCC4D1B9E82C49DBF68DAEF1EBA22DDA84E8F000A9421.3DBB35FD1F78EF5D6512183F10CB5F833D2EE3118904A4D9F13248A458258567&key=us0&cpn=bjIvbGE831y8_Mb0&c=WEB_EMBEDDED_PLAYER&cver=20181220" }}
                style={styles.backgroundVideo} />
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#000', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']} style={styles.linearGradient}>

                <Content padder style={{ backgroundColor: 'transparent' }}>
                  {this.props.allVideo.isLoading ? <ActivityIndicator /> :
                    <Grid>
                      <Row>

                        <Col size={5}>
                          <Text style={{ fontFamily: 'Roboto', fontSize: 20, fontWeight: 'bold', color: '#FBFBFB' }}>
                            {this.props.allVideo.data.series}
                          </Text>
                        </Col>

                        {/* <Col size={1}>
                          <IconI onPress={() => this.setState({ preview: false })} name='ios-close' color='#FBFBFB' style={{ flex: 1, alignSelf: 'flex-end', marginRight: 5 }} size={35} />
                        </Col> */}

                      </Row>
                      <Row style={{ width: 230, marginBottom: 15 }}>

                        <Text
                          style={{
                            color: "#7D7D7D",
                      fontSize: 12,
                      textAlign: "justify"
                          }}
                        >
                          {this.props.allVideo.isLoading ? <ActivityIndicator /> : this.props.allVideo.data.description && this.props.allVideo.data.description.substring(7, 150)}

                        </Text>

                      </Row>
                      <Row>
                        <Col style={{ flexDirection: 'row' }}>
                          <Button style={{ width: null, height: 30, backgroundColor: '#E10916' }} onPress={() => this.props.navigation.push('VideoScreen', { series: this.state.data, isLogin: this.state.isLogin })}>

                            <IconI size={20} color='#FBFBFB' style={{ marginLeft: 10 }} name='md-play' />

                            <Text style={{ color: '#FBFBFB', fontWeight: 'bold', padding: 10 }}>
                              Play
                            </Text>

                          </Button>
                          {/* <TouchableOpacity>
                            <View style={{flexDirection: "row",
                                          height: 35,
                                          width: 90,
                                          marginRight: 20,
                                          backgroundColor: "rgba(0,0,0,0.5)",
                                          borderRadius: 6,
                                          justifyContent: "center",
                                          alignItems: "center"}}>
                                          <IconA
                                name="caret-right"
                                style={{ fontSize: 30 }}
                                color="white"
                              />
                              <Text
                                style={{
                                  color: "white",
                                  fontSize: 14,
                                  fontWeight: "500",
                                  marginLeft: 10
                                }}
                              >
                  Play
                </Text>
                                
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <View style={{
                                          height: 35,
                                          width: 90,
                                          borderRadius: 6,
                                          flexDirection: "row",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          backgroundColor: "#E84393"}}>
                                     <Image
                  source={require("../assets/icon/add.png")}
                  style={{ height: 16, width: 16 }}
                />
                <Text
                  style={{
                    color: "white",
                    fontWeight: "500",
                    fontFamily: "Roboto-Medium",
                    marginLeft: 10
                  }}
                >
                  Add
                </Text>    
                                
                            </View>
                          </TouchableOpacity> */}

                          <Button style={{ width: 70, marginLeft: 5, borderColor: '#FBFBFB', borderWidth: 1, height: 30, backgroundColor: 'transparent' }}>
                            <Image source={require('../assets/icon/add.png')} style={{ height: 12, width: 12, marginLeft: 5 }} />
                            <Text style={{ color: '#FBFBFB', fontWeight: 'bold' }}>Add</Text>
                            <Text></Text>

                          </Button>
                        </Col>
                      </Row>
                    </Grid>

                  }
                </Content>
              </LinearGradient>


              
            </View>
          }

        </Content>
        <Content padder>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                alignSelf: "center",
                paddingHorizontal: 5,
                color: "#E0E0E0",
                fontFamily: "Roboto-Bold",
                fontSize: 16,
                fontWeight: "500"
              }}
            >
              Most Popular
            </Text>
          </View>

          <FlatList
            onEndReachedThreshold={0.7}
            onEndReached={this.handleMorePopular}
            keyExtractor={(item, index) => `index${index}`}
            horizontal={true}
            ListFooterComponent={this.footerComponent}
            data={this.props.popular.results}
            showsHorizontalScrollIndicator={false}
            emptyComponent={this.showShimmer1}
            renderPlaceholder
            renderItem={({ item }) => (
              <CardFavorite item={item} {...this.props} />
            )}
          />
        </Content>
        <Content padder>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                alignSelf: "center",
                paddingHorizontal: 5,
                color: "#E0E0E0",
                fontFamily: "Roboto-Bold",
                fontSize: 16,
                fontWeight: "500"
              }}
            >
              Action
            </Text>
          </View>

          <FlatList
            onEndReachedThreshold={0.7}
            onEndReached={this.handleMorePopular}
            keyExtractor={(item, index) => `index${index}`}
            horizontal={true}
            ListFooterComponent={this.footerComponent}
            data={this.props.popular.results}
            showsHorizontalScrollIndicator={false}
            emptyComponent={this.showShimmer1}
            renderPlaceholder
            renderItem={({ item }) => (
              <CardFavorite item={item} {...this.props} />
            )}
          />
        </Content>


        <Content padder>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                alignSelf: "center",
                paddingHorizontal: 5,
                color: "#E0E0E0",
                fontFamily: "Roboto-Bold",
                fontSize: 16,
                fontWeight: "500"
              }}
            >
              Adventure
            </Text>
          </View>

          <FlatList
            onEndReachedThreshold={0.7}
            onEndReached={this.handleMorePopular}
            keyExtractor={(item, index) => `index${index}`}
            horizontal={true}
            ListFooterComponent={this.footerComponent}
            data={this.props.popular.results}
            showsHorizontalScrollIndicator={false}
            emptyComponent={this.showShimmer1}
            renderPlaceholder
            renderItem={({ item }) => (
              <CardFavorite item={item} {...this.props} />
            )}
          />
        </Content>
        <Content padder>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                alignSelf: "center",
                paddingHorizontal: 5,
                color: "#E0E0E0",
                fontFamily: "Roboto-Bold",
                fontSize: 16,
                fontWeight: "500"
              }}
            >
              Romance
            </Text>
          </View>

          <FlatList
            onEndReachedThreshold={0.7}
            onEndReached={this.handleMorePopular}
            keyExtractor={(item, index) => `index${index}`}
            horizontal={true}
            ListFooterComponent={this.footerComponent}
            data={this.props.popular.results}
            showsHorizontalScrollIndicator={false}
            emptyComponent={this.showShimmer1}
            renderPlaceholder
            renderItem={({ item }) => (
              <CardFavorite item={item} {...this.props} />
            )}
          />
        </Content>
        <Content padder>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                alignSelf: "center",
                paddingHorizontal: 5,
                color: "#E0E0E0",
                fontFamily: "Roboto-Bold",
                fontSize: 16,
                fontWeight: "500"
              }}
            >
              Fantasy
            </Text>
          </View>

          <FlatList
            onEndReachedThreshold={0.7}
            onEndReached={this.handleMorePopular}
            keyExtractor={(item, index) => `index${index}`}
            horizontal={true}
            ListFooterComponent={this.footerComponent}
            data={this.props.popular.results}
            showsHorizontalScrollIndicator={false}
            emptyComponent={this.showShimmer1}
            renderPlaceholder
            renderItem={({ item }) => (
              <CardFavorite item={item} {...this.props} />
            )}
          />
        </Content>

        <Content padder>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                alignSelf: "center",
                paddingHorizontal: 5,
                color: "#E0E0E0",
                fontFamily: "Roboto-Bold",
                fontSize: 16,
                fontWeight: "500"
              }}
            >
              Horror
            </Text>
          </View>

          <FlatList
            onEndReachedThreshold={0.7}
            onEndReached={this.handleMorePopular}
            keyExtractor={(item, index) => `index${index}`}
            horizontal={true}
            ListFooterComponent={this.footerComponent}
            data={this.props.popular.results}
            showsHorizontalScrollIndicator={false}
            emptyComponent={this.showShimmer1}
            renderPlaceholder
            renderItem={({ item }) => (
              <CardFavorite item={item} {...this.props} />
            )}
          />
        </Content>
        
      </View>
      //   <View style={styles.scrollViewContent}>
      //     {data.map((_, i) => (
      //       <View key={i} style={styles.row}>
      //         <Text>{i}</Text>
      //       </View>
      //     ))}
      //   </View>

    );
  }

  render() {

    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp"
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp"
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 150],
      extrapolate: "extend"
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: "clamp"
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: "clamp"
    });

    return (
      <View style={styles.fill}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => this.setState({ refreshing: false }), 1000);
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT
          }}
        >
          {this._renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] }
          ]}
        >
          <Animated.View
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }]
              }
            ]}
          >

          <TouchableOpacity onPress={()=>alert('play')}>            
            <ImageBackground
              source={require("../assets/img/anime.jpg")}
              style={{ height: 250 }}
            >
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,0.7)",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: "Roboto",
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#FBFBFB"
                    }}
                  >
                    Shokugeki no Sōma
                  </Text>
                </View>
                <View>
                  <Star score={4} style={{ width: 60, height: 12 }} />
                </View>
                <View style={{ width: 300, height: 20, marginTop: 20 }}>
                  <Text
                    style={{
                      color: "#7D7D7D",
                      fontSize: 12,
                      textAlign: "center"
                    }}
                  >
                    Impian dari Yukihira Souma adalah menjadi seorang koki
                    fulltime di restoran ayahnya dan melampaui keterampilan
                    memasak ayahnya.{" "}
                  </Text>
                </View>
              </View>
            </ImageBackground>
            <View
              style={{
                height: 35,
                alignSelf: "center",
                flexDirection: "row",
                marginTop: -20
              }}
            >


<Button style={{ width: null, height: 30, backgroundColor: '#E10916' }} onPress={() => this.props.navigation.push('VideoScreen', { series: this.props.allVideo.data.series })}>

<IconI size={20} color='#FBFBFB' style={{ marginLeft: 10 }} name='md-play' />

<Text style={{ color: '#FBFBFB', fontWeight: 'bold', padding: 10 }}>
  Play
</Text>

</Button>


<Button style={{ width: 70, marginLeft: 5, borderColor: '#FBFBFB', borderWidth: 1, height: 30, backgroundColor: 'transparent' }}>
                            <Image source={require('../assets/icon/add.png')} style={{ height: 12, width: 12, marginLeft: 5 }} />
                            <Text style={{ color: '#FBFBFB', fontWeight: 'bold' }}>Add</Text>
                            <Text></Text>

                          </Button>





            {/* <TouchableOpacity onPress={()=>alert('play')}>
            <View
                style={{
                  flexDirection: "row",
                  height: 35,
                  width: 90,
                  marginRight: 20,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  borderRadius: 6,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <IconA onPress={()=>alert('play')}
                  name="caret-right"
                  style={{ fontSize: 30 }}
                  color="white"
                />
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontWeight: "500",
                    marginLeft: 10
                  }}
                >
                  Play
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>alert('Add')}>
            <View
                style={{
                  height: 35,
                  width: 90,
                  borderRadius: 6,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#E84393"
                }}
              >
                <Image
                  source={require("../assets/icon/add.png")}
                  style={{ height: 16, width: 16 }}
                />
                <Text
                  style={{
                    color: "white",
                    fontWeight: "500",
                    fontFamily: "Roboto-Medium",
                    marginLeft: 10
                  }}
                >
                  Add
                </Text>
              </View>
            </TouchableOpacity> */}

           
              
              
            </View>
            </TouchableOpacity>

          </Animated.View>
          {/* <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }]
              }
            ]}
            source={require("../assets/img/anime.jpg")}
          /> */}
        </Animated.View>
        <Animated.View style={[styles.bar, { alignItems: "center" }]}>
          {/* <Text style={styles.title}>Title</Text> */}
          <View style={{ width: "100%", height: 60, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Image
                style={{ width: 110, height: 30, marginLeft: 10 }}
                source={require("../assets/img/Animeflix(EDITED).png")}
              />
            </View>
            <View
              style={{ justifyContent: "center", height: 40, marginRight: 10 }}
            >
              <View
                style={{
                  alignSelf: "flex-end",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <IconA
                  onPress={() => this.props.navigation.navigate('SearchScreen')}
                  name="search"
                  style={{ fontSize: 20, marginRight: 20 }}
                  color="white"
                  onPress={()=>this.props.navigation.navigate('SearchScreen')}
                />
                 <IconA name='bell' style={{fontSize:20,marginRight:20}} color='white'/> 
                {this.state.isLoading ? <ActivityIndicator /> :
                  <IconI
                    onPress={this.loginLogout}
                    name="ios-contact"
                    style={{ fontSize: 35 }}
                    color="white"
                  />}
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const stateMapToProps = state => ({
  popular: state.popularReducers,
  allVideo: state.videoReducers,
  user: state.userReducers,
  favorite: state.favoriteReducers
});

export default connect(stateMapToProps)(Parallax);

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: "#101010"
  },
  content: {
    flex: 1
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#101010",
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    // height: HEADER_MAX_HEIGHT,
    height: 250,
    resizeMode: "contain"
  },
  linearGradient: {
    height: null,
    width: null,
    paddingLeft: 15,
    paddingRight: 15,
    position: "relative"
  },
  bar: {
    backgroundColor: "transparent",
    marginTop: Platform.OS === "ios" ? 28 : 38,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  title: {
    color: "white",
    fontSize: 18
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== "ios" ? HEADER_MAX_HEIGHT : 0
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: null,
    width: null,
    marginRight: 5
  },
});
