import { promises as fs } from 'fs'
import handlebars from 'handlebars'
import inquirer from 'inquirer'
import * as path from 'path'
import { fileURLToPath } from 'url'

// Helper to convert a string to CamelCase (e.g., "product" → "Product")
const toCamelCase = (str: string): string => {
  if (!str) return ''
  return str[0].toUpperCase() + str.slice(1)
}

;(async () => {
  // Ask CLI questions
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'routeName',
      message: 'What is the name of the API route?',
    },
    {
      type: 'confirm',
      name: 'singleItem',
      message: 'Are we going to have single item queries to the API (get item with an ID)?',
    },
  ])

  const routeName: string = answers.routeName
  const formattedRouteName = toCamelCase(routeName)
  const formattedRouteNameSingle = formattedRouteName.endsWith('ies')
    ? formattedRouteName.replace('ies', 'y')
    : formattedRouteName.slice(0, -1)
  const folderName = routeName.toLowerCase()
  const folderPath = path.join('src', 'app', 'api', folderName)

  // Create the target folder structure
  await fs.mkdir(folderPath, { recursive: true })

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  // Directory containing our Handlebars templates
  const templatesDir = path.join(__dirname, 'templates')

  // Helper function to read and compile a template file
  const compileTemplate = async (templateFileName: string) => {
    const templatePath = path.join(templatesDir, templateFileName)
    const templateContent = await fs.readFile(templatePath, 'utf8')
    return handlebars.compile(templateContent)
  }

  // Load each template
  const routeTemplate = await compileTemplate('route.hbs')
  const createTemplate = await compileTemplate('create.hbs')
  const readTemplate = answers.singleItem ? await compileTemplate('read_multi.hbs') : await compileTemplate('read.hbs')
  const readTemplateFile = readTemplate({ formattedRouteName, formattedRouteNameSingle })
  const updateTemplate = await compileTemplate('update.hbs')
  const deleteTemplate = await compileTemplate('delete.hbs')

  // Write out files using the compiled templates
  await fs.writeFile(path.join(folderPath, 'route.ts'), routeTemplate({ formattedRouteName }))
  await fs.writeFile(path.join(folderPath, `create${formattedRouteName}.ts`), createTemplate({ formattedRouteName }))
  await fs.writeFile(path.join(folderPath, `read${formattedRouteName}.ts`), readTemplateFile)
  await fs.writeFile(path.join(folderPath, `update${formattedRouteName}.ts`), updateTemplate({ formattedRouteName }))
  await fs.writeFile(path.join(folderPath, `delete${formattedRouteName}.ts`), deleteTemplate({ formattedRouteName }))

  console.log(`Files created successfully under ${folderPath} folder. 🎉`)
  console.log('Happy coding! 🚀')
})()
