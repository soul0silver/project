import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8080'
})
instance.interceptors.request.use(
          function (config) {
                    let token = JSON.parse(localStorage.getItem('token')).token
                    config.headers = { authorization: `Bearer ${token}` }
                    return config
          },
          function (err) {
                    return Promise.reject(err)
          }
);
export{instance}
