import { Typography } from "antd";
import { PhoneOutlined, LockOutlined, FileTextOutlined } from '@ant-design/icons';
import './index.css'; // Import the CSS file

function AppFooter() {
    return (
        <div className="AppFooter">
            <Typography.Link href="tel:+94123456789" className="AppFooterLink">
                <PhoneOutlined className="AppFooterIcon" /> +94123456789
            </Typography.Link>
            <Typography.Link href="/privacy-policy" className="AppFooterLink">
                <LockOutlined className="AppFooterIcon" /> Privacy Policy
            </Typography.Link>
            <Typography.Link href="/terms-of-use" className="AppFooterLink">
                <FileTextOutlined className="AppFooterIcon" /> Terms of Use
            </Typography.Link>
        </div>
    );
}

export default AppFooter;
