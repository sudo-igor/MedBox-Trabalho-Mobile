import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function ManageProfileScreen() {
  const router = useRouter();
  const { user, updateUser, isAuthenticated } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.replace('/login' as any);
      return;
    }

    // Carrega dados do usuário
    setName(user.name || '');
    setEmail(user.email || '');
    setPhone(user.phone || '');
    setCpf(user.cpf || '');
    setBirthDate(user.birthDate || '');
  }, [user, isAuthenticated]);

  // Detecta mudanças
  useEffect(() => {
    if (user) {
      const changed =
        name !== (user.name || '') ||
        email !== (user.email || '') ||
        phone !== (user.phone || '') ||
        cpf !== (user.cpf || '') ||
        birthDate !== (user.birthDate || '');
      setHasChanges(changed);
    }
  }, [name, email, phone, cpf, birthDate, user]);

  const formatCPF = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return cpf;
  };

  const formatPhone = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    return phone;
  };

  const formatDate = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2');
    }
    return birthDate;
  };

  const handleSave = async () => {
    // Validações
    if (!name || !email || !phone) {
      Alert.alert('Erro', 'Por favor, preencha os campos obrigatórios');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, digite um e-mail válido');
      return;
    }

    setIsLoading(true);

    try {
      await updateUser({
        name,
        email,
        phone,
        cpf,
        birthDate,
      });

      Alert.alert('Sucesso!', 'Suas informações foram atualizadas', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar suas informações');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      Alert.alert(
        'Descartar Alterações?',
        'Você tem alterações não salvas. Deseja descartá-las?',
        [
          { text: 'Continuar Editando', style: 'cancel' },
          {
            text: 'Descartar',
            style: 'destructive',
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar Perfil</Text>
          <View style={styles.headerButton} />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {user ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : ''}
              </Text>
            </View>
            <TouchableOpacity style={styles.changePhotoButton}>
              <Ionicons name="camera" size={20} color="#00A859" />
              <Text style={styles.changePhotoText}>Alterar Foto</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Nome */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome Completo *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Digite seu nome"
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-mail *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="seu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Telefone */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Telefone *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={(text) => setPhone(formatPhone(text))}
                  placeholder="(00) 00000-0000"
                  keyboardType="phone-pad"
                  maxLength={15}
                />
              </View>
            </View>

            {/* CPF */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>CPF</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="card-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={cpf}
                  onChangeText={(text) => setCpf(formatCPF(text))}
                  placeholder="000.000.000-00"
                  keyboardType="number-pad"
                  maxLength={14}
                />
              </View>
            </View>

            {/* Data de Nascimento */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Data de Nascimento</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="calendar-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={birthDate}
                  onChangeText={(text) => setBirthDate(formatDate(text))}
                  placeholder="DD/MM/AAAA"
                  keyboardType="number-pad"
                  maxLength={10}
                />
              </View>
            </View>

            <Text style={styles.requiredNote}>* Campos obrigatórios</Text>

            {/* Save Button */}
            <TouchableOpacity
              style={[
                styles.saveButton,
                (!hasChanges || isLoading) && styles.buttonDisabled,
              ]}
              onPress={handleSave}
              disabled={!hasChanges || isLoading}
              activeOpacity={0.7}
            >
              <Text style={styles.saveButtonText}>
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </Text>
            </TouchableOpacity>

            {/* Delete Account */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                Alert.alert(
                  'Excluir Conta',
                  'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                      text: 'Excluir',
                      style: 'destructive',
                      onPress: () => {
                        // Implementar exclusão de conta
                        console.log('Excluir conta');
                      },
                    },
                  ]
                );
              }}
            >
              <Text style={styles.deleteButtonText}>Excluir Conta</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#FFF',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#00A859',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFF',
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00A859',
    marginLeft: 8,
  },
  form: {
    backgroundColor: '#FFF',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  inputIcon: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
  requiredNote: {
    fontSize: 12,
    color: '#999',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  saveButton: {
    backgroundColor: '#00A859',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  deleteButton: {
    padding: 16,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
});