import { Navigate, createBrowserRouter } from 'react-router-dom'
import Login from '../views/login/login';
import SignUp from '../views/signUp/signUp';
import Users from '../views/user/user';
import NotFound from '../views/notFound/notFound';
import DefaultLayout from '../layouts/defaultLayout';
import GuestLayout from '../layouts/guestLayout/guestLayout';
import Dashboard from '../views/dashboard/dashboard';
import UserForm from '../views/user/userForm';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/users" />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate"/>
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
        ]
    },

    {
        path: '*',
        element: <NotFound />
    },
])

export default router;