import React, { ReactNode } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle, 
  TextInputProps 
} from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  touched?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: ViewStyle;
  errorStyle?: TextStyle;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  touched,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const showError = error && touched;
  
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer, 
        showError && styles.inputError,
        inputStyle
      ]}>
        {leftIcon && (
          <View style={styles.iconLeft}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={styles.input}
          placeholderTextColor="#A0AEC0"
          {...props}
        />
        
        {rightIcon && (
          <View style={styles.iconRight}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {showError && (
        <Text style={[styles.errorText, errorStyle]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3748',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    minHeight: 48,
  },
  inputError: {
    borderColor: '#E53E3E',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A202C',
  },
  iconLeft: {
    paddingLeft: 16,
  },
  iconRight: {
    paddingRight: 16,
  },
  errorText: {
    marginTop: 4,
    fontSize: 14,
    color: '#E53E3E',
  },
});

export default Input; 