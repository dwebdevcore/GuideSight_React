import asyncComponent from '../helpers/AsyncFunc';

const routes = [
  {
    path: 'githubSearch',
    component: asyncComponent(() => import('./containers/GithubSearch'))
  },
  {
    path: 'blank_page',
    component: asyncComponent(() => import('./containers/blankPage'))
  },
    {
      path: 'inventory',
      component: asyncComponent(() => import('./containers/Inventory'))
    }
];
export default routes;
