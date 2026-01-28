import React, { useState } from 'react';
import DomainDetailsScreen from './DomainDetailsScreen';
import CreateIndexScreen from './CreateIndexScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('domain-details');
  const [showSuccessFlashbar, setShowSuccessFlashbar] = useState(false);

  const navigateToCreateIndex = () => {
    setCurrentScreen('create-index');
    setShowSuccessFlashbar(false);
  };

  const navigateToDomainDetails = () => {
    setCurrentScreen('domain-details');
  };

  const handleIndexCreated = () => {
    setShowSuccessFlashbar(true);
    setCurrentScreen('domain-details');
  };

  if (currentScreen === 'create-index') {
    return <CreateIndexScreen onCancel={navigateToDomainDetails} onCreate={handleIndexCreated} />;
  }

  return (
    <DomainDetailsScreen
      onNavigateToCreateIndex={navigateToCreateIndex}
      showSuccessFlashbar={showSuccessFlashbar}
      onDismissFlashbar={() => setShowSuccessFlashbar(false)}
    />
  );
}

export default App;
