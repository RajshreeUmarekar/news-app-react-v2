import { createStore, createTypedHooks } from "easy-peasy";
import appModel, { IModel } from "./appModel";

const { useStore, useStoreDispatch, useStoreActions, useStoreState} = createTypedHooks<IModel>();

export { useStore, useStoreDispatch, useStoreActions, useStoreState };

const appStore = createStore(appModel);

export default appStore;