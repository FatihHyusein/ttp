import React from 'react';
import './auth.component.scss';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Tabs } from 'antd';

export function AuthComponent() {
    return <div className={'auth-component'}>
        <Tabs tabPosition={'bottom'} defaultActiveKey={'1'}>
            <Tabs.TabPane tab='Login' key='1'>
                <LoginComponent/>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Register' key='2'>
                <RegisterComponent/>
            </Tabs.TabPane>
        </Tabs>
    </div>;
}
