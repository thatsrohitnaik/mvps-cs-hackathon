import axios from 'axios';

export async function get(url) {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    return null;
  }
}


export async function post(url, data) {
  try {
    const response = await axios.post(url, data);
    debugger;
    return response;
  } catch (error) {
    return null;
  }
}

