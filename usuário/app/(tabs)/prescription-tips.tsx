import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PrescriptionTipsScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)');
    }
  };

  const handleTakePhoto = () => {
    // Simula tirar foto e vai para análise
    router.push('/(tabs)/analyzing-prescription');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orientações</Text>
        <View style={styles.backButton} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="camera-outline" size={100} color="#00C2A3" />
        </View>

        <Text style={styles.title}>Dicas para tirar uma boa foto</Text>

        <View style={styles.tipsContainer}>
          <View style={styles.tipItem}>
            <Ionicons name="sunny-outline" size={24} color="#333" />
            <Text style={styles.tipText}>Tire a foto em local iluminado.</Text>
          </View>

          <View style={styles.tipItem}>
            <Ionicons name="camera-outline" size={24} color="#333" />
            <Text style={styles.tipText}>Deixe a receita em foco, sem cortes.</Text>
          </View>

          <View style={styles.tipItem}>
            <Ionicons name="eye-off-outline" size={24} color="#333" />
            <Text style={styles.tipText}>Evite brilhos e reflexos na receita.</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.takePhotoButton}
          onPress={handleTakePhoto}
          activeOpacity={0.8}
        >
          <Text style={styles.takePhotoButtonText}>Tirar foto</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 4,
    width: 32,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    marginTop: 40,
    marginBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 32,
    textAlign: 'center',
  },
  tipsContainer: {
    width: '100%',
    gap: 24,
    marginBottom: 48,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  takePhotoButton: {
    width: '100%',
    backgroundColor: '#00C2A3',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 24,
  },
  takePhotoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});