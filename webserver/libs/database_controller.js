import executeQuery from './database_manager.js'

export { projectExists, insertProject, findbyId }

async function projectExists(id) {
  try {
    const res = await executeQuery(
      'SELECT COUNT(*) FROM projects WHERE project_id = $1',
      [id]
    )
    return res[0].count > 0 ? true : false
  } catch (error) {
    return false
  }
}

async function insertProject(project) {
  try {
    const res = await executeQuery(
      `INSERT INTO projects (project_id, project_name, project_code)
      VALUES ($1, $2, $3) returning project_id;`,
      [project.project_id, project.code, project.project_name]
    )
    return res[0].project_id ? true : false
  } catch (error) {
    return false
  }
}

async function findbyId(id) {
  try {
    const res = await executeQuery(
      'SELECT * FROM projects WHERE project_id = $1',
      [id]
    )
    return res[0].count == 0 ? null : res[0]
  } catch (error) {
    return null
  }
}
