[![GitHub release](https://img.shields.io/github/release/crazy-max/ghaction-github-status.svg?style=flat-square)](https://github.com/crazy-max/ghaction-github-status/releases/latest)
[![GitHub marketplace](https://img.shields.io/badge/marketplace-github--status-blue?logo=github&style=flat-square)](https://github.com/marketplace/actions/github-status)
[![Test workflow](https://img.shields.io/github/workflow/status/crazy-max/ghaction-github-status/test?label=test&logo=github&style=flat-square)](https://github.com/crazy-max/ghaction-github-status/actions?workflow=test)
[![Codecov](https://img.shields.io/codecov/c/github/crazy-max/ghaction-github-status?logo=codecov&style=flat-square)](https://codecov.io/gh/crazy-max/ghaction-github-status)
[![Become a sponsor](https://img.shields.io/badge/sponsor-crazy--max-181717.svg?logo=github&style=flat-square)](https://github.com/sponsors/crazy-max)
[![Paypal Donate](https://img.shields.io/badge/donate-paypal-00457c.svg?logo=paypal&style=flat-square)](https://www.paypal.me/crazyws)

## About

A GitHub Action to check [GitHub Status](https://www.githubstatus.com/) in your workflow.

If you are interested, [check out](https://git.io/Je09Y) my other :octocat: GitHub Actions!

![GitHub Status Action - Failed](.github/ghaction-github-status.png) ![GitHub Status Action - OK](.github/ghaction-github-status2.png)

___

* [Usage](#usage)
  * [Basic workflow](#basic-workflow)
* [Customizing](#customizing)
  * [inputs](#inputs)
* [How can I help?](#how-can-i-help)
* [License](#license)

## Usage

### Basic workflow

```yaml
name: build

on: push

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      -
        name: Check GitHub Status
        uses: crazy-max/ghaction-github-status@v1
      -
        name: Checkout
        uses: actions/checkout@v2
```

## Customizing

### inputs

Following inputs can be used as `step.with` keys

| Name                      | Type    | Description                                                                      |
|---------------------------|---------|----------------------------------------------------------------------------------|
| `overall_threshold`**¹**  | String  | Defines threshold for overall status (also called rollup) of GitHub to fail the job |
| `git_threshold`**²**      | String  | Defines threshold for Git Operations to fail the job                     |
| `api_threshold`**²**      | String  | Defines threshold for API Requests to fail the job                       |
| `webhooks_threshold`**²** | String  | Defines threshold for Webhooks to fail the job                           |
| `ipp_threshold`**²**      | String  | Defines threshold for Issues, PRs, Projects to fail the job              |
| `actions_threshold`**²**  | String  | Defines threshold for GitHub Actions to fail the job                     |
| `packages_threshold`**²** | String  | Defines threshold for GitHub Packages to fail the job                    |
| `pages_threshold`**²**    | String  | Defines threshold for GitHub Pages to fail the job                       |

> * **¹** Accepted values are `minor`, `major` or `critical`.
> * **²** Accepted values are `operational`, `degraded_performance`, `partial_outage` or `major_outage`.

## How can I help?

All kinds of contributions are welcome :raised_hands:! The most basic way to show your support is to star :star2: the project, or to raise issues :speech_balloon: You can also support this project by [**becoming a sponsor on GitHub**](https://github.com/sponsors/crazy-max) :clap: or by making a [Paypal donation](https://www.paypal.me/crazyws) to ensure this journey continues indefinitely! :rocket:

Thanks again for your support, it is much appreciated! :pray:

## License

MIT. See `LICENSE` for more details.
