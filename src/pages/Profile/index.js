import { useContext, useState } from 'react';
import { DefaultContainer } from '../../components/DefaultPagesContainer';
import Header from '../../components/Header';
import avatar from '../../components/Header/avatar.png' 
import { UserContext } from '../../contexts/UserContext';
import { HiUpload } from 'react-icons/hi';

import { storage, db } from '../../services/FirebaseConnection';
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes,  getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';

const Profile = () => {

    const { user, saveUserDataLocalStorage, setUser } = useContext(UserContext);
    const [ name, setName ] = useState(user.name);
    const [ cargo, setCargo ] = useState(user.cargo);
    const [ email ] = useState(user.email)
    const [ loading, setLoading ] = useState(false)
    const [ avatarUrl, setAvatarUrl ] = useState(user && user.avatarUrl)
    const [ imageAvatar, setImageAvatar ] = useState(null)

    async function handleUpdateUser (e) {
        e.preventDefault()
        
        if(imageAvatar === null && name !== '' && cargo !== ''){
            setLoading(true)
            const docRef = doc(db, "users", user.uid)
            await updateDoc(docRef, {
                name: name,
                cargo: cargo,
            })
            .then(() => {
                let data = {
                    ...user,
                    name: name,
                    cargo: cargo
                }
                setUser(data)
                saveUserDataLocalStorage(data)
                toast.success("Atualizado com sucesso!")
                setLoading(false)
            })
        }else if( cargo !== '' && avatarUrl !== null){
            handleUpload()
            setLoading(true)
        }

        
    }


    function handleFile(e) {
        if(e.target.files[0]){
            const image = e.target.files[0]

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImageAvatar(image)
                setAvatarUrl(URL.createObjectURL(image))
            }else{
                alert("Envie uma imagem do tipo png ou jpeg")
                setImageAvatar(null)
                return;
            }
        }
    }

    async function handleUpload(){
        setLoading(true)
        const currentUid = user.uid;

        const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)

        const uploadTask = uploadBytes(uploadRef, imageAvatar)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then( async (downloadURL) => {
                let urlFoto = downloadURL;
                const docRef = doc(db, "users", user.uid)
                await updateDoc(docRef,{
                    name: name,
                    cargo: cargo,
                    avatarUrl: urlFoto,
                    email: email
                })
                .then(() => {
                    let data = {
                        ...user,
                        cargo: cargo,
                        avatarUrl: urlFoto
                    }

                    setUser(data)
                    saveUserDataLocalStorage(data)
                    toast.success("Atualizado com sucesso!")
                    setLoading(false)
                })
            })
        })
        setLoading(false)
    }

    return(
        <>
            <Header />
            <DefaultContainer>
                <h1> Meu Perfil </h1>
                <div className='form-container'>
                    <form onSubmit={handleUpdateUser}>

                    
                    <label className='avatar'>
                        <span><HiUpload size={30} color="#fff"/></span>
                        <input type="file" accept='image/*' onChange={handleFile} />
                        {avatarUrl !== null ? 
                            ( <img src={avatarUrl} alt="foto do usuário"/> ) : 
                            ( <img src={avatar} alt="foto do usuário"/> ) }
                    </label>

                        <label>
                            <span>Nome:</span>
                            <input type='text' value={name || ''} onChange={(e) => setName(e.target.value)}/>
                        </label>

                        <label>
                            <span>Cargo:</span>
                                <select value={cargo || ''} onChange={(e) => setCargo(e.target.value)}>
                                    <option value=''></option>
                                    <option value='Gerente'>Gerente de TI</option>
                                    <option value='Analista'>Analista de TI</option>
                                    <option value='Auxiliar'>Auxiliar de TI</option>
                                    <option value='Estagiário'>Estagiário</option>
                                    <option value='Aprendiz'>Jovem Aprendiz</option>
                                </select>
                        </label>

                        <label>
                            <span>Email:</span>
                            <input type='text' disabled='disabled' value={user.email} />
                        </label>

                        {loading ? <button className='save-btn'>Atualizando...</button> :
                        <button className='save-btn'>Editar</button>}
                    </form>
                </div>
            </DefaultContainer>
        </>
    )
}

export default Profile;