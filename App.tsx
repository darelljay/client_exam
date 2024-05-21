/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable space-infix-ops */
/* eslint-disable no-trailing-spaces */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */

import React, {useCallback, useEffect, useState, useRef} from 'react';

import styled from 'styled-components/native';

import {
  Animated,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {DATA} from './data';

function App(): React.JSX.Element {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [currentList, setCurrentList] = useState<string[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current; 

  const filterTextItem = useCallback((text: string) => {
      
  }, []);

  const filterItem = useCallback(() => {
    const list = [];
    const datalength = DATA.length;

    for (let i = 0; i < datalength / 10; i++) {
      let tempArr: any[] = [];
      for (let j = 0; j <= 9; j++) {
        let mixStr = `${i}${j}`;
        if (DATA[parseInt(mixStr)] === '') {
          list.push(tempArr);
          break;
        }
        tempArr.push(DATA[parseInt(mixStr)]);
      }
      list.push(tempArr);
    }
    return list;
  }, []);

  useEffect(() => {
    const pages = filterItem();
    setMaxPage(pages.length);
    setCurrentList(pages[currentPage] || []);
    fadeIn();
  }, [filterItem, currentPage]);

  const fadeIn = () => {
    fadeAnim.setValue(0); 
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700, 
      useNativeDriver: true,
    }).start();
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < maxPage - 1 ? prev + 1 : prev));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

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
            <SearchHelperButton title="이전" onPress={handlePrevPage} />
            <SearchHelperText>{currentPage + 1} / {maxPage}</SearchHelperText>
            <SearchHelperButton title="다음" onPress={handleNextPage} />
          </SearchHelperView>
        </SearchView>
        <AnimatedContentView style={{opacity: fadeAnim}}>
          <FlatList data={currentList} renderItem={renderItem} />
        </AnimatedContentView>
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

const AnimatedContentView = styled(Animated.View)`
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
