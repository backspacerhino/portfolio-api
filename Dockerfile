# Ger current Node Alpine Linux image.
FROM node:alpine
# Expose port 8080 for node.
EXPOSE 8080
# Set working directory.
WORKDIR /home/src
# Copy project content.
COPY package.json .
# Set global env values
ENV NODE_ENV=development
# Run NPM install.
RUN yarn install
# Copy source code.
COPY . .

# Run the app.
CMD ["yarn", "dev"]