import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import MechanismOfInjuryCheck from './app/screens/MechanismOfInjuryCheck';
import CreateProfileScreen from './app/screens/CreateProfileScreen';
import SelectProfileScreen from './app/screens/SelectProfileScreen';
import RedFlagsChecklist from './app/screens/RedFlagsChecklist';
import BadCheckScreen from './app/screens/BadCheckScreen';
import TextQuestionScreen from './app/screens/TextQuestionScreen';
import SecondCheckResults from './app/screens/SecondCheckResults';
import SampleDatabaseScreen from './app/screens/SampleDatabaseScreen';
import MTOne from './app/screens/MemoryTests/MTOne';
import MTTwo from './app/screens/MemoryTests/MTTwo';
import MTThree from './app/screens/MemoryTests/MTThree';
import MTFour from './app/screens/MemoryTests/MTFour';
import MTFive from './app/screens/MemoryTests/MTFive';

import ChooseProfileScreen from './app/screens/ChooseProfileScreen';
import ProfileInfoScreen from './app/screens/ProfileInfoScreen';
import ReportScreen from './app/screens/ReportScreen';

import NextStepsScreen from './app/screens/NextStepsScreen';
import ChecklistQuestionScreen from './app/screens/RedFlagsChecklist';
import { GlobalContextProvider } from './app/components/GlobalContextProvider';

import PCSSChecklist from './app/screens/PCSSChecklist';
import FurtherTestsScreen from './app/screens/FurtherTestsScreen';
import FurtherTestsResultsScreen from './app/screens/FurtherTestsResultsScreen';
import RTOne from './app/screens/ReactionTests/RTOne';
import RTTwo from './app/screens/ReactionTests/RTTwo';
import RTThree from './app/screens/ReactionTests/RTThree';
import BTOne from './app/screens/BalanceTests/BTOne';
import BTTwo from './app/screens/BalanceTests/BTTwo';
import BTThree from './app/screens/BalanceTests/BTThree';

import VOMSStart from './app/screens/VOMSTests/VOMSStart';
import VOMSInitialSymptoms from './app/screens/VOMSTests/VOMSInitialSymptoms';

import VOR1 from './app/screens/VOMSTests/Row3VOR/VOR1';
import VOR2 from './app/screens/VOMSTests/Row3VOR/VOR2';
import VOR3 from './app/screens/VOMSTests/Row3VOR/VOR3Response5';
import VOR4 from './app/screens/VOMSTests/Row3VOR/VOR4';
import VOR5 from './app/screens/VOMSTests/Row3VOR/VOR5';
import VOR6 from './app/screens/VOMSTests/Row3VOR/VOR6Response6';

import SP1 from './app/screens/VOMSTests/Row1SmoothPursuits/SP1';
import SP2 from './app/screens/VOMSTests/Row1SmoothPursuits/SP2';
import SP3Response1 from './app/screens/VOMSTests/Row1SmoothPursuits/SP3Response1';
import SP4 from './app/screens/VOMSTests/Row1SmoothPursuits/SP4';
import SP5 from './app/screens/VOMSTests/Row1SmoothPursuits/SP5';
import SP6Response2 from './app/screens/VOMSTests/Row1SmoothPursuits/SP6Response2';

import S1 from './app/screens/VOMSTests/Row2Saccades/S1';
import S2 from './app/screens/VOMSTests/Row2Saccades/S2';
import S3Response2 from './app/screens/VOMSTests/Row2Saccades/S3Response3';
import S4 from './app/screens/VOMSTests/Row2Saccades/S4';
import S5 from './app/screens/VOMSTests/Row2Saccades/S5';
import S6 from './app/screens/VOMSTests/Row2Saccades/S6Response3';
import Disclaimer from './app/screens/Disclaimer';
import NPC1 from './app/screens/VOMSTests/Row4NPC/NPC1';
import NPC2 from './app/screens/VOMSTests/Row4NPC/NPC2';
import NPC3 from './app/screens/VOMSTests/Row4NPC/NPC3';
import NPC4 from './app/screens/VOMSTests/Row4NPC/NPC4Response7';

import VMS1 from './app/screens/VOMSTests/ROW5VMS/VMS1';
import VMS2 from './app/screens/VOMSTests/ROW5VMS/VMS2';
import VMS3 from './app/screens/VOMSTests/ROW5VMS/VMS3';
import BTFour from './app/screens/BalanceTests/BTFour';
import BTFive from './app/screens/BalanceTests/BTFive';

const RootStack = createNativeStackNavigator();
/**
 * The entry point for the application.
 *
 * Contains the root navigation stack.
 */
