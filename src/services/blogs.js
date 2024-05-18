import axios from 'axios'
const baseUrl = '/api/blogs' // https://fullstackopen.com/en/part3/deploying_app_to_internet "serving static files" -section

const getAll = () => {
    return axios.get(baseUrl).
    then(response => response.data) // returns a promise with JUST the data
  }

const create = newObject => {
  return axios.post(baseUrl, newObject)
  .then(response => response.data) // returns a promise with JUST the data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data // returns a promise with JUST the data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`) // delete ONLY needs the url c:
  console.log("blogService remove: response after axios.DELETE:", response)
  return response
}

export default { getAll, create, update, remove } // object!