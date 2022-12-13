import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { Home } from '@screens/Home';
import { RegisterStudent } from '@screens/RegisterStudent';
import { RegisterTeacher } from '@screens/RegisterTeacher';
import { Student } from '@screens/Student';
import { Teacher } from '@screens/Teacher';
import { UpdateStudent } from '@screens/UpdateStudent';
import { UpdateTeacher } from '@screens/UpdateTeacher';

export type UserNavigationProps = {
  id?: string;
};

type AppRoutes = {
  home: undefined;
  student: undefined;
  teacher: undefined;
  registerStudent: undefined;
  updateStudent: UserNavigationProps;
  registerTeacher: undefined;
  updateTeacher: UserNavigationProps;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen, Group } = createStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="student" component={Student} />
      <Screen name="teacher" component={Teacher} />

      <Group
        screenOptions={{
          presentation: 'modal',
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      >
        <Screen name="registerStudent" component={RegisterStudent} />
        <Screen name="updateStudent" component={UpdateStudent} />
        <Screen name="registerTeacher" component={RegisterTeacher} />
        <Screen name="updateTeacher" component={UpdateTeacher} />
      </Group>
    </Navigator>
  );
}
