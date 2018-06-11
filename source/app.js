import less from './css/com.less';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Test from './tmp/Test';

ReactDOM.render(
    <LocaleProvider locale={zh_CN}>
        <Router>
            <Route path="/" component={(props) => (
                <Switch>
                    <Route path='/' component={Test}/>
                    <Route path='/test' component={Test}/>
                </Switch>
            )}/>
        </Router>
    </LocaleProvider>,
    document.getElementById("root"));

