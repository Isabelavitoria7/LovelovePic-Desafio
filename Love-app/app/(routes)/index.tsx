import LoginInput from '@/components/Login';
import Start from '@/components/Start';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterInput from '@/components/Register';
import Home from '@/components/Home';
import Information from '@/components/Information';


const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={LoginInput} options={{title: 'Login'}}/>
        <Stack.Screen name="Register" component={RegisterInput} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Information" component={Information} />
      </Stack.Navigator>
  );
}