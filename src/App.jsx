import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ErrorPage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';

// budgets
import AllBudgetsPage from './pages/budgets/AllBudgetsPage';
import AddBudgetPage from './pages/budgets/AddBudgetPage';
import SingleBudgetPage from './pages/budgets/SingleBudgetPage';
import UpdateBudgetPage from './pages/budgets/UpdateBudgetPage';

// transactions
import AllTransactionsPage from './pages/transactions/AllTransactionsPage';
import AddTransactionPage from './pages/transactions/AddTransactionPage';
import SingleTransactionPage from './pages/transactions/SingleTransactionPage';
import UpdateTransactionPage from './pages/transactions/UpdateTransactionPage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LogInPage />} />

        <Route path='/budgets' element={<AllBudgetsPage />} />
        <Route path='/budgets/add' element={<AddBudgetPage />} />
        <Route path='/budgets/:budgetId' element={<SingleBudgetPage />} />
        <Route
          path='/budgets/update/:budgetId'
          element={<UpdateBudgetPage />}
        />

        <Route
          path='/budgets/:budgetId/transactions'
          element={<AllTransactionsPage />}
        />
        <Route
          path='/budgets/:budgetId/transactions/add'
          element={<AddTransactionPage />}
        />
        <Route
          path='/budgets/:budgetId/transactions/:transactionId'
          element={<SingleTransactionPage />}
        />
        <Route
          path='/budgets/:budgetId/transactions/update/:transactionId'
          element={<UpdateTransactionPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
