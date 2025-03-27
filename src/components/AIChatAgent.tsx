import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import Markdown from 'react-native-markdown-display';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  metadata?: {
    usage?: {
      total_tokens: number;
      total_price: number;
      currency: string;
      latency: number;
    };
  };
}

interface AIChatAgentProps {
  onDestinationSelect: (destination: string) => void;
}

const DIFY_API_URL = 'https://api.dify.ai/v1';
const DIFY_API_KEY = 'app-KA4uDVNUlg3nXjfEYaOOE70g';

const LoadingDots = () => {
  const [dots, setDots] = useState('');
  const dotsRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    dotsRef.current = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => {
      if (dotsRef.current) {
        clearInterval(dotsRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingDots}>
        <Text style={styles.loadingText}>{dots}</Text>
      </View>
    </View>
  );
};

const AIChatAgent: React.FC<AIChatAgentProps> = ({ onDestinationSelect }): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis votre assistant de voyage. Comment puis-je vous aider à trouver votre prochaine destination ?',
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    // Tts.setDefaultLanguage('fr-FR');

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening]);

  const onSpeechResults = (e: any) => {
    if (e.value && e.value[0]) {
      setInputText(e.value[0]);
    }
  };

  const onSpeechError = (e: any) => {
    Alert.alert('Erreur', 'Une erreur est survenue lors de la reconnaissance vocale');
  };

  const startListening = async () => {
    try {
      await Voice.start('fr-FR');
      setIsListening(true);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de démarrer la reconnaissance vocale');
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'arrêter la reconnaissance vocale');
    }
  };

  const cleanResponse = (text: string): string => {
    return text.replace(/<think>.*?<\/think>/gs, '').trim();
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(`${DIFY_API_URL}/chat-messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${DIFY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {},
          query: inputText,
          response_mode: "blocking",
          conversation_id: "",
          user: 'user-' + Date.now(),
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la communication avec l\'API');
      }

      const data = await response.json();
      
      if (!data.answer) {
        throw new Error('Pas de réponse reçue de l\'API');
      }

      const aiResponse: Message = {
        id: data.message_id || (Date.now() + 1).toString(),
        text: cleanResponse(data.answer),
        isUser: false,
        metadata: {
          usage: data.metadata?.usage
        }
      };

      setMessages(prev => [...prev, aiResponse]);
      //Tts.speak(aiResponse.text);

      // Log des métadonnées pour le debugging
      if (data.metadata?.usage) {
        console.log('Usage API:', {
          tokens: data.metadata.usage.total_tokens,
          prix: `${data.metadata.usage.total_price} ${data.metadata.usage.currency}`,
          latence: `${(data.metadata.usage.latency * 1000).toFixed(2)}ms`
        });
      }
    } catch (error) {
      console.error('Erreur API:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la communication avec l\'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => (
    <Animated.View 
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.aiMessage,
        {
          opacity: 1,
          transform: [{ translateY: 0 }],
        },
      ]}
    >
      <View style={[styles.messageContent, item.isUser && styles.userMessageContent]}>
        <Markdown 
          style={{
            body: {
              ...styles.messageText,
              ...(item.isUser ? styles.userMessageText : {}),
            },
            code: styles.codeBlock,
            code_inline: styles.codeInline,
            fence: styles.codeFence,
          }}
        >
          {item.text}
        </Markdown>
      </View>
    </Animated.View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesListContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />
      {isLoading && <LoadingDots />}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Écrivez votre message..."
            placeholderTextColor="#A0AEC0"
            multiline
            editable={!isLoading}
          />
          <Animated.View style={[styles.voiceButtonContainer, { transform: [{ scale: pulseAnim }] }]}>
            <TouchableOpacity 
              style={[styles.voiceButton, isListening && styles.voiceButtonActive]} 
              onPress={isListening ? stopListening : startListening}
              disabled={isLoading}
            >
              <Text style={styles.voiceButtonText}>
                {isListening ? '⏹️' : '🎙️'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <TouchableOpacity 
          style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]} 
          onPress={handleSend}
          disabled={!inputText.trim() || isLoading}
        >
          <Text style={styles.sendButtonText}>
            {isLoading ? '...' : 'Envoyer'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  messagesList: {
    flex: 1,
  },
  messagesListContent: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '85%',
    marginBottom: 8,
  },
  messageContent: {
    padding: 12,
    backgroundColor: '#F0F2F5',
    borderRadius: 18,
    borderTopLeftRadius: 4,
  },
  userMessageContent: {
    backgroundColor: '#0084FF',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 4,
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 15,
    color: '#050505',
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E4E6EB',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
    minHeight: 40,
    maxHeight: 120,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 15,
    color: '#050505',
    maxHeight: 100,
  },
  voiceButtonContainer: {
    marginLeft: 8,
  },
  voiceButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButtonActive: {
    backgroundColor: '#FF3B30',
  },
  voiceButtonText: {
    fontSize: 20,
  },
  sendButton: {
    backgroundColor: '#0084FF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E4E6EB',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  codeBlock: {
    backgroundColor: '#F6F8FA',
    padding: 12,
    borderRadius: 8,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    color: '#24292E',
    marginVertical: 8,
  },
  codeInline: {
    backgroundColor: '#F6F8FA',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    color: '#24292E',
  },
  codeFence: {
    backgroundColor: '#F6F8FA',
    padding: 12,
    borderRadius: 8,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    color: '#24292E',
    marginVertical: 8,
  },
  loadingContainer: {
    padding: 8,
    alignItems: 'flex-start',
  },
  loadingDots: {
    backgroundColor: '#F0F2F5',
    padding: 12,
    borderRadius: 18,
    borderTopLeftRadius: 4,
    maxWidth: '85%',
  },
  loadingText: {
    fontSize: 15,
    color: '#050505',
    lineHeight: 20,
  },
});

export default AIChatAgent; 