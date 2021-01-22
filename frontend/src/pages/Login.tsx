import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Button, InputBlock, Loader } from "../components";
import { isAuth, setToken } from "../services/auth";
import { error, success } from "../utils";
import api from "../services/api";

function Login() {
  const history = useHistory()

  const [load, setLoad] = useState(false) // LOADER
  const [panel, setPanel] = useState(false) // MUDANÇA DO PAINEL DE LOGIN PARA CADASTRE-SE E VICE-VERSA
  const [login, setLogin] = useState({ // VALORES DE LOGIN
    email: "",
    password: "",
  })
  const [register, setRegister] = useState({ // VALORES DE CADASTRO
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  })

  useEffect(() => {
    if (isAuth()) return history.push("note") // SE ESTIVER AUTENTICADO, REDIRECIONA PARA A PÁGINA DE INSERIR NOTAS
  }, [history])

  function changeLogin(e: ChangeEvent<HTMLInputElement>) { // MUDANÇA DE ESTADOS DOS INPUTS DE LOGIN
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  function changeRegister(e: ChangeEvent<HTMLInputElement>) { // MUDANÇA DE ESTADO DOS INPUTS DE CADASTRO
    setRegister({ ...register, [e.target.name]: e.target.value })
  }

  async function handleLogin(e: FormEvent) { // EFETUAR LOGIN
    e.preventDefault() // PREVENIR COMPORTAMENTO PADRÃO DO FORM

    // CASO HAJA ALGUM CAMPO VAZIO
    if (Object.values(login).some(item => !item.trim())) return error("Preencha todos os campos!!")

    setLoad(true)
    try {
      const response = await api.post('/auth/login', { ...login }) // ENVIAR OS DADOS DE LOGIN

      setLoad(false)
      setToken(response.data.token) // SALVAR O TOKEN NO LOCAL STORAGE

      return history.push('/note') // REDIRECIONAR PARA A PÁGINA DE INSERIR NOTAS
    } catch (err) {
      console.log(err)
      setLoad(false)
    }
  }

  async function handleRegister(e: FormEvent) { // EFETUAR CADASTRO
    e.preventDefault() // PREVENIR COMPORTAMENTO PADRÃO DO FORM
    const { password, confirmPass } = register

    // CASO HAJA ALGUM CAMPO VAZIO
    if (Object.values(register).some(item => !item.trim())) return error("Preencha todos os campos!!")

    // SE OS CAMPOS DE SENHA NÃO FOREM IGUAIS
    if (password !== confirmPass) return error("As senhas não correspondem!!")

    setLoad(true)
    try {
      const response = await api.post("/auth/register", { ...register }) // ENVIAR DADOS DE CADASTRO

      setLoad(false)
      success(response.data.message) // MENSAGEM DE SUCESSO

      return window.location.reload() // RECARREGAR A PÁGINA
    } catch (err) {
      setLoad(false)
    }
  }

  return (
    <>
      <Loader loading={load} />
      <main className="formLogin">
        <div className={`my-form ${panel ? "right-panel-active" : null}`}>
          <div className="form-container sign-in">
            <form className="col-12" onSubmit={handleLogin} autoComplete="off">
              <h1>Login</h1>
              <InputBlock label="E-mail" id="LoginEmail" type="email" name="email"
                value={login.email} onChange={changeLogin}
              />
              <InputBlock label="Senha" id="LoginSenha" pass name="password"
                value={login.password} onChange={changeLogin}
              />
              <div className="d-flex justify-content-center mb-2">
                <Button background="blue" label="Entrar" className="radius-20" />
              </div>
            </form>
          </div>
          <div className="form-container sign-up">
            <form className="col-12" onSubmit={handleRegister} autoComplete="off">
              <h1>Criar conta</h1>
              <InputBlock label="Nome Completo" id="CadNome" name="name"
                value={register.name} onChange={changeRegister}
              />
              <InputBlock label="E-mail" id="CadEmail" type="email" name="email"
                value={register.email} onChange={changeRegister}
              />
              <InputBlock label="Senha" id="CadSenha" pass name="password"
                value={register.password} onChange={changeRegister}
              />
              <InputBlock label="Confirmar Senha" id="CadConfirm" pass name="confirmPass"
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
                <Button background="blue" label="Cadastra-se" className="radius-20 ghost"
                  onClick={() => setPanel(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Login