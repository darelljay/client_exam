/* eslint-disable space-infix-ops */
/* eslint-disable no-trailing-spaces */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useState} from 'react';

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
  const [currentPage,setCurrentPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [currentList,setCurrentList] =  useState<string[]>([]);
  // 과제 1
  // 검색어를 입력했을 떄 매칭되는 문자들을 보여줘야함
  // 생각나는 로직: 배열안에 입력하는 텍스트가 있는지에 여부로 필터링후 아예 빼서 로컬 스토리지에 담기 

  const filterItem = useCallback(()=>{
    const list = [];
    const datalength = DATA.length;

    for(let i=0; i<datalength/10; i++){
      let tempArr: any[] = [];
      for(let j=0; j<=9; j++){
        let mixStr = `${i}${j}`;
        if(DATA[parseInt(mixStr)] === ''){
          list.push(tempArr);
          break;
        } 
          
        tempArr.push(DATA[parseInt(mixStr)]);
      }
      list.push(tempArr);
    }
    return list;
  },[]); 
  
  useEffect(() => {
    const pages = filterItem();
    setMaxPage(pages.length);
    setCurrentList(pages[currentPage] || []);
  }, [filterItem,currentPage]);


  const handleNextPage = (currentPage: number) => {
    setCurrentPage((prev) => (prev < maxPage - 1 ? prev + 1 : prev));
  };

  const handlePrevPage = (currentPage: number) => {
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
            <SearchHelperButton title="이전" onPress={() => {handlePrevPage(currentPage)}} />
            <SearchHelperText >{currentPage + 1} / {maxPage}</SearchHelperText>
            <SearchHelperButton title="다음" onPress={() => {handleNextPage(currentPage)}} />
          </SearchHelperView>
        </SearchView>
        <ContentView>
          <FlatList data={currentList} renderItem={renderItem} />
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
  transition: 2.8s ease;
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
