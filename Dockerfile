FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json .
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

CMD npm start
