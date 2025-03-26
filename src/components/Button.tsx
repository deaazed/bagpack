import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  
  const getButtonStyle = () => {
    let baseStyle: ViewStyle = styles.button;
    
    // Type styles
    if (type === 'primary') {
      baseStyle = { ...baseStyle, ...styles.primaryButton };
    } else if (type === 'secondary') {
      baseStyle = { ...baseStyle, ...styles.secondaryButton };
    } else if (type === 'outline') {
      baseStyle = { ...baseStyle, ...styles.outlineButton };
    }
    
    // Size styles
    if (size === 'small') {
      baseStyle = { ...baseStyle, ...styles.smallButton };
    } else if (size === 'large') {
      baseStyle = { ...baseStyle, ...styles.largeButton };
    }
    
    // Disabled style
    if (disabled) {
      baseStyle = { ...baseStyle, ...styles.disabledButton };
    }
    
    return baseStyle;
  };
  
  const getTextStyle = () => {
    let baseStyle: TextStyle = styles.buttonText;
    
    if (type === 'primary') {
      baseStyle = { ...baseStyle, ...styles.primaryButtonText };
    } else if (type === 'secondary') {
      baseStyle = { ...baseStyle, ...styles.secondaryButtonText };
    } else if (type === 'outline') {
      baseStyle = { ...baseStyle, ...styles.outlineButtonText };
    }
    
    if (size === 'small') {
      baseStyle = { ...baseStyle, ...styles.smallButtonText };
    } else if (size === 'large') {
      baseStyle = { ...baseStyle, ...styles.largeButtonText };
    }
    
    if (disabled) {
      baseStyle = { ...baseStyle, ...styles.disabledButtonText };
    }
    
    return baseStyle;
  };
  
  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator 
          color={type === 'outline' ? '#5A67D8' : '#FFFFFF'} 
          size="small" 
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primaryButton: {
    backgroundColor: '#5A67D8',
  },
  secondaryButton: {
    backgroundColor: '#E2E8F0',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#5A67D8',
  },
  smallButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  largeButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#1A202C',
  },
  outlineButtonText: {
    color: '#5A67D8',
  },
  smallButtonText: {
    fontSize: 14,
  },
  largeButtonText: {
    fontSize: 18,
  },
  disabledButtonText: {
    opacity: 0.8,
  },
});

export default Button; 