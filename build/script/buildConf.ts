/**
 * Generate additional configuration files when used for packaging. The file can be configured with some global variables, so that it can be changed directly externally without repackaging
 */
// import { GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from '../constant'
import fs, { writeFileSync } from 'fs-extra'
import colors from 'picocolors'

import { getConfigFileName, getEnvConfig, getRootPath } from '../utils'

import pkg from '../../package.json'

interface CreateConfigParams {
  configName: string
  config: any
  configFileName?: string
}

function createConfig(params: CreateConfigParams) {
  const { configName, config, configFileName } = params
  try {
    const { VITE_APP_OUTPUT_DIR } = config as ViteEnv
    const windowConf = `window.${configName}`
    // Ensure that the variable will not be modified
    const configStr = `${windowConf}=${JSON.stringify(config)};
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });
    `.replace(/\s/g, '')
    fs.mkdirp(getRootPath(VITE_APP_OUTPUT_DIR))
    writeFileSync(getRootPath(`${VITE_APP_OUTPUT_DIR}/${configFileName}`), configStr)

    console.log(colors.cyan(`✨ [${pkg.name}]`) + ' - configuration file is build successfully:')
    console.log(colors.gray(VITE_APP_OUTPUT_DIR + '/' + colors.green(configFileName)) + '\n')
  } catch (error) {
    console.log(colors.red('configuration file configuration file failed to package:\n' + error))
  }
}

export function runBuildConfig() {
  const config = getEnvConfig() as ViteEnv
  const configFileName = getConfigFileName(config)
  createConfig({
    config,
    configName: configFileName,
    configFileName: config.VITE_GLOB_CONFIG_FILE_NAME
  })
}
