import { Card, Space, Statistic, Table, Typography } from "antd";
import { LineChartOutlined, UserOutlined, ReconciliationOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import './index.css'; // Import the external stylesheet

function Dashboard() {
    return (
        <div className="dashboard-container">
            <h1 className="admin-dashboard-heading">Admin Dashboard</h1>
            <Space size={20} direction="vertical" className="dashboard-content">
                <Space direction="horizontal">
                    <DashboardCard 
                        icon={<LineChartOutlined 
                        className="dashboard-icon" />} 
                        title={<span style={{ fontSize: '25px',fontWeight:'bold'}}>{"Total Sales"}</span>}
                        value={12}
                    />
                    <DashboardCard 
                        icon={<ReconciliationOutlined 
                        className="dashboard-icon" />} 
                        title={<span style={{ fontSize: '25px',fontWeight:'bold'}}>{"Total Orders"}</span>}
                        value={123}
                    />
                    <DashboardCard 
                        icon={<UserOutlined 
                        className="dashboard-icon" />} 
                        title={<span style={{ fontSize: '25px',fontWeight:'bold'}}>{"Total Users"}</span>}
                        value={1234}
                    />
                </Space>
                <Space>
                    <RecentOrders />
                    {/* <DashboardChart /> */}
                </Space>
            </Space>
        </div>
    );
}

function DashboardCard({ title, value, icon }) {
    return (
        <Card className="dashboard-card">
            <Space direction="horizontal" className="dashboard-card-content">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}

function RecentOrders() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        // Dummy data for the recent orders
        const dummyData = [
            {
                key: '1',
                orderNumber: '001',
                customerName: 'John Doe',
                status: 'Shipped',
                date: '2024-08-18',
            },
            {
                key: '2',
                orderNumber: '002',
                customerName: 'Jane Smith',
                status: 'Processing',
                date: '2024-08-17',
            },
            {
                key: '3',
                orderNumber: '003',
                customerName: 'Bob Johnson',
                status: 'Sales',
                date: '2024-08-16',
            },
        ];

        setDataSource(dummyData);
        setLoading(false);
    }, []);

    // Define the table columns
    const columns = [
        {
            title: 'Order Number',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    return (
        <>
            <Typography.Text className="recent-orders-title">Recent Orders</Typography.Text>
            <Table
                className="recent-orders-table"
                dataSource={dataSource}
                columns={columns}
                loading={loading}
                pagination={false} // Disable pagination for simplicity
            />
        </>
    );
}

export default Dashboard;
