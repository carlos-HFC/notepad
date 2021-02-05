import styled from "styled-components"

const PerfilContainer = styled.div`
  background: ${props => props.theme.perfilBg};
  border-radius: 8px;
  margin: auto;
  margin-top: 15px;
  max-width: 980px;
  padding: 25px 40px;
  width: 100%;

  & > :first-child {
    align-items: center;
    display: flex;
    justify-content: space-between;

    @media (max-width: 767px) {
      flex-direction: column;
    }
  }

  .img-profile {
    align-items: center;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 7px;
  }

  ul {
    flex: 1;
    list-style: none;
    margin-left: 20px;

    @media (max-width: 767px) {
      margin-left: 0;
      width: 100%;
    }

    h2 {
      font-weight: 700;
      margin-bottom: 15px;
      text-align: center;
    }

    li {
      background: ${props => props.theme.perfilBgList};
      border-radius: 4px;
      color: ${props => props.theme.perfilText};
      padding: 10px 18px;

      & + li {
        margin-top: 5px;
      }

      span {
        font-weight: 700;
        margin-right: 5px;
        text-transform: uppercase;
      }
    }
  }

  & > :last-child {
    justify-content: flex-end;
    
    @media (max-width: 767px) {
      justify-content: center;

      button {
        width: 100%;
      }
    }
  }
`

export default PerfilContainer
