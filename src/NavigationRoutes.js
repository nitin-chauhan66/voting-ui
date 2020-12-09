import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { EnterCode } from './screens/EnterEventCode';
import {Login} from './screens/login';
import { AddNewEvent, AdminDashboard } from './screens/newEvent';
import { ElectionDashboard, VotingEvent } from './screens/votingDashboard';

const NavigatorRouter = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Login} />
            <Route  path="/eventCode" component={EnterCode} />
            <Route  path="/votingEvent" component={VotingEvent} />
            <Route  path="/eventDashboard" component={ElectionDashboard} />
            <Route  path="/addNewEvent" component={AdminDashboard} />
        </BrowserRouter>
    )
}

export default NavigatorRouter;