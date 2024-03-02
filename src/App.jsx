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

// authentication components
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <IsAnon>
              <HomePage />
            </IsAnon>
          }
        />
        <Route
          path='/about'
          element={
            <IsAnon>
              <AboutPage />
            </IsAnon>
          }
        />
        <Route
          path='*'
          element={
            <IsAnon>
              <ErrorPage />
            </IsAnon>
          }
        />
        <Route
          path='/signup'
          element={
            <IsAnon>
              <SignUpPage />
            </IsAnon>
          }
        />
        <Route
          path='/login'
          element={
            <IsAnon>
              <LogInPage />
            </IsAnon>
          }
        />

        <Route
          path='/budgets'
          element={
            <IsPrivate>
              <AllBudgetsPage />
            </IsPrivate>
          }
        />
        <Route
          path='/budgets/add'
          element={
            <IsPrivate>
              <AddBudgetPage />
            </IsPrivate>
          }
        />
        <Route
          path='/budgets/:budgetId'
          element={
            <IsPrivate>
              <SingleBudgetPage />
            </IsPrivate>
          }
        />
        <Route
          path='/budgets/update/:budgetId'
          element={
            <IsPrivate>
              <UpdateBudgetPage />
            </IsPrivate>
          }
        />

        <Route
          path='/budgets/:budgetId/transactions'
          element={
            <IsPrivate>
              <AllTransactionsPage />
            </IsPrivate>
          }
        />
        <Route
          path='/budgets/:budgetId/transactions/add'
          element={
            <IsPrivate>
              <AddTransactionPage />
            </IsPrivate>
          }
        />
        <Route
          path='/budgets/:budgetId/transactions/:transactionId'
          element={
            <IsPrivate>
              <SingleTransactionPage />
            </IsPrivate>
          }
        />
        <Route
          path='/budgets/:budgetId/transactions/update/:transactionId'
          element={
            <IsPrivate>
              <UpdateTransactionPage />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
