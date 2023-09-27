FROM node:latest

RUN apt update && apt upgrade && apt install -y ssh git zsh curl

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i -g npm@latest

RUN npm i

COPY . .

RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

RUN chsh -s $(which zsh)

CMD [ "npm", "run dev" ]