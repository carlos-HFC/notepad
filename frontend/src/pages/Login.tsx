import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Button, InputBlock, Loader } from "components";
import { isAuth, setToken } from "services/auth";
import api from "services/api";
import { notification } from "utils";

function Login() {
  const history = useHistory()

  const [active, setActive] = useState(false) // FORMULÁRIO PARA REATIVAÇÃO DE CONTA
  const [email, setEmail] = useState("") // VALOR PARA REATIVAR CONTA
  const [load, setLoad] = useState(false) // LOADER
  const [login, setLogin] = useState({ // VALORES DE LOGIN
    email: "",
    password: "",
  })
  const [panel, setPanel] = useState(false) // MUDANÇA DO PAINEL DE LOGIN PARA CADASTRE-SE E VICE-VERSA
  const [register, setRegister] = useState({ // VALORES DE CADASTRO
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  })

  useEffect(() => {
    if (isAuth()) return history.push("profile") // SE ESTIVER AUTENTICADO, REDIRECIONA PARA A PÁGINA DE INSERIR NOTAS
  }, [history])

  function changeLogin(e: ChangeEvent<HTMLInputElement>) { // MUDANÇA DE ESTADOS DOS INPUTS DE LOGIN
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  function changeRegister(e: ChangeEvent<HTMLInputElement>) { // MUDANÇA DE ESTADO DOS INPUTS DE CADASTRO
    setRegister({ ...register, [e.target.name]: e.target.value })
  }

  async function handleActive(e: FormEvent) { // REATIVAR CONTA
    e.preventDefault() // PREVENIR COMPORTAMENTO PADRÃO

    // CASO O E-MAIL NÃO SEJA PREENCHIDO
    if (!email) return notification('danger', 'error', 'Preencha todos os campos!!')

    setLoad(true)
    try {
      const response = await api.post('/auth/reactive', { email: email.trim() }) // ENVIAR OS DADOS

      setLoad(false)
      notification('success', 'success', response.data.message) // MENSAGEM DE SUCESSO

      return setTimeout(() => window.location.reload(), 1500) // RECARREGAR A PÁGINA
    } catch (error) {
      setLoad(false)
      notification('danger', 'error', error.response.data.message) // MENSAGEM DE ERRO
    }
  }

  async function handleLogin(e: FormEvent) { // EFETUAR LOGIN
    e.preventDefault() // PREVENIR COMPORTAMENTO PADRÃO DO FORM
    const { email, password } = login

    // CASO HAJA ALGUM CAMPO VAZIO
    if (Object.values(login).some(item => !item.trim())) return notification('danger', 'error', 'Preencha todos os campos!!')

    setLoad(true)
    try {
      const response = await api.post('/auth/login', {
        email: email.trim(),
        password: password.trim(),
      }) // ENVIAR OS DADOS DE LOGIN

      setLoad(false)
      setToken(response.data.token) // SALVAR O TOKEN NO LOCAL STORAGE

      return history.push('profile') // REDIRECIONAR PARA A PÁGINA DE INSERIR NOTAS
    } catch (error) {
      setLoad(false)
      notification('danger', 'error', error.response.data.message)
    }
  }

  async function handleRegister(e: FormEvent) { // EFETUAR CADASTRO
    e.preventDefault() // PREVENIR COMPORTAMENTO PADRÃO DO FORM
    const { name, email, password, confirmPass } = register

    // CASO HAJA ALGUM CAMPO VAZIO
    if (Object.values(register).some(item => !item.trim())) return notification('danger', 'error', 'Preencha todos os campos!!')

    // SE OS CAMPOS DE SENHA NÃO FOREM IGUAIS
    if (password !== confirmPass) return notification('danger', 'error', 'As senhas não correspondem!!')

    setLoad(true)
    try {
      const response = await api.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        confirmPass: confirmPass.trim(),
      }) // ENVIAR DADOS DE CADASTRO

      setLoad(false)
      notification('success', 'success', response.data.message) // MENSAGEM DE SUCESSO

      return setTimeout(() => window.location.reload(), 1500) // RECARREGAR A PÁGINA
    } catch (error) {
      setLoad(false)
      notification('danger', 'error', error.response.data.message)
    }
  }

  return (
    <>
      <Loader loading={load} />
      <main className={`form-login ${!active ? "" : "d-none"}`}>
        <div className={`my-form ${panel ? "right-panel-active" : ""}`}>
          <div className="form-container sign-in">
            <form className="col-12" onSubmit={handleLogin} autoComplete="off">
              <h1>Login</h1>
              <InputBlock width="w-75" label="E-mail" id="LoginEmail" type="email" name="email"
                value={login.email} onChange={changeLogin}
              />
              <InputBlock width="w-75" label="Senha" id="LoginSenha" pass name="password"
                value={login.password} onChange={changeLogin}
              />
              <div className="d-flex justify-content-center mb-2">
                <Button background="blue" label="Entrar" className="radius-20" />
              </div>
              <span className="link" onClick={() => setActive(true)}>Reativar conta</span>
            </form>
          </div>
          <div className="form-container sign-up">
            <form className="col-12" onSubmit={handleRegister} autoComplete="off">
              <h1>Criar conta</h1>
              <InputBlock width="w-75" label="Nome Completo" id="CadNome" name="name"
                value={register.name} onChange={changeRegister}
              />
              <InputBlock width="w-75" label="E-mail" id="CadEmail" type="email" name="email"
                value={register.email} onChange={changeRegister}
              />
              <InputBlock width="w-75" label="Senha" id="CadSenha" pass name="password"
                value={register.password} onChange={changeRegister}
              />
              <InputBlock width="w-75" label="Confirmar Senha" id="CadConfirm" pass name="confirmPass"
                value={register.confirmPass} onChange={changeRegister}
              />
              <div className="d-flex justify-content-center mb-2">
                <Button background="blue" label="Cadastrar" className="radius-20" />
              </div>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Olá amigo!</h1>
                <p>Para iniciar sua jornada, insira seus dados pessoas</p>
                <p className="text-uppercase">ou</p>
                <Button background="blue" label="Faça Login" className="radius-20 ghost"
                  onClick={() => setPanel(false)}
                />
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Bem-vindo de volta!</h1>
                <p>Para continuar conectado, faça o login com suas credenciais</p>
                <p className="text-uppercase">ou</p>
                <div>
                  <Button background="blue" label="Cadastra-se" className="radius-20 ghost"
                    onClick={() => setPanel(true)}
                  />
                  <Button background="blue" label="Reativar conta" className="radius-20 ghost"
                    onClick={() => setActive(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <main className={`form-active ${active ? "" : "d-none"}`}>
        <div className="form">
          <form className="col-12" autoComplete="off" onSubmit={handleActive}>
            <h1>Reativar conta</h1>
            <div className="mb-3 position-relative">
              <InputBlock label="E-mail" type="email" id="ActiveEmail" name="email"
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-around mb-2">
              <Button background="blue" label="Reativar" className="radius-20" type="submit" />
              <Button background="red" label="Cancelar" className="radius-20" type="reset"
                onClick={() => { setActive(false); setEmail("") }}
              />
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

export default Login