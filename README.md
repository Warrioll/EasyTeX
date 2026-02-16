# Editor LaTeX online - EasyTeX

Web application for creating documents based on LaTeX without needing to know the LaTeX syntax - simply by using GUI.

## How to run it

1. Download Docker (https://www.docker.com/get-started/) and start Docker engine
2. Clone this repository
3. Run application by executing in terminal one of the commands below, from the project's root directory

   - **To run application for the first time** (to build and run) use:

     ```
     docker-compose up --build
     ```

     Building can take even few minutes.

   - **To run application any other time:**
     ```
     docker-compose up
     ```

4. When application is running visit http://localhost:3000/ to use it.

## Stopping app and removing containers

- If you are running application in terminal, stop it simply close terminal window or press ctrl+c
- If you are running application in background from the project's root directory run:

      docker-compose stop

- If you want to remove containers, from the project's root directory run:

      docker-compose down

## Disclaimer

This application was developed by Karol Nowak, the owner of this repository, as part of a student engineering thesis conducted at the Rzeszow University of Technology.
