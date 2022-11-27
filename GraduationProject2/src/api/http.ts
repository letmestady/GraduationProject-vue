import axios from 'axios'
import {ElMessage} from "element-plus";

// import message from 'element-plus/es/components/message';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.headers.post['Authorization'] = decodeURIComponent(cookie) ;
axios.defaults.timeout = 60000;

axios.interceptors.request.use(
    config => {
        // console.log(config)
        return config;
    },
    error => {

        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        // console.log(response.data);
        if (response.data.code) {
            if (response.data.code !== 200) {
                // message.warning(response.data.messages);
                console.log('response.data.messages')
                // if (!cookie) location.href = location.origin;
            }
        }
        return response;
    },
    error => {
        console.error(error)
        // message.warning('访问出错，请稍后重试');
        console.log('访问出错，请稍后重试')
        return Promise.reject(error)
    }
)

export function npost(url: string, params: object = {}) {
  return new Promise((resolve, reject) => {
      axios.post(url, params)
          .then(res => {
              resolve(res.data);
          })
          .catch(err => {
              reject(err.data)
          })
  });
}