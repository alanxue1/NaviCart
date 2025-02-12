import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';

export default function HomeScreen() {
  const [lastCommand, setLastCommand] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCommand = async (command: string) => {
    setLastCommand(command);
    // Speak the response
    setIsSpeaking(true);
    try {
      await Speech.speak(`Processing command: ${command}`, {
        language: 'en',
        pitch: 1,
        rate: 0.9,
        onDone: () => setIsSpeaking(false),
      });
    } catch (error) {
      console.error('Error speaking:', error);
      setIsSpeaking(false);
    }
  };

  const simulateCommand = () => {
    const commands = [
      'Find milk',
      'Where is bread?',
      'Take me to produce',
      'Find the cereal aisle'
    ];
    const randomCommand = commands[Math.floor(Math.random() * commands.length)];
    handleCommand(randomCommand);
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <Animated.View 
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0]
                })
              }]
            }
          ]}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Store Navigator</Text>
            <Text style={styles.subtitle}>Your Shopping Assistant</Text>
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>How it works</Text>
            <View style={styles.infoItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.info}>Press button to simulate voice commands</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.info}>Get turn-by-turn directions</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.info}>Navigate through store aisles easily</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.commandButton, isSpeaking && styles.commandButtonDisabled]}
            onPress={simulateCommand}
            disabled={isSpeaking}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isSpeaking ? ['#cccccc', '#999999'] : ['#00c6fb', '#005bea']}
              style={styles.buttonGradient}
            >
              <Text style={styles.commandButtonText}>
                {isSpeaking ? 'Processing...' : 'Simulate Command'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {lastCommand ? (
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>LAST COMMAND</Text>
              <Text style={styles.resultText}>{lastCommand}</Text>
            </View>
          ) : null}
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 20,
    color: '#E0E0E0',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  bullet: {
    fontSize: 20,
    color: '#00c6fb',
    marginRight: 8,
  },
  info: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  commandButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  commandButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    letterSpacing: 1,
  },
  resultText: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
  },
  commandButtonDisabled: {
    opacity: 0.7,
  },
});
