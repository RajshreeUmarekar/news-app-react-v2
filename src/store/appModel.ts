import { Action, action, Thunk, thunk } from "easy-peasy";
import { setCookie, getCookie } from "typescript-cookie";
import axios from "axios";

export interface IModel {
    newsArticleList: {
        response:{
            docs:[]
        }
    };
    newsContentList: {
        response:{
            pages:number,
            currentPage:number,
            results:[]
        }
    };
    success: boolean,
    setNewsArticleList: Action<IModel, {
        response:{
            docs:[]
        }
    }>;
    setNewsContentList: Action<IModel, { 
        response:{
            pages:number,
            currentPage:number,
            results:[]
        }
    }>;
    setSuccess:Action<IModel, boolean>;
    fetchNewsList: Thunk<IModel, {key:string, value:string}>;
    checkLoginValidity: Thunk<IModel>;
    resetStatus: Thunk<IModel>;
}

const appModel:IModel = {
    newsArticleList: {
        response:{
            docs:[]
        }
    },
    newsContentList: {
        response:{
            pages:0,
            currentPage:0,
            results:[]
        }
    },
    success: false,
    setNewsArticleList: action((state, payload) => {
        state.newsArticleList = payload;
    }),
    setNewsContentList: action((state, payload) => {
        state.newsContentList = payload;
    }),
    setSuccess: action((state, payload) => {
        state.success = payload;
    }),
    fetchNewsList: thunk(async (actions, payload) => {
        const user = getCookie('username')!;
        const pass = getCookie('password')!;
        
        if(payload.key === 'Article'){
            await axios.get('/articleList', {
                auth: {username: user,password: pass},
                params: {value: payload.value}
            }).then((resp:any) => {
                actions.setNewsArticleList(resp.data);
            }).catch((error:any) =>{
                actions.setNewsArticleList({response:{docs:[]}});
            })
            
        }else if(payload.key === 'Content'){
            await axios.get('/contentList', {
                auth: {username: user,password: pass},
                params: {value: payload.value}
            }).then((resp:any) => {
                actions.setNewsContentList(resp.data);
            }).catch((error:any) =>{
                actions.setNewsContentList({response:{pages:0, currentPage:0, results:[]}});
            })
        }
    }),
    checkLoginValidity: thunk(async (actions, payload) => {
        
        if(getCookie('login_success') === 'true'){
            actions.setSuccess(true);
            return true;
        }else if(getCookie('login_success') === 'false'){
            actions.setSuccess(false);
            return false;
        }
    }),
    resetStatus: thunk(async (actions, payload) => {
        actions.setSuccess(false);
        setCookie('login_success', false);
    }),
}

export default appModel;