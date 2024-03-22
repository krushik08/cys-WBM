import { lazy } from "react";
import { Navigate } from "react-router-dom";
import MinimalLayout from "../layouts/MinimalLayout/MinimalLayout.js";
import UserDetails from "../views/admin/manage/user/userDetails.js";
import Reading from '../views/admin/Reading/Reading.js';
import Dashboard from '../views/admin/dashboards/Dashboard.js';
import Transactions from '../views/admin/transactions/index.js';
import Voucher from '../views/admin/Voucher/index.js';

/****Layouts*****/
const FullLayout = lazy(() => import('../layouts/FullLayout/FullLayout.js'));
/****End Layouts*****/

/*****Pages******/

const MonethlyReport = lazy(() =>
  import('../views/admin/reports/monethlyReport/monethlyReport.js')
);
const UserReport = lazy(() =>
  import('../views/admin/reports/userReport/userReport.js')
);

const UserLayout = lazy(() => import('../layouts/UserLayout/UserLayout.js'));
//
const Login = lazy(() => import('../views/auth/Login.js'));

//
const Billing = lazy(() => import('../views/user/billing/billing.js'));
const UserDashboard = lazy(() =>
  import('../views/user/dashboard/dashboard.js')
);
const PersonalDetails = lazy(() =>
  import('../views/user/setting/personal-details.js')
);

/*****Routes******/

const ThemeRoutes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/login" /> },

      { path: 'dashboard', exact: true, element: <Dashboard /> },

      { path: 'monethly-report', exact: true, element: <MonethlyReport /> },
      { path: 'user-report', exact: true, element: <UserReport /> },

      { path: 'user-details', exact: true, element: <UserDetails /> },
      { path: 'transaction', exact: true, element: <Transactions /> },
      { path: 'reading', exact: true, element: <Reading /> },
      { path: 'voucher', exact: true, element: <Voucher /> },
    ],
  },
  {
    path: '/',
    element: <MinimalLayout />,
    children: [{ path: '/login', element: <Login /> }],
  },
  {
    path: '/',
    element: <UserLayout />,
    children: [
      { path: 'u/billing', exact: true, element: <Billing /> },
      { path: 'u/dashboard', exact: true, element: <UserDashboard /> },
      { path: 'u/personal-details', exact: true, element: <PersonalDetails /> },
    ],
  },
];

export default ThemeRoutes;
