[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# MongoDb Backend

## Developed By: Troy Grossi

## Walkthrough: 
- Download from link for much better video quality
- seed.txt contains the dummy data used in this walkthrough
### Part 1: https://drive.google.com/file/d/1_chsadvuEj63z2iPTG0tunS243-P0dSO/view
### Part 2: https://drive.google.com/file/d/1iRqiWrOvJtx9sRfXB3z2FVO0wq8-1f1s/view


</br>
</br>

# Description

This is the backend portion of what resembles a social media website. Using mongodb as the database and mongoose for the controller interactions.

# Table of Contents

- [Installation](#installation)

- [Usage](#usage)

- [Contribution](#contribution)

- [License](#license)

<!---->

- [Questions](#questions)

# Installation

Download the project from github. Must have node, mongoDb, and npm downloaded on your client. Type "npm install" in the terminal from the root of this project to download the dependencies. From here everything will be up and running.

- Dependencies: express, mongoose

# Usage

- From the root of the directory type "npm start" to start the server
- From insomnia or whatever API interface you use, navigate the database with the following routes:
    - user-routes:
        - Get: /api/users 
            - gets all users and their corresponding thoughts
        - Get: /api/users/:id 
            - gets a single user and their corresponding thoughts
        - Post: /api/users 
            - adds a new user
        - Put: /api/users/:id 
            - edits a user's data
        - Delete: /api/users/:id 
            - removes a user from the database
        - Post: /api/users/:userId/friends/:friendId 
            - adds a friend to a user's friend array
        - Delete: /api/users/:userId/friends/:friendId 
            - removes a friend from a user's friend array
    - thought-routes:
        - Get: /api/thoughts
            - gets all thoughts and their corresponding reactions
        - Get: /api/thoughts/:id
            - gets a single thought and its corresponding reactions
        - Post: /api/thoughts/:userId
            - adds a new thought
        - Put: /api/thoughts/:id
            - edits a thoughts's data
        - Delete: /api/users/:id    
            - removes a thought from the database
        - Post: /api/thoughts/:thoughtId/reactions
            - adds a reaction to a thought
        - Delete: /api/thoughts/:thoughtId/reactions/:reactionId
            - delets a reaction from a thought
    -body-structure:
        -Refer to models folder for json body structure



# Contribution

Refer to:
[Contribution Convenant](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md)

# License

MIT

# Questions

Ask questions at my github

- GitHub Link: https://github.com/troygrossi
