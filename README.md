## CommerceBlock Token Sale Platform ##

> I slept and dreamt that life was joy. I awoke and saw that life was service. I acted and behold, service was joy.
>
> -- Tagore

### Setup AWS account ###
Setup AWS profile (Ask your administrator for AWS credentials)
```bash
aws configure --profile cb
AWS Access Key ID [None]: ********
AWS Secret Access Key [None]: *************
Default region name [None]: us-east-1
Default output format [None]:
```

### Setup development box (Mac users) ###

Run the commands below if on Mac OS (must install brew)

```bash
# install NVM, more info https://github.com/creationix/nvm#installation
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

# install node v6.11.0 LTS -- https://nodejs.org/en/
nvm install v6.11

# install yarn -- https://yarnpkg.com
brew install yarn --ignore-dependencies

# install serverless framework -- https://serverless.com/
npm install serverless -g

# install jq - JSON processor -- https://stedolan.github.io/jq/
brew install jq

# install awscli -- https://aws.amazon.com/cli/
brew install awscli

# install terraform -- https://www.terraform.io/
brew install terraform
```

### Run frontend in development box ###

```bash
npm run dev:frontend
```

### Run backend in development box ###

```bash
npm run dev:backend
```
