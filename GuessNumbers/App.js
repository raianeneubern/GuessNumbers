import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';

export default function App() {
  const [numeroSecreto, setNumeroSecreto] = useState(gerarNumeroAleatorio());
  const [palpite, setPalpite] = useState('');
  const [tentativas, setTentativas] = useState(5);
  const [mensagem, setMensagem] = useState('');

  function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 101); // número de 0 a 100
  }

  function reiniciarJogo() {
    setNumeroSecreto(gerarNumeroAleatorio());
    setTentativas(5);
    setPalpite('');
    setMensagem('');
  }

  function verificarPalpite() {
    const numero = parseInt(palpite);

    if (isNaN(numero) || numero < 0 || numero > 100) {
      Alert.alert('Atenção', 'Digite um número entre 0 e 100');
      return;
    }

    if (numero === numeroSecreto) {
      Alert.alert('Parabéns!', 'Você acertou!', [
        { text: 'Jogar novamente', onPress: reiniciarJogo },
      ]);
    } else {
      const novasTentativas = tentativas - 1;
      setTentativas(novasTentativas);
      setMensagem(numero < numeroSecreto ? 'Tente um número maior!' : 'Tente um número menor!');

      if (novasTentativas === 0) {
        Alert.alert('Fim de jogo', `Você perdeu! O número era ${numeroSecreto}`, [
          { text: 'Tentar de novo', onPress: reiniciarJogo },
        ]);
      }
    }

    setPalpite('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Qual o número de 0 a 100?</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite seu palpite"
        value={palpite}
        onChangeText={setPalpite}
      />

      <TouchableOpacity style={styles.botao} onPress={verificarPalpite}>
        <Text style={styles.textoBotao}>Verifica</Text>
      </TouchableOpacity>

      <Text style={styles.mensagem}>{mensagem}</Text>
      <Text style={styles.tentativas}>Tentativas restantes: {tentativas}</Text>
    </View>
  );
}
