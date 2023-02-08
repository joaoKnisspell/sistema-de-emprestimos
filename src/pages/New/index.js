import { useContext, useEffect, useState } from 'react';
import { DefaultContainer } from '../../components/DefaultPagesContainer';
import Header from '../../components/Header';
import { UserContext } from '../../contexts/UserContext';
import { useParams } from 'react-router-dom';

import { db } from '../../services/FirebaseConnection';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const New = () => {

    const { user, handleAddEmprestimo, handleEditEmprestimo } = useContext(UserContext);
    const [nome, setNome] = useState('');
    const [equipamento, setEquipamento] = useState('');
    const [numero, setNumero] = useState('');
    const [lote, setLote] = useState('');
    const [data, setData] = useState();
    const [status, setStatus] = useState('Em aberto');
    const [cargo, setCargo] = useState('');
    const [complemento, setComplemento] = useState('');
    const [saida, setSaida] = useState('');
    const [entrada, setEntrada] = useState('');

    const parametros = useParams();
    const idPage = parametros.id;

    useEffect(() => {
        async function loadEmprestimo(){
            const docRef = doc(db, "emprestimos", idPage)
            await getDoc(docRef)
            .then((value) => {
                setNome(value.data().nome)
                setEquipamento(value.data().equipamento)
                setNumero(value.data().numero)
                setLote(value.data().lote)
                setData(value.data().data)
                setCargo(value.data().cargo)
                setStatus(value.data().status)
                setComplemento(value.data().complemento)
                setSaida(value.data().saida)
                setEntrada(value.data().entrada)
            })
            .catch((error) => {
                console.log(error)
            })
        }
        if(idPage !== undefined){
            loadEmprestimo()
        }
    }, [])

    const numeros = []

    for (let i = 1; i <= 40; i++) {
        numeros.push(i);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (nome !== '' && equipamento !== '' && data !== '') {

            if (idPage !== undefined) {
                handleEditEmprestimo(idPage, nome, equipamento, numero, lote, data, cargo, complemento, status, saida, entrada)
                return;
            }

            await handleAddEmprestimo(nome, equipamento, numero, lote, data, cargo, complemento, status, saida, entrada)
                .then(() => {

                    setNome('')
                    setEquipamento('')
                    setNumero('')
                    setLote('')
                    setData('')
                    setCargo('')
                    setComplemento('')
                    setEntrada('')
                    setSaida('')
                })
        } else {
            toast.alert(("Preencha os campos obrigatórios!"))
        }

    }

    return (
        <>
            <Header />
            <DefaultContainer>
                {idPage ? <h1>Editar Empréstimo</h1> : <h1>Novo Empréstimo</h1>}
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>

                        <div className='sujeito'>

                            <label>
                                <span>*Nome:</span>
                                <input type='text' value={nome || ''} onChange={(e) => setNome(e.target.value)} />
                            </label>


                            <label>
                                <span>Cargo:</span>
                                <select value={cargo || ''} onChange={(e) => setCargo(e.target.value)}>
                                    <option value=''></option>
                                    <option value='Professor(a)'>Professor(a)</option>
                                    <option value='Aluno(a)'>Aluno(a)</option>
                                    <option value='Outro'>Outro</option>
                                </select>
                            </label>

                        </div>

                        <div className='equipamento-section'>
                            <label>
                                <span>*Equipamento:</span>
                                <select value={equipamento || ''} onChange={(e) => setEquipamento(e.target.value)}>
                                    <option value=''></option>
                                    <option value='Notebook'>Notebook</option>
                                    <option value='Cromebook'>Cromebook</option>
                                    <option value='Ipad'>Ipad</option>
                                    <option value='Outro'>Outro</option>
                                </select>
                            </label>


                            <label>
                                <span>Lote:</span>
                                <select value={lote || ''} onChange={(e) => setLote(e.target.value)}>
                                    <option value=''></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                            </label>

                            <label>
                                <span>Número:</span>
                                <select value={numero || ''} onChange={(e) => setNumero(e.target.value)}>
                                    <option value=''></option>
                                    {numeros.map((numero) => {
                                        return <option key={numero} value={numero}>{numero}</option>
                                    })}
                                </select>
                            </label>

                        </div>

                        <label>
                            <span>*Data:</span>
                            <input type='text' value={data || ''} onChange={(e) => setData(e.target.value)} placeholder="Ex: 01/01/2023" />
                        </label>

                        <div className='hora'>
                            <label>
                                <span>Saída:</span>
                                <input type='text' value={saida || ''} onChange={(e) => setSaida(e.target.value)} placeholder="Ex: 10:50" />
                            </label>

                            <label>
                                <span>Entrada:</span>
                                <input type='text' value={entrada || ''} onChange={(e) => setEntrada(e.target.value)} placeholder="Ex: 11:30" />
                            </label>
                        </div>

                        <label>
                            <span>Status:</span>
                            <select value={status || ''} onChange={(e) => setStatus(e.target.value)}>
                                <option value='Em aberto'>Em aberto</option>
                                <option value='Devolvido'>Devolvido</option>
                            </select>
                        </label>

                        <label>
                            <span>Complemento:</span>
                            <textarea placeholder='Descrição...(opcional)' value={complemento || ''} onChange={(e) => setComplemento(e.target.value)} />
                        </label>

                        {idPage !== undefined ? <button type='submit' className='save-btn'>Editar</button> : <button type='submit' className='save-btn'>Cadastrar</button>}
                    </form>
                </div>
            </DefaultContainer>
        </>
    )
}

export default New