export default function App() {
  return (
    <GlobalContextProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Disclaimer">
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Disclaimer" component={Disclaimer} />
          <RootStack.Screen
            name="Choose Profile"
            component={ChooseProfileScreen}
          />
          <RootStack.Screen
            name="Sample Database"
            component={SampleDatabaseScreen}
          />
          <RootStack.Screen
            name="Create Profile"
            component={CreateProfileScreen}
          />
          <RootStack.Screen
            name="Select Profile"
            component={SelectProfileScreen}
          />
          <RootStack.Screen name="Profile Info" component={ProfileInfoScreen} />
          <RootStack.Screen name="Report Screen" component={ReportScreen} />
          <RootStack.Screen
            name="Red flags checklist"
            component={RedFlagsChecklist}
          />
          <RootStack.Screen name="PCSS Checklist" component={PCSSChecklist} />
          <RootStack.Screen name="Next Steps" component={NextStepsScreen} />
          <RootStack.Screen
            name="Mechanism Of Injury Check"
            component={MechanismOfInjuryCheck}
          />
          <RootStack.Screen
            name="Text Question (IR3)"
            component={TextQuestionScreen}
          />
          <RootStack.Screen
            name="Checklist Question (Start Check)"
            component={ChecklistQuestionScreen}
          />
          <RootStack.Screen name="Check Result" component={BadCheckScreen} />
          <RootStack.Screen
            name="Incident Report Result"
            component={SecondCheckResults}
          />
          <RootStack.Screen
            name="Further Tests"
            component={FurtherTestsScreen}
          />

          <RootStack.Screen
            name="Further Tests Results"
            component={FurtherTestsResultsScreen}
          />

          <RootStack.Screen name="Memory Test 1" component={MTOne} />
          <RootStack.Screen name="Memory Test 2" component={MTTwo} />
          <RootStack.Screen name="Memory Test 3" component={MTThree} />
          <RootStack.Screen name="Memory Test 4" component={MTFour} />

          <RootStack.Screen name="Reaction Test 1" component={RTOne} />
          <RootStack.Screen name="Reaction Test 2" component={RTTwo} />
          <RootStack.Screen name="Reaction Test 3" component={RTThree} />
          <RootStack.Screen name="Balance Test 1" component={BTOne} />
          <RootStack.Screen name="Balance Test 2" component={BTTwo} />
          <RootStack.Screen name="Balance Test 3" component={BTThree} />
          <RootStack.Screen name="Balance Test 4" component={BTFour} />
          <RootStack.Screen name="Balance Test 5" component={BTFive} />

          <RootStack.Screen name="Memory Test 5" component={MTFive} />

          <RootStack.Screen name="VOMS Start" component={VOMSStart} />
          <RootStack.Screen
            name="VOMS Initial Symptoms"
            component={VOMSInitialSymptoms}
          />

          <RootStack.Screen name="VOMS Smooth Pursuits 1" component={SP1} />
          <RootStack.Screen name="VOMS Smooth Pursuits 2" component={SP2} />
          <RootStack.Screen
            name="VOMS Smooth Pursuits 3 Response 1"
            component={SP3Response1}
          />
          <RootStack.Screen name="VOMS Smooth Pursuits 4" component={SP4} />
          <RootStack.Screen name="VOMS Smooth Pursuits 5" component={SP5} />
          <RootStack.Screen
            name="VOMS Smooth Pursuits 6 Response 2"
            component={SP6Response2}
          />

          <RootStack.Screen name="VOMS Saccades 1" component={S1} />
          <RootStack.Screen name="VOMS Saccades 2" component={S2} />
          <RootStack.Screen
            name="VOMS Saccades 3 Response 3"
            component={S3Response2}
          />
          <RootStack.Screen name="VOMS Saccades 4" component={S4} />
          <RootStack.Screen name="VOMS Saccades 5" component={S5} />
          <RootStack.Screen name="VOMS Saccades 6 Response 4" component={S6} />

          <RootStack.Screen name="VOMS VOR 1" component={VOR1} />
          <RootStack.Screen name="VOMS VOR 2" component={VOR2} />
          <RootStack.Screen name="VOMS VOR 3 Response 5" component={VOR3} />
          <RootStack.Screen name="VOMS VOR 4" component={VOR4} />
          <RootStack.Screen name="VOMS VOR 5" component={VOR5} />
          <RootStack.Screen name="VOMS VOR 6 Response 6" component={VOR6} />

          <RootStack.Screen name="VOMS NPC 1" component={NPC1} />
          <RootStack.Screen name="VOMS NPC 2" component={NPC2} />
          <RootStack.Screen name="VOMS NPC 3" component={NPC3} />
          <RootStack.Screen name="VOMS NPC 4 Response 7" component={NPC4} />

          <RootStack.Screen name="VOMS VMS 1" component={VMS1} />
          <RootStack.Screen name="VOMS VMS 2" component={VMS2} />
          <RootStack.Screen name="VOMS VMS 3 Response 8" component={VMS3} />
        </RootStack.Navigator>
      </NavigationContainer>
    </GlobalContextProvider>
  );
}
