import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import apiClient from "../api/client";
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import ListItemSeperator from '../components/ListItemSeperator';
import Screen from '../components/Screen';

function SubmissionListScreen({ navigation }) {
  const [displayList, setDisplayList] = useState();
  const [onRefresh, setOnRefresh] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchSubmissionList();
  }, [isFocused]);

  const fetchSubmissionList = () => {
    apiClient.get('/submission/pendingHeld').then((response) => {
      setDisplayList(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleRefresh = () => {
    setDisplayList(null);
    fetchSubmissionList();
  }

  return (
    <Screen style={styles.screen} hasNoHeader>
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
        renderItem={({ item }) =>
          <ListItem
            category={item.CatName}
            cityState={item.City + ", " + item.State}
            code={item.Code}
            image={item.PrimaryImage}
            source={item.Source}
            status={item.Status}
            submitterName={item.FirstName + " " + item.LastName}
            submitterFlag={item.FlagNumber}
            onPress={() => navigation.navigate("SubmissionDetailScreen", { id: item.id })}
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
