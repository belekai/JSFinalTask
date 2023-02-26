import axiosClient from "../axiosClient";


async function getProjects(setProjects) {
    await axiosClient({
      method: "get",
      url: '/projects'
    })
      .then((response) => {setProjects(response.data)})
      .catch((error) => console.log(error));
  }

  async function getClients(setClients) {
    axiosClient({
      method: "get",
      url: '/clients'
    })
    .then((response) => {setClients(response.data)});
  }

export {
    getClients,
    getProjects
}