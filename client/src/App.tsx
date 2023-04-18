

import { Refine,  AuthProvider } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  LightTheme,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";

import {RestaurantOutlined,AccountBoxOutlined, RestoreOutlined,FavoriteOutlined,EuroSymbolOutlined} from '@mui/icons-material/';
import dataProvider from "@pankod/refine-simple-rest";

import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { useTranslation } from "react-i18next";
import { Title, Sider, Layout, Header, Footer } from "components/layout";
import { Login,CreateRestaurant,EditRestaurant,NosRestaurants, RestaurantDetails, MonProfile, Order, OrderConfirmation,Accueil,RestaurantHandle,RestaurantAdmin } from "pages";
import { CredentialResponse } from "components/interfaces/google";
import { parseJwt } from "utils/parse-jwt";
import {CheckOwner} from "utils/checkOwner";



const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});


function App() {
  const { t, i18n } = useTranslation();
  const hide = CheckOwner()
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
          const response = await fetch(
              "http://localhost:8080/api/v1/users",
              {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                      name: profileObj.name,
                      email: profileObj.email,
                      avatar: profileObj.picture,
                  }),
              },
          );

      const data = await response.json();
   
      if (response.status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
            userid : data._id
          })
        );
      } else {
        return Promise.reject()
      }
      
    }

    localStorage.setItem("token", `${credential}`); 

    return Promise.resolve();
  },
    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
        
      }
    },
  };
 

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <>
      
      <ThemeProvider theme={LightTheme}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider("http://localhost:8080/api/v1")}
            notificationProvider={notificationProvider}
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
            resources={[
              {
                name: "Accueil",
                options: {
                  label: 'Suggestions'
                },
                list: Accueil,
                icon: <FavoriteOutlined />,
                
               },
              {
                name: "restaurants",
                options: {
                  label: 'Nos restaurants '
                },
                list: NosRestaurants, 
                show: RestaurantDetails,
                create: CreateRestaurant,
                icon: <RestaurantOutlined />,
               
              },
              
              {
                name: "orders",
                options: {
                  label: 'Mon Historique '
                },
                list: Order,
                show : OrderConfirmation,
                icon: <RestoreOutlined />,
                
              },
              {
                name: "Mon-Profil",
                options: {
                  label: 'Mon Profil '
                },
                list: MonProfile,
                icon: <AccountBoxOutlined />,
                
              },
              {
                name : "users", 
                options:{
                  label : 'Mon restaurant',
                  hide: hide,                  
                },              
                list : RestaurantHandle,
                show : RestaurantAdmin,
                edit : EditRestaurant,
                icon : <EuroSymbolOutlined/>,
                
              },
              {
                name: "restaurant",
                options: {
                  label: 'Ajouter Mon Restaurant ',
                  hide : true,
                  
                },
                list: CreateRestaurant,
                create: CreateRestaurant,
                edit: EditRestaurant,
                
              },
              
            ]}
            Title={Title}
            Sider={Sider}
            Layout={Layout}
            Header={Header}
            Footer={Footer}
            routerProvider={routerProvider}
            authProvider={authProvider}
            LoginPage={Login}
            i18nProvider={i18nProvider}
            
            
            
          />
        </RefineSnackbarProvider>
        
      </ThemeProvider>
    </>
  );
}

export default App;
