/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useEffect, useRef, useState} from 'react';

import styled from 'styled-components/native';

import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DATA} from './data';

function App(): React.JSX.Element {
  const [searchText, setSearchText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [foundList, setFoundList] = useState<number[]>([]);
  const flatListRef = useRef<FlatList<string>>(null);

  const findItemIdx = useCallback((text: string) => {
    if (text.trim() !== '') {
      let newDataIdx: number[] = [];
      DATA.forEach((element, index) => {
        if (element.includes(text)) {
          newDataIdx.push(index);
        }
      });
      return newDataIdx;
    }
    return [];
  }, []);

  useEffect(() => {
    const filteredIndices = findItemIdx(searchText);
    setFoundList(filteredIndices);
    setMaxIndex(filteredIndices.length);
  }, [findItemIdx, searchText]);

  useEffect(() => {
    if (foundList.length > 0) {
      scrollToIndex(foundList[0]);
    }
  }, [foundList]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [maxIndex]);

  const handleNextBtn = () => {
    if (currentIndex < maxIndex) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollToIndex(foundList[nextIndex]);
    }
  };

  const handlePrevBtn = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      scrollToIndex(foundList[prevIndex]);
    }
  };

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const renderItem = useCallback(({ item }: { item: string }) => {
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
            <SearchHelperButton title="이전" onPress={handlePrevBtn} />
            <SearchHelperText>{currentIndex} / {maxIndex}</SearchHelperText>
            <SearchHelperButton title="다음" onPress={handleNextBtn} />
          </SearchHelperView>
        </SearchView>
        <ContentView>
          <FlatList
            ref={flatListRef}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
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

const SearchHelperButton = styled(Button)``;

const SearchHelperText = styled.Text`
  font-size: 16px;
`;

export default App;