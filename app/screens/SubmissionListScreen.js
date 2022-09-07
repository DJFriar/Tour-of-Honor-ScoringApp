import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import apiClient from "../api/client";
// import AppPicker from '../components/AppPicker';
// import AppTextInput from '../components/AppTextInput';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import ListItemSeperator from '../components/ListItemSeperator';
import Screen from '../components/Screen';
// import submission from '../api/scoring';

function SubmissionListScreen({ navigation }) {
  const [displayList, setDisplayList] = useState();
  // const [filteredList, setFilteredList] = useState();
  // const [masterList, setMasterList] = useState();
  const [onRefresh, setOnRefresh] = useState(false);
  // const getPendingSubmissionListApi = useApi(submission.getPendingSubmissionList);
  // const pendingSubmissionList = getPendingSubmissionListApi.data[0] || {};

  useEffect(() => {
    fetchSubmissionList();
  }, []);
  
  const fetchSubmissionList = () => {
    apiClient.get('/scoring-list').then((response) => {
      setDisplayList(response.data);
      // setFilteredList(response.data);
      // setMasterList(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleRefresh = () => {
    setDisplayList(null);
    // setFilteredList(null);
    // setMasterList(null);

    fetchSubmissionList();
  }

  return (
    <Screen style={styles.screen} hasNoHeader>
      {/* <View style={styles.searchRow}>
        <AppTextInput 
          iconName="search" 
          iconFamily="far"
          value={search} 
          placeholder="Search" 
          onChangeText={(text) => searchFilter(text)}
          style={{ height: 18 }}
        />
      </View> */}
      <FlatList 
        data={displayList}
        ItemSeparatorComponent={ListItemSeperator}
        keyExtractor={submission => submission.id.toString()}
        refreshControl={
          <RefreshControl 
            refreshing={onRefresh}
            onRefresh={handleRefresh}
          />
        }
        renderItem={({item}) => 
        <ListItem 
          category={item.CatName}
          cityState={item.City + ", " + item.State}
          code={item.Code}
          image={item.PrimaryImage}
          submitterName={item.FirstName + " " + item.LastName}
          submitterFlag={item.FlagNumber}
          onPress={() => navigation.navigate("SubmissionDetailScreen", {id: item.id})}
        />}
      />
    </Screen>
  );

}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
  },
  searchRow: {
    alignContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
})

export default SubmissionListScreen;
