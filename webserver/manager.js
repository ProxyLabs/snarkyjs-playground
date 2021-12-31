import {
  projectExists,
  insertProject,
  findbyId,
} from './libs/database_controller.js'

export { createProject, getProject }

async function createProject(code, name) {
  let projectId = await generateIdentifier()

  let project = {
    project_code: code,
    project_id: projectId,
    project_name: name,
  }

  let success = await insertProject(project)
  if (!success) return null
  else return projectId
}

async function getProject(projectID) {
  let project = await findbyId(projectID)
  if (project == null) return null
  else
    return {
      project_code: project.project_code,
      project_id: project.project_id,
      project_name: project.project_name,
    }
}

async function generateIdentifier() {
  let newProjectID = Buffer.from(Math.random().toString())
    .toString('base64')
    .substr(10, 5)

  let exists = await projectExists(newProjectID)
  if (exists) return generateIdentifier()
  else return newProjectID
}

async function test() {
  // let id = await generateIdentifier()
  // console.log(id)
  await createProject('some_code();', 'some fancy project')
}

test()
