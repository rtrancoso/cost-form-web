import React, { useState, useEffect } from 'react';
import Moment from 'moment';

import logo from '../assets/images/cost-logo.jpg';

import api from '../services/api';

function List() {
    const [meeting, setMeeting] = useState('')
    const [meetings, setMeetings] = useState([])
    const [result, setResult] = useState([]);

    useEffect(() => {
        const getMeetings = async () => {
            const response = await api.get(`/meetings`);
            setMeetings(response);
        }
        getMeetings();
    }, []);

    useEffect(() => {
        const getList = async () => {
            if (meeting) {
                const response = await api.get(`/meetings/${meeting}/list`);
                setResult(response);
            }
        }
        getList();
    }, [meeting]);

    return (
        <div className="content">
            <div className="list">
                <div className="list-box">
                    <div className="head">
                        <img src={logo} alt="COST" width="250" />
                    </div>
                    <hr />
                    <div className="select">
                        <select value={meeting} onChange={e => setMeeting(e.target.value)} required>
                            <option value="" defaultValue>Selecione</option>
                            {meetings.map((item, key) => (<option key={key} value={item.id}>{item.description}</option>))}
                        </select>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data Confirmação</th>
                                <th>Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.id}</td>
                                    <td>{Moment(item.confirmedAt).format('DD/MM/YYYY HH:mm:ss')}</td>
                                    <td>{item.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default List;
