import { instance } from "config/AxiosConfig"

export async function findEmpByStore (store) {
  let res
  try {
    res = await instance.get('/employee/?store='+store)
    return res.data
  } catch (err) {
    return []
  }
}
export async function findEmpByName (username) {
  let res
  try {
    res = await instance.get('/employee/find?username='+username)
    return res.data
  } catch (err) {
    return []
  }
}