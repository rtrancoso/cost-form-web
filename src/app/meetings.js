import React, { useState, useEffect } from 'react';

import logo from '../assets/images/cost-logo.jpg';
import power from '../assets/images/power-off-solid.png';
import trash from '../assets/images/trash-solid.png';

import api from '../services/api';

function Meetings() {
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const getMeetings = async () => {
            const response = await api.get('/meetings');
            setMeetings(response);
        }
        getMeetings();
    }, []);

    const getMeetings = async () => {
        const response = await api.get('/meetings');
        setMeetings(response);
    }

    const confirm = async () => {
        await api.post('/meetings', { description: description, type: type });
        getMeetings();
    }

    const toggle = async (meetingId) => {
        await api.put(`/meetings/${meetingId}/active`);
        getMeetings();
    }

    const remove = async (meetingId) => {
        await api.delete(`/meetings/${meetingId}`);
        getMeetings();
    }

    return (
        <div className="content">
            <div className="form">
                <div className="form-box">
                    <div className="head">
                        <img src={logo} alt="COST" width="250" />
                    </div>
                    <hr />
                    <input type="text" name="fname" placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} required />
                    <div className="select">
                        <select value={type} onChange={e => setType(e.target.value)} required>
                            <option value="" defaultValue>Selecione</option>
                            <option key="LUNCH" value="LUNCH">LUNCH</option>
                            <option key="MEETING" value="MEETING">MEETING</option>
                            <option key="SATURDAY" value="SATURDAY">SATURDAY</option>
                            <option key="SUNDAY" value="SUNDAY">SUNDAY</option>
                        </select>
                    </div>
                    <button type="submit" onClick={() => confirm()} disabled={!description || !(description.trim())}>Cadastrar</button>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Descrição</th>
                                <th>Ativo</th>
                                <th className="table-actions">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meetings.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.id}</td>
                                    <td>{item.description}</td>
                                    <td align="center">{item.active ? "Sim" : "Não"}</td>
                                    <td className="table-actions">
                                        <img src={power} onClick={() => toggle(item.id)} alt="toggle" height="18" style={{ marginRight: 8 }} />
                                        <img src={trash} onClick={() => remove(item.id)} alt="delete" height="18" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Meetings;
