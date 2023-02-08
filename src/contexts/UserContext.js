//React
import { createContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'; 

//Firebase
import { db, auth, storage } from '../services/FirebaseConnection';

//Auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

//Firestore
import { getDoc, collection, doc, setDoc, updateDoc, addDoc, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { toast } from 'react-toastify';


export const UserContext = createContext();

const UserContextProvider = ( { children } ) => {

    //Navegação
    const navigate = useNavigate();

    //States
    const [ user, setUser ] = useState();
    const [ emprestimos, setEmprestimos ] = useState([])
    const [ loading, setLoading ] = useState(true);
    const [ loadingAuth, setLoadingAuth ] = useState(false)

    //Registrando User
    async function register(name, email, password){
        setLoadingAuth(true)
        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
            let uid = value.user.uid
            let docRef = doc(db, "users", uid)
            await setDoc(docRef, {
                uid: uid,
                name: name,
                avatarUrl: null,
                cargo: null
            })
            .then(() => {
                let userData = {
                    uid: value.user.uid,
                    name: name,
                    email: value.user.email,
                    avatarUrl: null,
                    cargo: null
                }
                setUser(userData)
                saveUserDataLocalStorage(userData)
                setLoadingAuth(false)
                toast.success("Usuário cadastrado com sucesso!")
                navigate("/dashboard")
            })
        })
        .catch((error) => {
            if(error.code === 'auth/email-already-in-use'){
                toast.warn("Email já cadastrado!")
            }else if(error.code === 'auth/weak-password'){
                toast.warn("Senha muito fraca!")
            }
            setLoadingAuth(false)
        })
    }

    //Salvando user no LocalStorage
    function saveUserDataLocalStorage(data){
        localStorage.setItem("@userData", JSON.stringify(data))
    }

    //Checar user no LocalStorage
    useEffect(() => {
        async function loadUser(){
            const storageUser = localStorage.getItem("@userData");

            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }

            setLoading(false)
        }
        loadUser()
    }, [])

    //Logando user
    async function login(email, password){
        setLoadingAuth(true)
        await signInWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid; 
            let docRef = doc(db, "users", uid)
            await getDoc(docRef)
            .then((value) => {
                let userData = {
                    uid: uid,
                    name: value.data().name,
                    email: email,
                    cargo: value.data().cargo,
                    avatarUrl: value.data().avatarUrl
                }
                setUser(userData)
                saveUserDataLocalStorage(userData)
                setLoadingAuth(false)
                navigate("/dashboard")
                toast.success("Login realizado com sucesso!")
            })
        })
        .catch((error) => {
            if(error.code === "auth/wrong-password"){
                toast.error("Senha incorreta!")
                
            }else if(error.code === "auth/user-not-found"){
                toast.warn("Email não cadastrado!")
            }
            setLoadingAuth(false)
        })
    }

    //Deslogando user
    async function handleSignOut(){
        await signOut(auth)
        localStorage.removeItem("@userData")
        setUser(null)
        toast.success(("Volte sempre!"))
    }

    //Atualizando doc do User
    async function updateUserDoc(name, cargo, avatarUrl){
        const docRef = doc(db, "users", user.uid)
        await updateDoc(docRef, {
            name: name,
            cargo: cargo,
            avatarUrl: avatarUrl
        })
        .then(() => {
            saveUserDataLocalStorage({...user, name, cargo})
            toast.success(("Perfil atualizado com sucesso!"))
        })
        .catch((error) => console.log(error))
    }

    //Criando chamados
    async function handleAddEmprestimo(nome, equipamento, numero, lote, data, cargo, complemento, status, saida, entrada){
        const docRef = collection(db, "emprestimos")
        await addDoc(docRef, {
           nome: nome,
           equipamento: equipamento,
           numero: numero,
           lote: lote,
           data: data,
           cargo: cargo,
           complemento: complemento,
           status: status,
           created: new Date(),
           saida: saida,
           entrada: entrada
        })
        .then(() => {
            toast.success(("Empréstimo cadastrado com sucesso!"))
        })
        .catch((error) => {
            console.log(error)
        })
    }

    async function handleEditEmprestimo(id, nome, equipamento, numero, lote, data, cargo, complemento, status, saida, entrada){
        const docRef = doc(db, "emprestimos", id)
        await updateDoc(docRef, {
            nome: nome,
            equipamento: equipamento,
            numero: numero,
            lote: lote,
            data: data,
            cargo: cargo,
            complemento: complemento,
            status: status,
            saida: saida,
            entrada: entrada
        })
        .then(() => {
            toast.success(("Documento atualizado com sucesso!"))
        })
        .catch(error => console.log(error))
    }

    return(
        <UserContext.Provider value={{ user, signed: !!user, loading, loadingAuth, register, login, handleSignOut, setUser, saveUserDataLocalStorage, handleAddEmprestimo, emprestimos, setEmprestimos, handleEditEmprestimo}}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContextProvider;