import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";


const Root = () => {
    return (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    );
  };
  
  export default Root;