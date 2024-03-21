
import toast from 'react-hot-toast';
import axios from 'axios';
const BASE_URL = `${process.env.REACT_APP_API_URL}`;
function encodeQueryString(obj) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
}
const ApiService = {
  request(url, method, params, header) {
    
    const token = JSON.parse(localStorage.getItem('user-info'))?.accessToken; // replace with your token
    let apiUrl = `${url}`;
    if (method.toLowerCase() === 'get') {
      if (params) {
        apiUrl = `${url}?${encodeQueryString(params)}`;
      } else {
        apiUrl = `${url}`;
      }
    }
    let reqOptions = {
      method: method,
      url: `${BASE_URL}${apiUrl}`,
      data: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios(reqOptions)
      .then((response) => {
        debugger;
        return response;
      })
      .catch(function (err) {
        if (err?.response?.status === 401){
          window.location.href = "http://localhost:3000/login"
        }
          toast.error(err?.response?.data?.message || 'An error occurred');
      });
  },
};
export default ApiService;
