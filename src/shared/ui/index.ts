import {
  Space, Button, Layout, Typography, Input, InputNumber,
  Form, Row, Col, Drawer, Modal, Card, Table, Select,
  Upload, Breadcrumb, Descriptions, Divider, Skeleton,
  DatePicker, message, Spin, Popconfirm, Radio
} from 'antd';
import styled from 'styled-components';
import formStyles from './Form/Form.module.css';


const ImprovedTitle = styled(Typography.Title)`
  ${(p: { $noMargin?: boolean }) => p.$noMargin ? 'margin: 0!important;' : ''}
`;
const ImprovedTypography = { ...Typography, Title: ImprovedTitle };


export * from './Logo';
export * from './Container';
export {
  Space, Button, Layout, ImprovedTypography as Typography, Input,
  InputNumber, Form, Row, Col, Drawer, Modal, Card, Table, Select,
  Upload, Breadcrumb, Descriptions, Divider, Skeleton, DatePicker,
  message, Spin, Popconfirm, formStyles, Radio
};
