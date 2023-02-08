//Estilo
import { LoginContainer } from "../../components/LoginContainer";

//Imagens
import logo from '../../components/LoginContainer/logo.png';

//React
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

//Contexts
import { UserContext } from "../../contexts/UserContext";

const SignUp = () => {

    //States
    const { user, register, loadingAuth } = useContext(UserContext);
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    //Funções
    const handleSubmit = (e) => {
        e.preventDefault()
        register(name, email, password)

        setName('')
        setEmail('')
        setPassword('')
    }
    

    return(
        <LoginContainer>
            <main>
                <img className="logo" src={logo} alt="logo israelita" />
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nome" value={name || ''} onChange={(e) => setName(e.target.value)}/>
                    <input type="email" placeholder="Email" value={email || ''} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Senha" value={password || ''} onChange={(e) => setPassword(e.target.value)}/>

                    {loadingAuth ? <button type="submit" onClick={handleSubmit}><span>Carregando...</span></button> :
                        <button type="submit" onClick={handleSubmit}><span>Cadastrar</span></button>}
                </form>
                <p>Já possui conta? <Link to="/">Entre agora!</Link></p>
            </main>
        </LoginContainer>
    )
}

export default SignUp;