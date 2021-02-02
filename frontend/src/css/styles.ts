import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body, .modal-content {
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
  }

  hr {
    background: ${props => props.theme.text};
  }

  header {
    background: ${props => props.theme.primary};

    a.dropdown-item {
      &.active {
        color: ${props => props.theme.primary}
      }

      &:focus {
        background: ${props => props.theme.primary}
      }
    }
  }

  .notes {
    li {
      box-shadow: 0 2px 10px rgba(${props => props.theme.shadow});
      background: ${props => props.theme.bgNote};
      
      &:hover {
        background: ${props => props.theme.bgNoteHover};
      }
    }
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary} !important;
  }
`