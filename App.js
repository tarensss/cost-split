// App.js
import React, { useState, lazy, Suspense } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const initialState = {
  expenses: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    default:
      return state;
  }
};

const store = createStore(reducer);

const LazyExpenseList = lazy(() => import('./ExpenseList'));

const App = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    const expense = { name, amount: parseFloat(amount) };
    store.dispatch({ type: 'ADD_EXPENSE', payload: expense });
    setName('');
    setAmount('');
  };

  return (
    <Provider store={store}>
      <View>
        <Text>Cost Splitter</Text>
        <TextInput placeholder="Name" value={name} onChangeText={setName} />
        <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
        <Button title="Add Expense" onPress={handleSubmit} />
        <Suspense fallback={<Text>Loading...</Text>}>
          <LazyExpenseList />
        </Suspense>
      </View>
    </Provider>
  );
};

export default App;
