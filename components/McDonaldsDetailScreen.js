import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { CurrentRenderContext } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const featuredItems = [
    { id: '1', image: require('../assets/item1.jpg'), title: 'Burger, Fries and Drink Combo' },
    { id: '2', image: require('../assets/item2.jpg'), title: '10 piece McNuggets' },
    { id: '3', image: require('../assets/item3.jpg'), title: 'McChicken Burger' },
  ];

  const McDonaldsDetailScreen = (props) => {
    const [showCartButton, setShowCartButton] = useState(false);
    const [cartItems, setCartItems] = useState(0);
    const addToCart = () => {
      setCartItems(cartItems + 1);
    };
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowCartButton(true);
      }, 1000); // Show the cart button after 2 seconds
  
      return () => clearTimeout(timer);
    }, []);
    const renderFeaturedItem = ({ item }) => (
        <View style={styles.featuredItemContainer}>
          <Image source={item.image} style={styles.featuredItem}  />
          <Text style={styles.featuredItemTitle} numberOfLines={3} ellipsizeMode="tail">
            {item.title}
          </Text>
          <FontAwesome name="plus-circle" size={24} color="red" style={styles.plusIcon} />
        </View>
      );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={require('../assets/mcdonalds.png')} // Make sure this is the correct path
          style={styles.fullWidthImage}
        />
        <View style={styles.content}>
          <Text style={styles.title}>McDonald's</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>4.8</Text>
            <FontAwesome name="star" size={18} color="gold" />
            <Text style={styles.reviews}>(2.4K)</Text>
          </View>
          <Text style={styles.subtitle}>Burgers • 1.2 mi</Text>
          <View style={styles.infoBoxContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText} numberOfLines={1}>Suzzallo Locker</Text>
              <Text style={styles.infoBoxTextSmall}>How it works</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>12:30 PM</Text>
              <Text style={styles.infoBoxTextSmall}>Deliver By: 1:30 PM</Text>
            </View>
          </View>
          <Text style={styles.sectionTitle}>Featured Items</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={featuredItems}
            renderItem={renderFeaturedItem}
            keyExtractor={item => item.id}
            style={styles.carousel}
          />
          {
        showCartButton && (
          <TouchableOpacity
            style={styles.viewCartButton}
            onPress={() => props.navigation.navigate('Cart')}
          >
            <Text style={styles.viewCartText}>VIEW CART</Text>
          </TouchableOpacity>
        )
      }
        </View>
      </ScrollView>
      <View style={styles.bottomNavigationBar}>
      <View style={styles.navItem}>
          <FontAwesome name="home" size={24} color="red" />
          <Text style={styles.navText}>Home</Text>
        </View>
        <View style={styles.navItem}>
          <FontAwesome name="shopping-basket" size={24} color="gray" />
          <Text style={styles.navText}>Grocery</Text>
        </View>
        <View style={styles.navItem}>
          <FontAwesome name="tag" size={24} color="gray" />
          <Text style={styles.navText}>Retail</Text>
        </View>
        <View style={styles.navItem}>
          <FontAwesome name="search" size={24} color="gray" />
          <Text style={styles.navText}>Search</Text>
        </View>
        <View style={styles.navItem}>
          <FontAwesome name="file-text-o" size={24} color="gray" />
          <Text style={styles.navText}>Order</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.98,
    backgroundColor: 'white',
  },
  headerImage: {
    height: 250, // or any height you wish
    justifyContent: 'flex-end',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: -60, // Adjust this to overlap the image as required
    backgroundColor: 'transparent',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    color: 'black',
  },
  reviews: {
    fontSize: 18,
    color: 'grey',
    marginLeft: 5,
  },
  subtitle: {
    fontSize: 18,
    color: 'grey',
  },
  infoBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  infoBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  infoBoxText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text in the container
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  infoBoxTextSmall: {
    fontSize: 14,
    color: 'grey',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  featuredItem: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  viewCartButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 28,
  },
  viewCartText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  restaurantImage: {
    width: '100%',
    height: 200, // Adjust height to fit the image properly
    resizeMode: 'cover', // 'cover' or 'contain' based on your preference
  },
  featuredItemContainer: {
    alignItems: 'center',
    marginRight: 10,
    marginTop: 20,
    position: 'relative', // Needed for absolute positioning of the plus icon
  },
  featuredItemTitle: {
    marginTop: 10,
  },
  fullWidthImage: {
    width: windowWidth,
    height: windowHeight * 0.4, // 30% of the screen height
    resizeMode: 'cover',
  },
  scrollContent: {
    height: windowHeight * 0.7, // Remaining 70% of the screen height
  },
  content: {
    // Reduce padding if needed
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 80, // Padding bottom to ensure content is above the navigation bar
  },
  featuredItemTitle: {
    marginTop: 5,
    width: 100, // Fixed width
    fontSize: 16,

  },
  bottomNavigationBar: {
    position: 'absolute',
    marginTop: 856,
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  navItem: {
    alignItems: 'center', // Center the icons and text
  },
  navText: {
    fontSize: 10, // Smaller font size for the text
    color: 'gray',
  },
  plusIcon: {
    position: 'absolute', // Position over the image
    bottom: 5, // 5 pixels from the bottom
    right: 5, // 5 pixels from the right
  },
});


export default McDonaldsDetailScreen;
