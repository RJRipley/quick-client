Quick Client
===================================================

## What does this app do?
![QuickStart](/aws/architecture.png?raw=true)

## Tech Stack
### Required Tools
* [npm](https://www.npmjs.com/)
* [aws cli](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
* [angular-cli](https://github.com/angular/angular-cli)

### Frameworks
* [AWS JavaScript SDK](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/browser-intro.html)
* [Angular 4](https://angular.io/docs/ts/latest/quickstart.html)
* [TypeScript](https://www.typescriptlang.org/docs/tutorial.html)

## AWS Setup
### Install the required tools
* Create an AWS account
* Install [npm](https://www.npmjs.com/)
* [Install or update your aws cli](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) 
* [Install angular-cli](https://github.com/angular/angular-cli)


### Getting the code and running it locally
_This uses the pre-configured AWS resources hosted by AWS_

```
# Clone it from github
git clone git@github.com:RJRipley/quick-client.git
```
```
# Install the NPM packages
cd quick-client
npm install
```
```
# Run the app in dev mode
npm start
```

### Creating AWS Resources

** createResources.sh requires your [aws cli to be configured](http://docs.aws.amazon.com/cli/latest/userguide/controlling-output.html) for JSON output.  **

```
# Install the AWS resources and deploy your application to S3
cd aws
./createResources.sh
```

Running the above command will create the necessary AWS resources and build & deploy your code to AWS.  

*Caution:* You might incur AWS charges after running the setup script

## After initially running the ```createResources.sh``` script, use the below commands to rebuild and redeploy

### _S3:_ Update, Build and Deploy
```
# Build the project and sync the output with the S3 bucket
npm run build; cd dist; aws s3 sync . s3://[BUCKET_NAME]/
```
```
# Test your deployed application
curl –I http://[BUCKET_NAME].s3-website-[REGION].amazonaws.com/
```

## TODO
** Convert AWS Shell Scripts into a CloudFormation
