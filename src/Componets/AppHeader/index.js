import { BellFilled } from "@ant-design/icons";
import { Badge, Drawer, Image, Space, Typography, Button, List } from "antd";
import { useEffect, useState } from "react";
import { getComments } from "../../API";
import "./index.css";

function AppHeader() {
    const [, setComments] = useState(0);
    const [commentsOpen, setCommentsOpen] = useState(false);

    useEffect(() => {
        getComments().then(res => {
            setComments(res.total);
        });
    }, []);

    const openCommentsDrawer = () => {
        setCommentsOpen(true);
    };

    const closeCommentsDrawer = () => {
        setCommentsOpen(false);
    };

    // Dummy notifications data
    const notifications = [
        {
            id: 1,
            message: "New comment on your post.",
            timestamp: "2024-08-19 10:30 AM"
        },
        {
            id: 2,
            message: "Your order #1234 has been shipped.",
            timestamp: "2024-08-19 09:15 AM"
        },
        {
            id: 3,
            message: "New like on your review.",
            timestamp: "2024-08-18 08:45 PM"
        },
        {
            id: 4,
            message: "Price drop alert for the item in your wishlist.",
            timestamp: "2024-08-18 07:20 PM"
        }
    ];

    return (
        <div className="AppHeader">
            <Image
                width={100}
                src="https://static.vecteezy.com/system/resources/previews/003/651/643/original/v-letter-logo-icon-for-business-and-company-vector.jpg"
                preview={false}
            />
            <Typography.Title level={3} className="AppHeaderTitle">ELECTRONIC STORE</Typography.Title>
            <Space>
                <Badge count={notifications.length}>
                    <BellFilled style={{ fontSize: 24 }} onClick={openCommentsDrawer} />
                </Badge>
            </Space>
            <Drawer
                title="Notifications"
                open={commentsOpen}
                onClose={closeCommentsDrawer}
                width={400}
                footer={
                    <Button onClick={closeCommentsDrawer} type="primary">
                        Close
                    </Button>
                }
            >
                <List
                    itemLayout="horizontal"
                    dataSource={notifications}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.message}
                                description={item.timestamp}
                            />
                        </List.Item>
                    )}
                />
            </Drawer>
        </div>
    );
}

export default AppHeader;
