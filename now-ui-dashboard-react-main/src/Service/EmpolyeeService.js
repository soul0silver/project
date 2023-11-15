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
