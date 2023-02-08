import { HeaderContainer } from './style'
import avatar from "./avatar.png";
import { Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { AiFillSchedule } from 'react-icons/ai';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { MdInventory } from 'react-icons/md';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Header = ({handleSignOut}) => {

    const { user } = useContext(UserContext)

  return (
    <HeaderContainer>
        <div className="img-section">
            <div className="fade" />
            <img src={user.avatarUrl !== null ? user.avatarUrl : avatar} alt="foto do usuário" />
        </div>
        <nav>
            <ul className="nav-list">
                <li>
                    <Link className='nav-link' to="/dashboard">
                        <AiFillSchedule className="icon" />
                        <span>Empréstimos</span>
                    </Link>
                </li>

                <li>
                    <Link className='nav-link' to="/profile">
                        <FaUserCircle className="icon" />
                        <span>Meu perfil</span>
                    </Link>
                </li>
            </ul>
            <button className='logout-link' onClick={handleSignOut}>
                    <Link className='nav-link' to="/">
                        <RiLogoutBoxFill size={25} />
                        <span>Sair</span>
                    </Link>
                </button>
        </nav>
    </HeaderContainer>
  )
}

export default Header