import { View, Text, ScrollView } from "react-native";
import { connect } from 'react-redux';
import { sortUserTable } from '../context/actions/userTableActions';
import { Feather } from '@expo/vector-icons';
import { SortBy, SortOrder } from "../enums/enums";


const UserTable = ({ tableData, sortBy, sortOrder, sortUserTable }) => {
  const tableHead = [{
    id: 'name',
    label: 'Name'
  }, {
    id: 'rank',
    label: 'Rank',
  }, {
    id: 'bananas',
    label: 'Number of Bananas'
  }
];

  const handleSort = (newSortBy: SortBy) => {
    sortUserTable(newSortBy, sortBy === newSortBy ? (sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC) : SortOrder.ASC);
  };

  return (
    <View className="p-4">
      {tableData.length > 0 ?
        <View>
          {/* Header Row */}
          <View className="flex flex-row bg-gray-200 py-2">
            {tableHead.map((item, index) => (
              <View key={index} className="flex-1 items-center justify-center">
                <Text className="font-bold text-center" onPress={() => handleSort(SortBy[item.id])}>
                  {item.label} {sortBy === SortBy[item.id] && <Feather name={`${sortOrder === SortOrder.ASC ? 'arrow-up' : 'arrow-down'}`} size={12} color="black" />}
                </Text>
              </View>
            ))}
          </View>
          {/* Data Rows */}
          <ScrollView>
            {Object.values(tableData).map((entry: any, index: number) => (
              <View key={index} className={`flex flex-row py-2 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                <View className="flex-1 flex-row justify-center items-center">
                  <Text className="text-center">
                    {entry.name}
                  </Text>
                  {entry.rank <= 3 && <Text className="ml-1">
                    {entry.rank === 1 && <Feather name="award" size={12} color="gold" />}
                    {entry.rank === 2 && <Feather name="award" size={12} color="silver" />}
                    {entry.rank === 3 && <Feather name="award" size={12} color="brown" />}
                  </Text>}
                </View>
                <View className="flex-1">
                  <Text className="text-center">{entry.rank}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-center">{entry.bananas}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        : <Text>No entries found.</Text>}
    </View>
  );
}

const mapStateToProps = (state: any) => ({
  tableData: state.userTable.tableData,
  sortBy: state.userTable.sortBy,
  sortOrder: state.userTable.sortOrder
})

const mapDispatchToProps = {
  sortUserTable
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
