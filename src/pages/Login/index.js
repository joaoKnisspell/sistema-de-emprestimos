//React
import { useContext, useState } from "react";

//Estilo
import { Link } from "react-router-dom";
import { LoginContainer } from "../../components/LoginContainer"

//Imagens
import logo from '../../components/LoginContainer/logo.png';

//Contexts
import { UserContext } from "../../contexts/UserContext";

const Login = () => {

  const { user, login, loadingAuth } = useContext(UserContext);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  
  return (
    <LoginContainer>
      <main>
        <img className="logo" src={logo} alt="logo israelita" />
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email || ''} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Senha" value={password || ''} onChange={(e) => setPassword(e.target.value)}/>

          {loadingAuth ? <button type="submit"><span>Carregando...</span></button> : 
            <button type="submit"><span>Entrar</span></button> }
          
        </form>
        <p>Ainda não possui conta? <Link to="/register">Crie agora mesmo!</Link></p>
      </main>
    </LoginContainer>
  )
}

export default Login