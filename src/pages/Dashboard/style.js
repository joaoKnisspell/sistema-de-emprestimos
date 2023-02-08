import styled from "styled-components";

export const TableContainer = styled.table`
    width: 100%;
    /* border: 3px solid gray; */
    text-align: center;
    th, td{
        padding: 5px;
    }
    tr{
        background-color: #e8e8e8;
    }
    .table-btns{
        display: flex;
        justify-content: center;
        gap:8px;
        button{
            background-color: transparent;
        }
        .icon-1, .icon-2{
           font-size: 25px;
           padding: 2px;
           display: flex;
           align-items: center;
           border-radius:4px;
           color: var(--branco);
        }
        .icon-1{
            background-color: #144272;
        }
        .icon-2{
            background-color: #205295;
        }
    }
    .status{
        background-color: gray;
        padding: 4px 5px;
        border-radius: 8px;
        color: var(--branco);
    }
`