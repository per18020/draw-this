# react-ui

This project was bootstrapped by [Glamper](https://github.com/yeti/glamper)

## Starting the Project

1. Clone the repo

2. Install dependencies

```bash
yarn install
```

2. If you are using Sentry, add a `.env` in the root of the project, since this is currently the only need for a `.env` file.

```
REACT_APP_SENTRY_DSN=...
```

If you are not planning on using Sentry, uninstall the sentry npm package `yarn remove @sentry/browser` and remove the logic for initializing the SDK within the `index.js` file.

1. Start the server
```bash
yarn start
```

### Folder Structure

| Folder | Purpose |
| ------ | ------ |
|**services**| Any third party or Server related code lives here. The `Server` folder handles all of the api calls made to the backend while the `EpicMyChart` folder covers any wrappers or code we use to interact with the `MyChart` SDK.|
| **constants** | Any constants that the app winds up needing that aren’t sensitive|
| **global_styles** | Font imports and css for global resets, code highlighting, and the notebook |
| **modules** | A high level abstraction representing a series of screens, state, side effects, and components that encapsulate a general theme or purpose. A good example of this is `profile`, which contains all of the logic for the profile state and whatever screens or components largely lead to changes in said state. |
| **redux_setup** | Root reducer, store setup, and root epic. |
| **shared** | Anything that should be accessible by any component or side effect. Examples include error logging actions and `colors`, which are used across multiple screens. |
| **types** | The source of truth for all typescript types. This folder will _mostly_ mirror the above folder structure. |

### Libraries Used
| Library |  |
| ------ | ------ |
| [Aphrodite](https://github.com/Khan/aphrodite) | CSS in JS |
| [Jest](https://jestjs.io/) | Efficient testing through snapshots |
| [Immer Reducer](https://lodash.com/docs) | Eliminates boilerplate through typesafe actions and immutable helpers from [Immer](https://github.com/immerjs/immer) |
| [React](https://reactjs.org/) | Modular and extendable component based architecture |
| [Redux](https://redux.js.org/) | Unidirectional state container |
| [React Router](https://reacttraining.com/react-router/) | Navigation through components |
| [Redux Thunk](https://redux-observable.js.org/) | Async side effect handling |
| [Redux Logger](https://github.com/evgenyrodionov/redux-logger) | Action and state logging |
| [Typescript](https://www.typescriptlang.org/) | Supercharged js with developer friendly static type checking |
