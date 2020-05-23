process.env.FORCE_COLOR = '2';

import * as chalk from 'chalk';
import * as core from '@actions/core';
import * as githubstatus from './githubstatus';
import {Component, ComponentsStatusName, ComponentStatus, getComponentStatusName, getOverallStatusName, OverallStatus, OverallStatusName} from './githubstatus';
import {Summary} from './summary';
import * as utilm from './util';

let unhealthy: Array<string> = [];

async function run() {
  try {
    const summary: Summary | null = await githubstatus.summary();
    if (summary == null) {
      core.setFailed(`Unable to contact GitHub Status API at this time.`);
      return;
    }

    const overallMinStatus: OverallStatus | undefined = await getOverallStatus('overall_minstatus');
    const componentsMinStatus = new Map<Component, ComponentStatus | undefined>([
      [Component.Git, await getComponentStatus('git_minstatus')],
      [Component.Api, await getComponentStatus('api_minstatus')],
      [Component.Webhooks, await getComponentStatus('webhooks_minstatus')],
      [Component.IPP, await getComponentStatus('ipp_minstatus')],
      [Component.Actions, await getComponentStatus('actions_minstatus')],
      [Component.Packages, await getComponentStatus('packages_minstatus')],
      [Component.Pages, await getComponentStatus('pages_minstatus')]
    ]);

    // Global
    const overallStatus = OverallStatusName.get(summary.status.indicator) || OverallStatus.Critical;
    if (overallStatus !== undefined && overallMinStatus !== undefined && overallStatus >= overallMinStatus) {
      unhealthy.push(`Overall (${await getOverallStatusName(overallStatus)} >= ${await getOverallStatusName(overallMinStatus)})`);
    }
    switch (summary.status.indicator) {
      case 'minor': {
        core.warning(`GitHub Status: ${summary.status.description}`);
        break;
      }
      case 'major': {
        core.error(`GitHub Status: ${summary.status.description}`);
        break;
      }
      case 'critical': {
        core.error(`GitHub Status: ${summary.status.description}`);
        break;
      }
      default: {
        core.info(`GitHub Status: ${summary.status.description}`);
        break;
      }
    }

    // Components
    if (summary.components != undefined && summary.components?.length > 0) {
      core.info(`\n• ${chalk.bold(`Components status`)}`);
      await utilm.asyncForEach(summary.components, async component => {
        if (component.name.startsWith('Visit ')) {
          return;
        }
        if (!(<any>Object).values(Component).includes(component.name)) {
          core.info(chalk.cyan(`• ${component.name} is not implemented.`));
        }
        const compStatus = ComponentsStatusName.get(component.status);
        if (compStatus === undefined) {
          core.warning(`Cannot resolve status ${component.status} for ${component.name}`);
          return;
        }
        const compMinStatus = componentsMinStatus.get(component.name);
        if (compMinStatus !== undefined && compStatus >= compMinStatus) {
          unhealthy.push(`${component.name} (${await getComponentStatusName(compStatus)} >= ${await getComponentStatusName(compMinStatus)})`);
        }
        let compStatusText;
        switch (component.status) {
          case 'operational': {
            compStatusText = chalk.green('Operational');
            break;
          }
          case 'degraded_performance': {
            compStatusText = chalk.magenta('Degraded performance');
            break;
          }
          case 'partial_outage': {
            compStatusText = chalk.yellow('Partial outage');
            break;
          }
          case 'major_outage': {
            compStatusText = chalk.red('Major outage');
            break;
          }
        }
        core.info(`  • ${compStatusText}${new Array(30 - compStatusText.length).join(' ')} ${component.name}`);
      });

      // Incidents
      if (summary.incidents != undefined && summary.incidents?.length > 0) {
        await utilm.asyncForEach(summary.incidents, async incident => {
          let inccol;
          switch (incident.impact) {
            case 'minor': {
              inccol = chalk.magenta;
              break;
            }
            case 'major': {
              inccol = chalk.yellow;
              break;
            }
            case 'critical': {
              inccol = chalk.red;
              break;
            }
            default: {
              inccol = chalk.white;
              break;
            }
          }
          core.info(`\n• ${inccol.bold(`${incident.name} (${incident.shortlink})`)}`);

          // Incident updates
          await utilm.asyncForEach(incident.incident_updates, async update => {
            const incdate = new Date(update.updated_at).toLocaleDateString('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            });
            core.info(`  • ${chalk.gray(incdate)} - ${update.body}`);
          });
        });

        // Check unhealthy
        if (unhealthy.length > 0) {
          core.info(`\n• ${chalk.bgRed(`Unhealthy`)}`);
          await utilm.asyncForEach(unhealthy, async text => {
            core.info(`  • ${text}`);
          });
          core.setFailed(`GitHub is unhealthy. Following your criteria, the job has been marked as failed.`);
          return;
        }
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function getOverallStatus(input: string): Promise<OverallStatus | undefined> {
  const value = core.getInput(input);
  const status = OverallStatusName.get(value);
  if (value != '' && status === undefined) {
    throw new Error(`Overall status ${value} does not exist`);
  }
  return status;
}

async function getComponentStatus(input: string): Promise<ComponentStatus | undefined> {
  const value = core.getInput(input);
  const status = ComponentsStatusName.get(value);
  if (value != '' && status === undefined) {
    throw new Error(`Component status ${value} does not exist for ${input}`);
  }
  return status;
}

run();
