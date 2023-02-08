import { useContext, useState, useEffect } from "react"
import { DefaultContainer } from "../../components/DefaultPagesContainer"
import { UserContext } from "../../contexts/UserContext"
import { IoMdAdd } from "react-icons/io"
import { BiEdit } from 'react-icons/bi'
import { AiOutlineFileSearch } from 'react-icons/ai'

import Header from "../../components/Header";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom"

import { TableContainer } from './style';
import { db } from "../../services/FirebaseConnection"
import { getDocs, collection, query, orderBy, limit, startAfter } from 'firebase/firestore';

const Dashboard = () => {

  const { user, handleSignOut } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const [emprestimoDetail, setEmprestimoDetail] = useState();
  const [emprestimos, setEmprestimos] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastDoc, setLastDoc] = useState()
  const [isEmpty, setIsEmpty] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    async function loadEmprestimos() {
      const docsRef = collection(db, "emprestimos")
      const q = query(docsRef, orderBy("created", "desc"), limit(5))
      const queryResult = await getDocs(q)
      await updateState(queryResult)
    }
    loadEmprestimos()
  }, [])


  async function updateState(queryResult) {
    const isCollectionEmpty = queryResult.size === 0;

    if (!isCollectionEmpty) {
      let lista = [];
      queryResult.forEach((doc) => {
        lista.push({
          id: doc.id,
          nome: doc.data().nome,
          cargo: doc.data().cargo,
          equipamento: doc.data().equipamento,
          lote: doc.data().lote,
          numero: doc.data().numero,
          data: doc.data().data,
          status: doc.data().status,
          complemento: doc.data().complemento,
          userUid: doc.data().userUid,
          saida: doc.data().saida,
          entrada: doc.data().entrada
        })
      })
      const lastDoc = queryResult.docs[queryResult.docs.length - 1]
      setEmprestimos([...emprestimos, ...lista])
      setLoading(false)
      setLastDoc(lastDoc)
      setLoadingMore(false)
    }else{
      setIsEmpty(true)
      setLoadingMore(false)
    }

    setLoadingMore(false)

  }

  async function loadMore() {
    setLoadingMore(true)
    const docsRef = collection(db, "emprestimos")
    const q = query(docsRef, orderBy("created", "desc"), startAfter(lastDoc), limit(5))
    const queryResult = await getDocs(q)
    await updateState(queryResult)
  }

  const toggleModal = (item) => {
    setModal(true)
    setEmprestimoDetail(item)
  }

  return (
    <>
      <Header handleSignOut={handleSignOut} />
      <DefaultContainer>
        {modal ? <div className="fade"></div> : ''}
        <h1>Empréstimos</h1>
        <div className="search-add">
          <Link to="/new"><button><IoMdAdd size={20} />Novo Empréstimo</button></Link>
        </div>

        <main className="table-height">
          <TableContainer>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Equipamento</th>
                <th>Número</th>
                <th>Lote</th>
                <th>Data</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            {loading && !isEmpty ? <h2>Carregando empréstimos...</h2> : (
              <tbody>
              {emprestimos.map((emprestimo) => {
                return (
                  <tr key={emprestimo.id} style={emprestimo.cargo === "Professor(a)" ? { backgroundColor: "lightblue" } : { backgroundColor: "" }}>
                    <td data-label='Nome'>{emprestimo.nome}</td>
                    <td data-label='Equipamento'>{emprestimo.equipamento}</td>
                    <td data-label='Número'>{emprestimo.numero}</td>
                    <td data-label='Lote'>{emprestimo.lote}</td>
                    <td data-label='Data'>{emprestimo.data}</td>
                    <td data-label='Status'>
                      <span className="status" style={emprestimo.status === "Devolvido" ? { backgroundColor: "green" } : { backgroundColor: "gray" }}>{emprestimo.status}</span>
                    </td>
                    <td className="table-btns">
                      <button><Link to={`/new/${emprestimo.id}`}><BiEdit className="icon-1" /></Link></button>
                      <button><AiOutlineFileSearch className="icon-2" onClick={() => toggleModal(emprestimo)} /></button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            )}

            
          </TableContainer>
        </main>

        {loadingMore && !isEmpty ? <h3> Carregando...</h3> : ''}
        <button style={modal ? {display: 'none'} : {display: 'block'}} onClick={loadMore} className="load-more">Carregar mais</button>

        {modal ? <Modal item={emprestimoDetail} setModal={setModal} modal={modal} /> : ''}

      </DefaultContainer>
    </>
  )
}

export default Dashboard