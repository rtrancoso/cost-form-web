import React, { useState, useEffect } from 'react';

import logo from '../assets/images/cost-logo.jpg';
import party from '../assets/images/party-icon.png';

import api from '../services/api';

function Main() {

    const [name, setName] = useState('');
    const [meeting, setMeeting] = useState('')
    const [meetings, setMeetings] = useState([])
    const [result, setResult] = useState(false);

    useEffect(() => {
        const getMeetings = async () => {
            try {
                const response = await api.get(`/meetings/active`);
                setMeetings(response);
            } catch (error){}
        }
        getMeetings();
    }, []);

    const confirm = async () => {
        await api.post(`/meetings/${meeting}/confirm`, { name: name, meeting: { id: meeting } });
        setResult(true);
    }

    return (
        <div className="content">
            <div className="form">
                <div className="form-box">
                    <div className="head">
                        <img src={logo} alt="COST" width="250" />
                    </div>
                    <hr />
                    {!result ? (<>
                        <div className="title">
                            <span>Garanta sua vaga!! informe qual reunião e seu nome completo no formuário abaixo.</span>
                        </div>
                        <div className="fields">
                            <div className="select">
                                <select value={meeting} onChange={e => setMeeting(e.target.value)} required>
                                    <option value="" defaultValue>Selecione</option>
                                    {meetings.map((item, key) => (<option key={key} value={item.id}>{item.descricao}</option>))}
                                </select>
                            </div>
                            <input type="text" name="fname" placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)} required />
                            <button type="submit" onClick={() => confirm()} disabled={!meeting || !name || !(name.trim())}>Confirmar Presença</button>
                        </div>
                    </>) : (<>
                        <div className="title">
                            <h2>Presença confirmada!!!</h2>
                            <div>
                                <img src={party} alt="Party" width="100" />
                                <img src={party} alt="Party" width="100" />
                                <img src={party} alt="Party" width="100" />
                            </div>
                        </div>
                    </>)}
                </div>
            </div>
        </div>
    );
}

export default Main;
