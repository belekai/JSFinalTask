var pool = require("../helpers/database");


async function getClients(request, response){
    try {
        sqlQuery = 'Select * from clients'
        var clients = await pool.query(sqlQuery)
        if (clients){
            return response.status(200).send(clients)
        }
    } catch (error) {
        console.log(error);
        return response.status(400).send('Something went wrong.')
    }
}

async function getProjects(request, response){
    try {
        sqlQuery = 'Select * from projects'
        var projects = await pool.query(sqlQuery)
        if (projects){
            return response.status(200).send(projects)
        }
    } catch (error) {
        console.log(error);
        return response.status(400).send('Something went wrong.')
    }
}

async function getClientProjects(request, response){
    let clientId = request.params.id
    try {
        sqlQuery = 'Select * from projects where client_id=?'
        var projects = await pool.query(sqlQuery, clientId)
        if (projects){
            return response.status(200).send(projects)
        }
    } catch (error) {
        console.log(error);
        return response.status(400).send('Something went wrong.')
    }
}

async function getServices(request, response){
    try {
        sqlQuery = 'Select * from services'
        var services = await pool.query(sqlQuery)
        if (services){
            return response.status(200).send(services)
        }
    } catch (error) {
        console.log(error);
        return response.status(400).send('Something went wrong.')
    }
}

async function getWorkforceTypes(request, response){
    try {
        sqlQuery = 'Select * from workforces'
        var workforces = await pool.query(sqlQuery)
        if (workforces){
            return response.status(200).send(workforces)
        }
    } catch (error) {
        console.log(error);
        return response.status(400).send('Something went wrong.')
    }
}

async function addOperation(request, response){
    try {
        data = request.body
        sqlQuery = 'INSERT INTO operations(project_id, workforce_id, comment, service_id) VALUES (?, ?, ?, ?)'
        await pool.query(sqlQuery, [data.projectId, data.workforceId, data.description, data.serviceId])
        return response.status(200).send('Success')
    } catch (error) {
        console.log(error);
        return response.status(400).send('Something went wrong.')
    }
}

async function getProjectOperations(request, response){
    try {
        let id = request.params.id
        sqlQuery = 'SELECT operations.id, services.service_name, workforces.workforce_type, round(avg(measurements.cycle_time), 2) as cycle_time, round(avg(measurements.cycle_time)*workforce_rates.rate, 2) as operation_cost, operations.comment from operations LEFT JOIN services ON operations.service_id=services.id LEFT JOIN workforces ON operations.workforce_id=workforces.id LEFT JOIN workforce_rates ON workforces.id=workforce_rates.workforce_id LEFT JOIN measurements ON operations.id=measurements.operation_id WHERE project_id=? AND active=1 GROUP BY operations.id'
        var operations = await pool.query(sqlQuery, id)
        operations = operations.map((operation, index) => ({execution_order:index+1, ...operation}))
        return response.status(200).send(operations)
    } catch (error) {
        console.log(error);
        return response.status(400).send('Something went wrong.')
    }
}

async function getBatches(request, response){
    try {
        let id = request.params.id
        sqlQuery = 'SELECT * from batches WHERE project_id=?'
        var batches = await pool.query(sqlQuery, id)
        return response.status(200).send(batches)
    } catch (error) {
        console.log(error);
        return response.status(400).send('Something went wrong.')
    }
}

async function addMeasurement(request, response){
    try {
        data = request.body
        sqlQuery = 'INSERT INTO measurements(operation_id, batch_id, cycle_time, sample_size, comment) VALUES (?, ?, ?, ?, ?)'
        await pool.query(sqlQuery, [data.operationId, data.batchId, data.cycleTime, data.sampleSize, data.comment])
        return response.status(200).send('Success')
    } catch (error) {
        console.log(error);
        return response.status(400).send('Something went wrong.')
    }
}

async function disableOperation(request, response){
    try {
        let id = request.params.id
        sqlQuery = 'UPDATE operations SET active=0 WHERE id=?'
        await pool.query(sqlQuery, id)
        return response.status(200).send('Success')
    } catch (error) {
        console.log(error);
        return response.status(400).send('Something went wrong.')
    }
}

async function getClient(request, response){
    let id = request.params.id
    try {
        sqlQuery = 'Select client_name from clients WHERE id=? LIMIT 1'
        var client_name = await pool.query(sqlQuery, id)
        if (client_name){
            return response.status(200).send(client_name[0])
        }
    } catch (error) {
        console.log(error);
        return response.status(400).send('Something went wrong.')
    }
}

module.exports = {
    getClients,
    getProjects,
    getClientProjects,
    getServices,
    getWorkforceTypes,
    addOperation,
    getProjectOperations,
    getBatches,
    addMeasurement,
    disableOperation,
    getClient
}