/* eslint-disable prettier/prettier */
import React, {useCallback, useState} from 'react';

import styled from 'styled-components/native';

import {
  // Button,
  FlatList,
  SafeAreaView,
  // Text,
  // TouchableOpacity,
  // View,
} from 'react-native';
import {DATA} from './data';

function App(): React.JSX.Element {
  const [searchText, setSearchText] = useState('');

  const renderItem = useCallback(({item}: {item: string}) => {
    return (
      <SpeechBubbleView>
        <SpeechBubbleText>{item}</SpeechBubbleText>
      </SpeechBubbleView>
    );
  }, []);

  return (
    <SafeAreaView>
      <Container>
        <SearchView>
          <Searchbar
            onChangeText={setSearchText}
            value={searchText}
            placeholder="검색어를 입력하세요"
          />
          <SearchHelperView>
            <SearchHelperButton title="다음" onPress={() => {}} />
            <SearchHelperText>0 / 0</SearchHelperText>
            <SearchHelperButton title="이전" onPress={() => {}} />
          </SearchHelperView>
        </SearchView>
        <ContentView>
          <FlatList data={DATA} renderItem={renderItem} />
        </ContentView>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const SearchView = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-color: #dee2e6;
`;

const ContentView = styled.View`
  padding: 10px;
`;

const SpeechBubbleView = styled.View`
  padding: 10px;
  background-color: pink;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const SpeechBubbleText = styled.Text`
  font-size: 16px;
`;

const Searchbar = styled.TextInput`
  background-color: #e9ecef;
  padding: 15px;
  border-radius: 8px;
`;

const SearchHelperView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const SearchHelperButton = styled.Button``;

const SearchHelperText = styled.Text`
  font-size: 16px;
`;

export default App;
