import styled from "styled-components";
import vector from "./Vector.svg"

export const DefaultContainer = styled.div`
    margin-left: 280px;
    padding: 2em 3em;
    .form-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 3em;
        form{
            margin-top: 1.5em;
            width: 100%;
            max-width: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1em;
            .avatar{
                text-align: center;
                cursor: pointer;
                position: relative;
                span{
                    position: absolute;
                    top: 47%;
                    left: 47%;
                    z-index: 99;
                    opacity: 0.8;
                    transition: 0.4s ease-in-out;
                    :hover{
                        transform: scale(1.2);
                        opacity: 1;
                    }
                }
                input{
                    display: none;
                }
                img{
                    text-align: center;
                    width: 200px;
                    height: 200px;   
                    position: relative;
                    background-color: var(--branco);
                }
            }
            label{
                width: 100%;
            }
            .equipamento-section, .hora, .sujeito{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 2em;   
            }
            span{
                font-weight: 600;
                font-size: 18px;
            }
            input, select, button, textarea{
                /* display: block; */
                border: 1px solid red;
                width: 100%;
                padding: 10px 10px;
                margin-top: 5px;
                background-color: var(--cinza);
                outline: none;
                border: none;
                font-size: 16px;
            }
            button{
                background-color: var(--azul);
                color: var(--branco);
            }
        }
        .radios{
            display: flex;
            gap: 1em;
            .input-radio{
            display: flex;
            gap: 5px;
            span{
                font-weight: 400;
                font-size: 16px;
                align-self: flex-end;
                padding-top: 3px;
            }
            }
        }
        textarea{
            resize: none;
            min-height:70px;
        }
    }
    .search-add{
        margin: 1.5em 0;
        width:100%;
        display: flex;
        justify-content: flex-end;
        input, button{
            padding: 8px 16px;
            font-size: 16px;
        }
        /* input{
            width: 50%;
            border-radius: 20px;
            color: gray;
            text-align: center;
            background-color: #e8e8e8;
        }
        input::placeholder{
            background-image: url(${vector});
            background-size: contain;
            background-repeat: no-repeat;
        } */
        button{
            background-color: green;
            color: var(--branco);
            display: flex;
            align-items: center;
            gap: 5px; 
            a{
                color: var(--branco);
                border: 1px solid red;
                width: 100%;
            }
        }
    }
    .table-height{
        max-height: calc(100vh - 300px);
        overflow-y: scroll;
        border: 5px solid var(--cinza);
    }

    .fade{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.6);
    }

    .load-more{
        margin-top: 2em;
        padding: 10px;
        font-size: 16px;
        background-color: orange;
        color: var(--branco);
        /* position: absolute;
        bottom: 90px; */
        opacity: 0.9;
        transition: 0.4s;
        :hover{
            opacity: 1;
        }
    }
`