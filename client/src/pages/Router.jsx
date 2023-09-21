import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout/Layout.jsx'
import Home from './Home.jsx'
import ErrorPage from './ErrorPage.jsx'
import Today from './Today.jsx'
import ExpiredTasks from './ExpiredTasks.jsx'
import List from './List.jsx'
import Cards from './Cards.jsx'
import Boards from './Boards.jsx'
import Account from './Account.jsx'
import ProjectList from './ProjectList.jsx'
import ProjectCards from './ProjectCards.jsx'
import ProjectBoards from './ProjectBoards.jsx'
import ProjectPage from './ProjectPage.jsx'
import SignIn from './SignIn.jsx'
import CalendarPage from './CalendarPage.jsx'
import ProjectCal from './ProjectCal.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <Home />,
        children: [
          {
            path: '/home/list',
            element: <List />,
          },
          {
            path: '/home/cards',
            element: <Cards />,
          },
          {
            path: '/home/boards',
            element: <Boards />,
          },
          {
            path: '/home/calendar',
            element: <CalendarPage />,
          },
        ],
      },
      {
        path: '/today',
        element: <Today />,
        children: [
          {
            path: '/today/list',
            element: <List />,
          },
          {
            path: '/today/cards',
            element: <Cards />,
          },
          {
            path: '/today/boards',
            element: <Boards />,
          },
          {
            path: '/today/calendar',
            element: <CalendarPage />,
          },
        ],
      },
      {
        path: '/expired',
        element: <ExpiredTasks />,
        children: [
          {
            path: '/expired/list',
            element: <List />,
          },
          {
            path: '/expired/cards',
            element: <Cards />,
          },
          {
            path: '/expired/boards',
            element: <Boards />,
          },
          {
            path: '/expired/calendar',
            element: <CalendarPage />,
          },
        ],
      },
      {
        path: '/account',
        element: <Account />,
      },
      {
        path: '/projects/:projectId',
        element: <ProjectPage />,
        children: [
          {
            path: '/projects/:projectId/list',
            element: <ProjectList />,
          },
          {
            path: '/projects/:projectId/cards',
            element: <ProjectCards />,
          },
          {
            path: '/projects/:projectId/boards',
            element: <ProjectBoards />,
          },
          {
            path: '/projects/:projectId/calendar',
            element: <ProjectCal />,
          },
        ],
      },
    ],
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
])

export default router
