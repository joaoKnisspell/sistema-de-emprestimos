import styled from "styled-components";

const ModalContainer = styled.div`
        position: absolute;
        top:0;
        right: 0;
        width: 350px;
        height: 100vh;
        background-color: var(--cinza);
        padding: 1em;
        text-align: justify;
        .modal-header{
            display: flex;
            justify-content: space-between;
            margin-bottom: 1em;
            button{
                padding: 10px 15px;
                border-radius: 4px;
                background-color: var(--azul);
                font-weight: 500;
                color: var(--branco);
            }
        }
        ul{
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 1em;
            span{
                font-weight: 600;
            }
            .status{

            }
            .complemento{
                p{
                    margin-top: 0.5em;
                }
            }
        }
`

const Modal = ( { item, setModal } ) => {
    return (
        <ModalContainer>
                <div className="modal-header">
                    <h2>Detalhes:</h2>
                    <button onClick={() => setModal(false)}>Fechar</button>
                </div>
                <ul>
                    <li><span>Nome: </span>{item.nome}</li>
                    <li><span>Cargo: </span>{item.cargo}</li>
                    <li><span>Equipamento: </span>{item.equipamento}</li>
                    <li><span>Lote: </span>{item.lote}</li>
                    <li><span>Número: </span>{item.numero}</li>
                    <li><span>Data: </span>{item.data}</li>
                    <li><span>Saída: </span>{item.saida}</li>
                    <li><span>Entrada: </span>{item.entrada}</li>
                    <li><span>Status: </span>{item.status}</li>
                    <li className="complemento"><span>Complemento: </span><p>{item.complemento}</p></li>
                </ul>
        </ModalContainer>
    )
}

export default Modal