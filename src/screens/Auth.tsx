import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Image,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/types';
import { Button, Input } from '../components';

type AuthNavigationProp = StackNavigationProp<MainStackParamList, 'Auth'>;

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigation = useNavigation<AuthNavigationProp>();
  
  const handleLogin = () => {
    // Logique d'authentification à implémenter
    navigation.replace('Home');
  };
  
  const handleRegister = () => {
    // Logique d'inscription à implémenter
    navigation.replace('Home');
  };
  
  const LoginForm = () => (
    <View style={styles.formContainer}>
      <Input
        label="Email"
        placeholder="Entrez votre email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Input
        label="Mot de passe"
        placeholder="Entrez votre mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      
      <Button
        title="Se connecter"
        onPress={handleLogin}
        style={styles.authButton}
      />
    </View>
  );
  
  const RegisterForm = () => (
    <View style={styles.formContainer}>
      <Input
        label="Nom complet"
        placeholder="Entrez votre nom"
        value={name}
        onChangeText={setName}
      />
      
      <Input
        label="Email"
        placeholder="Entrez votre email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Input
        label="Mot de passe"
        placeholder="Créez un mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Input
        label="Confirmer le mot de passe"
        placeholder="Confirmez votre mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <Button
        title="S'inscrire"
        onPress={handleRegister}
        style={styles.authButton}
      />
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Image 
              style={styles.logo} 
              resizeMode="contain"
            />
            <Text style={styles.appTitle}>BagPack</Text>
            <Text style={styles.appSubtitle}>Votre compagnon de voyage intelligent</Text>
          </View>
          
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'login' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('login')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'login' && styles.activeTabText,
                ]}
              >
                Connexion
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'register' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('register')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'register' && styles.activeTabText,
                ]}
              >
                Inscription
              </Text>
            </TouchableOpacity>
          </View>
          
          {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
          
          <View style={styles.socialAuthContainer}>
            <View style={styles.orContainer}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>ou</Text>
              <View style={styles.orLine} />
            </View>
            
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#5A67D8',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#5A67D8',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  formContainer: {
    marginBottom: 24,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#5A67D8',
    fontSize: 14,
  },
  authButton: {
    marginTop: 8,
  },
  socialAuthContainer: {
    marginTop: 16,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  orText: {
    marginHorizontal: 16,
    color: '#718096',
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 0.48,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A5568',
  },
});

export default Auth; 