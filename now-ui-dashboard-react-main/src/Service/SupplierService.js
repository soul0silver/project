import { instance } from 'config/AxiosConfig'

export const  getListSupplier=async ()=> {
  let res
  try {
    res = await instance.get('/supplier/list')
    res = res.data
  } catch (err) {
    res = []
  }
  return res
}
export const  saveSupplier=async (body)=> {
  let res
  try {
    res = await instance.post('/supplier/save',body)
    res = res.data
  } catch (err) {
    res = ""
  }
  return res
}