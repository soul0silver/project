import { instance } from 'config/AxiosConfig'

export async function getListImport (store, page, sort) {
  let res
  try {
    res = await instance.get(
      'receipt/getAll' + '?store=' + store + '&page=' + page + '&sort=' + sort
    )
    return res.data
  } catch (err) {
    return []
  }
}

export async function searchValue (pname,store) {
  let res
  try {
    res = await instance.get(
      'receipt/search' + '?pname=' + pname+'&store='+store
    )
    return res.data
  } catch (err) {
    return []
  }
}