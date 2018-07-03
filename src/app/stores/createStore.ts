import { History } from 'history';
import { RouterStore } from './RouterStore';
import { AppStore } from './AppStore';
import { ErrorStore } from './ErrorStore';
import { LangStore } from './LangStore';
import { LoginStore } from './LoginStore';

export function createStores(history: History) {
  const routerStore = new RouterStore(history);
  const appStore = new AppStore();
  const errorStore = new ErrorStore();
  const langStore = new LangStore();
  const loginStore = new LoginStore();
  return {
    routerStore,
    appStore,
    errorStore,
    langStore,
    loginStore,
  };
}
