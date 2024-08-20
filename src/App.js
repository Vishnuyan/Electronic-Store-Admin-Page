// import { Space } from "antd";
import "./App.css";
import AppFooter from "./Componets/AppFooter";
import AppHeader from "./Componets/AppHeader";
import PageContent from "./Componets/PageContent";
import SideMenu from "./Componets/SideMenu";  

function App(){
  return (
     <div className ="App">
    <AppHeader/>
    <div className="SideMenuAndPageContent">
      <SideMenu></SideMenu>
      <PageContent></PageContent>
    </div>
    <AppFooter/>
  </div>
);
}
export default App;