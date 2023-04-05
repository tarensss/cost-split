// ExpenseList.js
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Text, FlatList } from 'react-native';
import { throttle } from 'lodash';

const ExpenseList = () => {
  const expenses = useSelector(state => state.expenses);

  const total = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const renderItem
