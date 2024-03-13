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

// authentication components
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='*' element={<ErrorPage />} />

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
      </Routes>
    </div>
  );
}

export default App;
