import axiosClient from "../axiosClient";

//get project services
function getProjectOperations(project, setOperations, setCycle, setCost, setOpCount, setMissingOpCount, setBottleNeck) {
  if (project) {
    console.log('axios', project);
    axiosClient({
      method: 'get',
      url: `operations/project/${project.id}`,
    })
      .then((response) => {
        setOperations(response.data);
        // setCycle(response.data.totalManufacturingCycleTime)
        // setCost(response.data.totalManufacturingCost)
        // setOpCount(response.data.countOfOperations)
        // setMissingOpCount(response.data.notMeasuredOperations)
        // setBottleNeck(response.data.bottleNeck)
      })
      .catch((error) => console.log(error));
  }
}

// get client projects
function getProjects(setProjects, id) {
  axiosClient({
    method: "get",
    url: `projects/client/${id}`,
  })
  .then((response) => {
    setProjects(response.data);
  });
}

//get workforce types
function getWorkforceTypes(setWorkforceTypes) {
  axiosClient({
    method: 'get',
    url: '/workforces',
  })
    .then((response) => {
      setWorkforceTypes(response.data);
    })
    .catch((error) => console.log(error));
}

//disable operation

// function disableOperation(id, getProjectOperations) {
//   axiosClient({
//     method: 'post',
//     url: `disable/${id}`,
//   })
//     .then((response) => {
//       if (response.status === 200) getProjectOperations();
//     })
//     .catch((error) => console.log(error));
// }

// async function swapOperations(fid, sid, getProjectOperations){
//   axiosClient({
//     method: 'post',
//     url: 'operations/swap',
//     data: {
//       firstOperationId: fid,
//       secondOperationId: sid
//     }
//   })
//   .then((response) => {
//     if (response.status === 200) getProjectOperations();
//   })
//   .catch ( error => console.log(error))
// }

async function getClient(clientId, setClient){
  axiosClient({
    method: 'get',
    url: `client/${clientId}`,
  })
  .then((response) => {
    setClient(response.data)
  })
  .catch ( error => console.log(error))
}

export {
  getProjectOperations,
  getProjects,
  getWorkforceTypes,
  // disableOperation,
  // swapOperations,
  getClient
}
