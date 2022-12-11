import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await AppDataSource.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const result = await AppDataSource.manager.query(`SELECT * FROM events`);
    console.log(result);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));
