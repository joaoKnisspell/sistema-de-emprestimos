//React
import styled from "styled-components";

export const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color:#e8e8e8;
    main{
        width: 100%;
        max-width: 530px;
        background-color: var(--branco);
        padding: 3em;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
        .logo{
            width: 100%;
            margin-bottom: 2em;
        }
        form{
            display: flex;
            flex-direction: column;
            gap: 2.5em;

            input, button, h1{
                width: 100%;
                font-size: 20px;
            }
            input{
                background-color: transparent;
                padding-bottom: 8px ;
                border-bottom: 3px solid #999999;
                color: gray;
            }
            button{
                padding: 10px 0;
                color: #e8e8e8;
                background-color:var(--azul);
            }
            h1{
                font-weight: 500;
            }
        }
        p{
            text-align: center;
            margin-top: 1em;
            color: gray;
            a{
                color: var(--azul);
            }
        }
    }
`