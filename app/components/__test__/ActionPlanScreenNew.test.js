import React from 'react';
import { render } from '@testing-library/react-native';
import ActionPlanScreenNew from '../../screens/ActionPlanScreenNew';
import { NavigationContainer } from '@react-navigation/native';

const renderWithNavigation = (component) => {
  return render(
    <NavigationContainer>
      {component}
    </NavigationContainer>
  );
};

describe('ActionPlanScreenNew', () => {
  test('Start button should exist', () => {
    const { getByTestId } = renderWithNavigation(<ActionPlanScreenNew />);
    const startButton = getByTestId('start-button');
    expect(startButton).toBeTruthy();
  });
});