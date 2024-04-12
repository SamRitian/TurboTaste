import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import offersLogo from '../assets/icons-offers2.png';
import groceryLogo from '../assets/icons-grocery.png';
import petsLogo from '../assets/icons-pets.png';
import alcoholLogo from '../assets/icons-alcohol.png';
import beautyLogo from '../assets/icons-beauty.png';
import pizzaLogo from '../assets/icons-pizza38.png';
import mexicanLogo from '../assets/icons-mexican38.png';
import chineseLogo from '../assets/icons-chinese38.png';
import donutsLogo from  '../assets/icons-donuts38.png';
import sandwichLogo from '../assets/icons-sandwich38.png';
import nachosLogo from '../assets/icons-nachos38.png';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Calculate itemWidth based on the number of items you want to display
const itemWidth = screenWidth; // Adjust margin as needed

// Adjust windowSize based on your requirements
const windowSize = 2;


// `Use Dummy Data`
const upperMenu = [
  { name: 'offersLogo', label: 'Offers', image: offersLogo },
  { name: 'groceryLogo', label: 'Grocery', image: groceryLogo},
  { name: 'alcoholLogo', label: 'Alcohol' , image: alcoholLogo},
  { name: 'petsLogo', label: 'Pets', image: petsLogo},
  { name: 'beautyLogo', label: 'Beauty', image: beautyLogo},
 ];

 // `Use Dummy Data`
 const foodTypesMenu = [
  { name: 'Pizza', label: 'Pizza' , image: pizzaLogo},
  { name: 'Mexican', label: 'Mexican', image: mexicanLogo },
  { name: 'Chinese', label: 'Chinese', image: chineseLogo },
  { name: 'Donut', label: 'Donuts', image: donutsLogo},
  { name: 'Sandwich', label: 'Sandwich', image: sandwichLogo },
  { name: 'Nachos', label: 'Nachos', image: nachosLogo},
 ];

const miniMenuOptions = [
  { name: 'dashcube', label: 'DashPass' },
  { name: 'shopping-cart', label: 'Pickup' },
  { name: 'star', label: 'Mass Delivery' },
];

// `Use Dummy Data` 
const restaurantItems = [
  {
      name: 'McDonald\'s',
      cuisine: 'Burgers',
      price: '$$',
      rating: '4.7',
      reviews: '(1300)',
      orderDistance: '1.4 miles',
      orderTime: '20 min',
      deal: '$0.50 delivery fee with Mass Delivery',
      specialDeal: '20% off, up to 5$',
      image: require('../assets/mcdonalds_burger.jpg'),
  },

  // `Use Dummy Data` 
  {
    name: 'McDonalds',
    cuisine: 'Burgers',
    price: '$$',
    rating: '4.7',
    reviews: '(1300)',
    orderDistance: '23 Orders',
    orderTime: 'Order By 12:30 PM',
    deal: '$0.50 delivery fee with Mass Delivery',
    specialDeal: '20% off, up to 5$',
    image: require('../assets/mcdonalds_burger.jpg'),
  },
];

