import React, { useState, useEffect } from 'react';
import Moment from 'moment';

import logo from '../assets/images/cost-logo.png';

import api from '../services/api';

function List() {
    const [result, setResult] = useState([]);

    useEffect(() => {
        const getList = async () => {
            const response = await api.get('/list');
            setResult(response);
        }
        getList();
    }, []);

    return (
        <div className="content">
            <div className="list">
                <div className="list-box">
                    <div className="head">
                        <img src={logo} alt="COST" width="250" />
                    </div>
                    <hr />
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
                                    <td>{Moment(item.dataConfirmacao).format('DD/MM/YYYY HH:mm:ss')}</td>
                                    <td>{item.nome}</td>
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
