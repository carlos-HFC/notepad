export const isAuth = () => localStorage.getItem("TOKEN") !== null
export const setToken = (token: string) => localStorage.setItem("TOKEN", token)
export const logout = () => {
  localStorage.removeItem("TOKEN")
  window.location.href = "/"
}