import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text } from 'react-native';
import HomeScreen from './HomeScreen';
import Profile from './ProfileScreen';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const TabCard = (props) => {
    const {
        state: { routes, index },
        navigation,
    } = props;

    const renderTabs = () => {
        return (
            <View style={styles.tabBar}>
                {
                    routes.map((item, idx) => {
                        const { params: { icon }, name } = item;
                        return (
                            <TouchableOpacity key={`tab-item-${idx.toString()}`}
                                onPress={() => navigation.navigate(item.name)}
                            >
                                <View style={styles.iconContainer}>
                                    <FontAwesome5 name={icon} style={{ fontSize: 15, }} />
                                    <Text>{name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
    return (
        <View style={styles.bottomTabWrapper}>
            {renderTabs()}
        </View>
    )
}

const MainTab = () => {
    return (
        <>
            <Tab.Navigator tabBar={(props) => <TabCard {...props} />}
                screenOptions={{ headerShown: false }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    initialParams={{
                        icon: 'home'
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    initialParams={{
                        icon: 'user'
                    }}
                />
            </Tab.Navigator>
        </>
    )
};

export default MainTab;

const styles = {
    bottomTabWrapper: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 80,
        alignContent: 'center',
        alignItems: 'center'
    },
    tabBar: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#fafafa',
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        paddingHorizontal: 20,
        justifyContent: 'space-evenly'
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}