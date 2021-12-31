import executeQuery from './database_manager.js'

export { projectExists, insertProject }

async function projectExists(id) {
  const res = await executeQuery(
    'SELECT COUNT(*) FROM projects WHERE project_id = $1',
    [id]
  )
  return res[0].count > 0 ? true : false
}

async function insertProject(project) {
  const res = await executeQuery(
    `INSERT INTO projects (project_id, project_name, project_code)
    VALUES ($1, $2, $3);`,
    [project.project_id, project.code, project.project_name]
  )
  return res[0]
}
