export const isAuth = () => localStorage.getItem("TOKEN") !== null
export const logout = () => {
  localStorage.removeItem("TOKEN")
  window.location.href = "/"
}
export const setToken = (token: string) => localStorage.setItem("TOKEN", token)