import styled from "styled-components"

const PerfilContainer = styled.div`
  max-width: 980px;
  width: 100%;
  margin: auto;
  margin-top: 15px;
  padding: 25px 40px;
  border-radius: 8px;
  background: ${props => props.theme.perfilBg};

  & > :first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 767px) {
      flex-direction: column;
    }
  }

  .img-profile {
    padding: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%
  }

  ul {
    margin-left: 20px;
    flex: 1;
    list-style: none;

    @media (max-width: 767px) {
      margin-left: 0;
      width: 100%;
    }

    h2 {
      text-align: center;
      font-weight: 700;
      margin-bottom: 15px;
    }

    li {
      padding: 10px 18px;
      border-radius: 4px;
      background: ${props => props.theme.perfilBgList};
      color: ${props => props.theme.perfilText};

      & + li {
        margin-top: 5px;
      }

      span {
        font-weight: 700;
        text-transform: uppercase;
        margin-right: 5px;
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
