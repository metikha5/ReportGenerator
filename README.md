# report-generator

Desktop application to generate GPC graphical report generator.
This is the first steps of the project, the application allow you to configure plots to generate. The final aim of this app is to be able to generate rich PDF (or other format) reports from A to Z.

## Getting Started

This app is built with [electron](https://electron.atom.io/) and [vue.js](https://vuejs.org/)
The current version use some python (2.7) [scripts](https://bitbucket.org/rtc4water/toolkit) to gather the data. 

### Developement

We assume that [python2.7](https://www.python.org/download/releases/2.7/) and [node](https://nodejs.org/en/download/) are installed on your computer

#### Setup the python environment:

``` bash
# clone the toolkit project
git clone git@bitbucket.org:rtc4water/toolkit.git

# go in the toolkit project and install the requirements
pip install -r requirements.txt

# keep those file aside, we will need the reports/report_generator.py script
```

#### Setup the javascript environment:

``` bash
# clone the repository and install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```
