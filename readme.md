# Web app automation testing with WebdriverIO

## Run `npm install`
   
## How to run tests

Using `npm run wdio` to run tests.

## Define and run specific test suites

#### Add test suites to `wdio.conf.js` file
        suites: {
            login: [
            './test/specs/example.e2e.js'
            ],
        },

#### Run `npm run wdio -- --suite <suitename>` (can add multiple suites by adding more `--suite <suitename>`)
## How to generate report with Allure

Run `npm run allure-report` to see report on browser


## Getting Started from scratch:

1. Run `npm init wdio . -- --yes` to init project.

## How to config dotenv:

1. Run `npm install dotenv --save` to install dotenv
2. Create file `.env` and add the environment you want
3. Modify `wdio.conf.js` file: 
    #### 3.1. add

        import * as dotenv from 'dotenv' 
        dotenv.config()

    #### 3.2. set `process.env.BASE_URL` for `baseUrl`

## Config eslint to apply coding styles

1. Run `npm install eslint --save-dev` to install eslint
2. Create config file `.eslintrc.cjs`
3. Modify `package.json` file:
    #### Add these below lines to scripts:

        "jslint": "eslint . --ext .js",
        "jsfmt": "eslint . --ext .js --fix",

4. Run `npm run jslint` or `npm run jsfmt` to use eslint

## How to generate report with Allure

1. Run `npm install @wdio/allure-reporter --save-dev` to install allure-report
2. Modify `wdio.conf.js` file:
    #### Add these lines to wdio.con.js file, in reporters part:

        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }]

3. Modify `package.json` file:
    #### Add this line to package.json file, in scripts part:

        "allure-report": "allure generate --clean allure-results && allure open"

4. Run `npm run allure-report` to see the report in browser.

## How to Maximize browser window opening:
#### Add this line to open() method in page.js: `browser.maximizeWindow()` in front of `browser.url()`

## How to run test on multiple browsers:
1. Install browsers and browser services you want
    #### - Ex: You want to run tests on firefox and chrome.

    #### - Firstly, we need to install `chromedriver`, `wdio-chromedriver-service`, and `geckodriver`, `wdio-geckodriver-service`

    ##### + `npm install --save-dev chromedriver`

    ##### + `npm install --save-dev wdio-chromedriver-service`

    ##### + `npm install --save-dev geckodriver`

    ##### + `npm install --save-dev wdio-geckodriver-service`

2. Modify `wdio.conf.js` file:
    ##### 2.1. Set `services: ['chromedriver', 'geckodriver'],`

    ##### 2.2. Set 
        capabilities: [
            {
    
                // maxInstances can get overwritten per capability. So if you have an in-house Selenium
                // grid with only 5 firefox instances available you can make sure that not more than
                // 5 instances get started at a time.
                maxInstances: 5,
                //
                browserName: 'chrome',
                acceptInsecureCerts: true
                // If outputDir is provided WebdriverIO can capture driver session logs
                // it is possible to configure which logTypes to include/exclude.
                // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
                // excludeDriverLogs: ['bugreport', 'server'],
            },
            {
                maxInstances: 5,
                //
                browserName: 'firefox',
                acceptInsecureCerts: true
            }
        ],

