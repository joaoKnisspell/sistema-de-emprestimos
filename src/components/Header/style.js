import styled from "styled-components";

export const HeaderContainer = styled.header`
    position:fixed;
    width: 280px;
    background-color: var(--azul);
    height: 100vh;
    nav{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: calc(100vh - 196px);
    }
    .img-section{
        height: 180px;
        width: 100%;
        position: relative;
        background-position: center;
        background-size: cover;
        .fade{
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0, 0.4);
        }
        img{
            position: absolute;
            top:50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius:50%;
            height: 130px;
            width: 130px;
            object-fit: cover;
            object-position: center;
            background-color: var(--branco);
        }
    }
    .nav-link{
            display: flex;
            align-items: center;
            color: var(--branco);
            font-size: 18px;
            gap: 10px;
            padding: 1em;
            transition: .4s ease-in-out;
            opacity: 0.7;
            .icon{
                font-size: 25px;
            }
        }
        a:hover{
           opacity: 1;
        }

    .nav-list{
        list-style-type: none;
    }
    .logout-link{
        border: none;
        background-color: transparent;
        text-align: left;
    }
`