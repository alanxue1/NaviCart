import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/grocery-bg.jpg')}  // You'll need to add this image
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.3 }}
      >
        <LinearGradient
          colors={['rgba(74, 144, 226, 0.7)', 'rgba(74, 144, 226, 0.5)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Welcome to{'\n'}NaviCart</Text>
              <Text style={styles.subtitle}>
                Simplify your shopping experience with smart navigation
              </Text>
            </View>
            <Link href="groceryList" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Create Grocery List</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20%',  // Reduced from 25% to move everything up
    paddingBottom: '40%',  // Increased to move button up
    padding: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.9,
    maxWidth: '80%',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: '600',
  },
}); 