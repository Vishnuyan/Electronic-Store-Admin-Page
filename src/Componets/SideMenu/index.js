import { Menu } from "antd";
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

function SideMenu(){
    const navigate = useNavigate()
    return <div className="SideMenu">
        <Menu 
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item)=>{
            //item.key
            navigate(item.key);
        }}
        items={[
            {
                label:"Dashboard",
                icon: <AppstoreOutlined/>,
                key:"/",
            },
            {
                label:"Products",
                icon: <ShopOutlined/>,
                key: "/product",
            },
            {
                label:"Orders",
                icon: <ShoppingCartOutlined/>,
                key: "/orders",
            },
            {
                label:"Users",
                icon: <UserOutlined/>,
                key: "/users",
            },
            {
                label:"Reports",
                icon: <FileTextOutlined/>,
                key: "/reports",
            },
        ]}
        ></Menu>
    </div>
}

export default SideMenu;