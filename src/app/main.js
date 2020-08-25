import React, { useState, useEffect } from 'react';

import logo from '../assets/images/cost-logo.png';
import party from '../assets/images/party-icon.png';

import api from '../services/api';

function Main() {

    const [name, setName] = useState('');
    const [rest, setRest] = useState('');
    const [full, setFull] = useState('');
    const [result, setResult] = useState(false);

    useEffect(() => {
        const getStores = async () => {
            const response = await api.get('/status');
            setRest(response.rest);
            setFull(response.full);
        }
        getStores();
    }, []);

    const confirm = async () => {
        await api.post('/confirm', { nome: name });
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
                            <h2>Estamos voltando a reunir!!! <img src={party} alt="Party" width="30" /></h2>
                            <span>Devido ao cenário em que estamos inserido, uma pandemia, o número de pessoas que podem participar dos cultos está reduzido, com isso estamos fazendo um sistema de confirmação de presença.</span>
                        </div>
                        <div className="counter">
                            Vagas disponíves:
                        <span className="vagas">{rest}/{full}</span>
                        </div>
                        <div className="title">
                            <span>Garanta sua vaga!! informe seu nome completo no formuário abaixo.</span>
                        </div>
                        <div className="fields">
                            <input type="text" name="fname" placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)} required />
                            <button type="submit" onClick={() => confirm()} disabled={rest <= 0}>Confirmar Presença</button>
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