export default function HomeScreen() {

  const [massDeliveryActive, setMassDeliveryActive] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [deliveryLocations, setDeliveryLocations] = useState([]);

  // Renders the carousel items
  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} />
      <View style={styles.headerContainer}>
        <Text style={styles.carouselTitle}>{item.name}</Text>
        <View style={styles.iconContainer}>
          <FontAwesome name="heart-o"  style={styles.heartIcon} />
        </View>
      </View>
      <View style={styles.carouselInfo}>
        <FontAwesome name="star" style={styles.starIcon} />
        <Text style={styles.carouselDetails}>{item.rating} • {item.orderTime} • {item.orderDistance} </Text>
      </View>
      <Text style={styles.carouselDeal}>{item.deal}</Text>
      <Text style={styles.carouselSpecialDeal}>{item.specialDeal}</Text>
    </View>
  );

  const handleMassDeliveryPress = () => {
    // Toggle massDeliveryActive state
    setMassDeliveryActive(!massDeliveryActive);
    // Show instructions when Mass Delivery is active
    setShowInstructions(!showInstructions);
    // Toggle showMap state to show/hide the map
    setShowMap(!showMap);
    setDeliveryLocations(['Deliver to Suzzallo Library', 'Deliver to Lander Hall', 'Deliver to Center Table']);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollView}  stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll={false}>
        {/* Header Information */}
        <View style={styles.stickyHeader}>
          
          <View style={styles.header}>
            <View style={styles.locationContainer}>
              <FontAwesome name="map-pin" size={20} color="black" style={styles.locationIcon} />
              <Text style={styles.currentLocation}>UW</Text>
              <FontAwesome name="chevron-down" size={16} color="gray" style={styles.dropdownIcon} />
            </View>
            <View style={styles.iconContainer}>
              <FontAwesome name="user-circle" size={24} color="black" style={styles.iconMargin} />
              <FontAwesome name="bell" size={24} color="black" style={styles.iconMargin} />
              <FontAwesome name="shopping-cart" size={24} color="black" style={styles.iconMargin} />
            </View>
          </View>
        
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <FontAwesome name="search" size={24} color="gray" style={styles.searchIcon} />
            <Text style={styles.searchPlaceholder}>Search Doordash</Text>
          </View> 
        </View>
      </View>

        {/* Top Menu */}
        <View style={styles.topMenu}>
          {upperMenu.map((item, index) => (
            <View key={index} style={styles.topMenuItem}>
              {item.image && <Image source={item.image} style={styles.menuIcon} />}
              <Text style={styles.topMenuLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Top Menu (Food Types) */}
        <View style={styles.topMenu}>
          {foodTypesMenu.map((icon, index) => (
            <View key={index} style={styles.topMenuItem}>
              {icon.image && <Image source={icon.image} style={styles.menuIcon} />}
              <Text style={styles.topMenuLabel}>{icon.label}</Text>
            </View>
          ))}
        </View>

        {/* Mini Menu (DashPass, Pickup, Mass Delivery) */}
        <View style={styles.miniMenu}>
          {miniMenuOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.miniMenuItem,
                option.label === 'Mass Delivery' && massDeliveryActive ? styles.activeDelivery : null,
              ]}
              onPress={() => option.label === 'Mass Delivery' && handleMassDeliveryPress()}>
              <FontAwesome name={option.name} size={16} color={option.label === 'Mass Delivery' && massDeliveryActive ? 'white' : 'black'} style={styles.miniMenuItemIcon} />
              <Text style={[styles.miniMenuItemLabel, option.label === 'Mass Delivery' && massDeliveryActive && styles.activeDeliveryText]}>{option.label}</Text>
            </TouchableOpacity>
              ))}
        </View>

        {/* Conditional rendering for instructions */}
        {massDeliveryActive && showInstructions && (
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>How it Works</Text>
            <Text style={styles.instructionsText}>1. Select your preferred “Hub” location {"\n"}</Text>
            <Text style={styles.instructionsText}>2. Select your restaurant and food of choice {"\n"}</Text>
            <Text style={styles.instructionsText}>3. Check-out and pick up from your selected “Hub” location via order iD or QR code</Text>
            <TouchableOpacity style={styles.gotItButton} onPress={() => setShowInstructions(false)}>
              <Text style={styles.gotItButtonText}>Got it</Text>
            </TouchableOpacity>
          </View>
        )}

        {massDeliveryActive && showMap && (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 47.655548,
                longitude: -122.303200,
                latitudeDelta: 0.0922 / 4,
                longitudeDelta: 0.0421 / 4,
              }}>
              <Marker
                coordinate={{
                  latitude: 47.65593061839695,
                  longitude: -122.30780715979577,
                }}
                title="Suzzallo Food Locker"
              />
              <Marker
                coordinate={{
                  latitude: 47.660441,
                  longitude: -122.303969,
                }}
                title="Center Table Food Locker"
              />
              <Marker
                coordinate={{
                  latitude:  47.655646,
                  longitude: -122.311398,
                }}
                title="Lander Food Locker"
              />
            </MapView>
          </View> 
        )}

        {/* Carousel */}
        <View style={styles.container}>
          <View style={styles.catagoryTitleContainer}>
            <Text style={styles.catagoryTitle}>{massDeliveryActive ? 'Deliver to Suzzallo Library' : 'Recently Viewed'}</Text>
            <FontAwesome name="angle-right" color="gray" style={styles.arrowIcon} />
          </View>
          <Carousel
            data={restaurantItems}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            windowSize={windowSize}
            snapToInterval={undefined}
            slideStyle={styles.carouselSlide}
          />

          {/* Carousel */}
          <View style={styles.catagoryTitleContainer}>
            <Text style={styles.catagoryTitle}>{massDeliveryActive ? 'Deliver to Lander Hall' : 'Top Restaurants'}</Text>
            <FontAwesome name="angle-right" color="gray" style={styles.arrowIcon} />
          </View>
          <Carousel
            data={restaurantItems}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            windowSize={windowSize}
            snapToInterval={undefined}
            slideStyle={styles.carouselSlide}
          />

          {/* Carousel */}
          <View style={styles.catagoryTitleContainer}>
            <Text style={styles.catagoryTitle}>{massDeliveryActive ? 'Deliver to Center Table' : 'All Stores'}</Text>
            <FontAwesome name="angle-right" color="gray" style={styles.arrowIcon} />
          </View>
          <Carousel
            data={restaurantItems}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            windowSize={windowSize}
            snapToInterval={undefined}
            slideStyle={styles.carouselSlide}
          />
        </View>

        {/* Bottom Navigation Bar */}
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
      </ScrollView>
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginLeft: 15,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: screenHeight * 0.2, // Adjust the paddingBottom to make space for the bottomNavigationBar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 35,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 5,
  },
  currentLocation: {
    fontSize: 16,
    color: 'black',
    marginLeft: 5,
  },
  dropdownIcon: {
    marginLeft: 5,
  },
  iconMargin: {
    marginLeft: 25,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30, // Make it oval-shaped
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
  searchBarContainer: {
    backgroundColor: '#fff', // White background
    borderRadius: 30, // Same as searchBar
    overflow: 'hidden', // Ensure oval shape is maintained
    marginLeft: 10,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: 'gray',
    flex: 1,
  },
  topMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
  },
  topMenuItem: {
    alignItems: 'center',
  },
  topMenuLabel: {
    fontSize: 12,
    color: 'black',
    marginTop: 5,
  },
  miniMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
  },
  miniMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  miniMenuItemIcon: {
    marginRight: 10,
  },
  miniMenuItemLabel: {
    fontSize: 14,
    color: 'black',
  },
  instructionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  instructionsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructionsTextContainer: {
    marginLeft: 20, // Add left margin to create indentation
  },
  instructionsText: {
    fontSize: 16,
  },
  gotItButton: {
    marginTop: 20,
    backgroundColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  gotItButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  activeDelivery: {
    backgroundColor: 'black',
  },
  activeDeliveryText: {
    color: 'white',
  },
  map: {
    height: 250,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20, // Adjust as needed
  },
  carouselItem: {
    marginBottom: 30,
    marginTop: 5,
  },
  catagoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'roboto-bold',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //paddingHorizontal: 10,
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,  // Adjust the font size as needed,
  },
  catagoryTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  catagoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'roboto-bold',
  },
  arrowIcon: {
    fontSize: 22,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: -10,
    marginTop: -20,
  }, 
  heartIcon: {
    size: 25,
  },
  starIcon: {
    marginRight: 2,
    size: 20,
  },
  carouselImage: {
    width: '100%',
    height: screenWidth / 2., // Adjust height to make it shorter
    aspectRatio: 1.6, // Adjust aspect ratio to make it wider
    borderRadius: 10, // Rounded corners
  },
  carouselInfo: {
    flexDirection: 'row',  // Arrange elements horizontally
    alignItems: 'center',   // Align elements vertically in the center
    flex: 1, 
  },
  carouselRating: {
    marginRight: 10,
  },
  carouselDetails: {
   fontSize: 14,
   marginBottom: 3,
   color: '#767676'
  },
  carouselDeal: {
    fontSize: 14,
    marginBottom: 3,
    color: '#767676'
  },
  carouselSpecialDeal: {
    fontSize: 14,
    marginBottom: 3,
    fontWeight: 'bold',
    color: '#00838A'
  },
  bottomNavigationBar: {
    position: 'absolute', // Keep the bar fixed at the bottom
    bottom: 0, // Position it at the absolute bottom
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center', // Center the icons and text
  },
  navText: {
    fontSize: 10, // Smaller font size for the text
    color: 'gray',
  },
  carouselSlide: {
    marginLeft: 20, // Blake: Adjusted to carousel to left align
    marginRight: -90, //distance between images
  },
  stickyHeader: {
    backgroundColor: 'f2f2f2', 
  }
});