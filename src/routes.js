import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Loading from './components/loading';
import NotifyContainer from './components/notify-container';

import Main from './app/main';
import List from './app/list';
import Meetings from './app/meetings'
import Lunch from './app/lunch'
import Saturday from './app/saturday'
import Sunday from './app/sunday'

export default function Routes() {
    return (
        <>
            <Loading />
            <NotifyContainer />
            <Switch>
                <Route path='/' exact><Main /></Route>
                <Route path='/lista'><List /></Route>
                <Route path='/reuniao'><Meetings /></Route>
                <Route path='/almoco'><Lunch /></Route>
                <Route path='/sabado'><Saturday /></Route>
                <Route path='/domingo'><Sunday /></Route>
            </Switch>
        </>
    );
}