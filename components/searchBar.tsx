import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { connect } from 'react-redux';
import { setSearchQuery, fuzzySearchUser } from '../context/actions/userTableActions';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ query, setSearchQuery, fuzzySearchUser }) => {

  const handleSearch = () => {
    fuzzySearchUser(query);
  };

  return (
    <View className="flex flex-row items-center p-4 mt-12">
      <Text className="mr-3">
        <Feather name="search" size={24} color="black" />
      </Text>
      <TextInput
        className="flex-1 mr-2 border border-gray-400 p-2"
        placeholder="Search..."
        value={query}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <TouchableOpacity className="py-2 px-4 bg-blue-500 rounded-md" onPress={handleSearch}>
        <Text className="font-bold text-gray-50">Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = (state: any) => ({
  query: state.userTable.searchQuery
})

const mapDispatchToProps = {
  setSearchQuery, fuzzySearchUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
