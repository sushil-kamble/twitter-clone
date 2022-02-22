/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE "tweet" CASCADE');
  await knex.raw('TRUNCATE TABLE "follow" CASCADE');
  await knex.raw('TRUNCATE TABLE "user" CASCADE');

  await knex("user").insert([
    {
      name: "Sushil Kamble",
      handle: "sushilkamble",
      password: "test@12345",
      avatar:
        "https://pbs.twimg.com/profile_images/1183019941085110272/VUyStWen_400x400.jpg",
      bio: "This is awesome",
    },
    {
      name: "Buddy 2",
      handle: "buddy2",
      password: "test@12345",
      avatar:
        "https://pbs.twimg.com/profile_images/1183019941085110272/VUyStWen_400x400.jpg",
      bio: "This is awesome 2",
    },
  ]);

  await knex("follow").insert([
    {
      from: 1,
      to: 2,
    },
  ]);

  await knex("tweet").insert([
    {
      content: "This tweet is awesome",
      userId: 1,
    },
    {
      content: "This tweet is awesome 2",
      userId: 2,
      likes: 50,
    },
  ]);

  await knex("tweet_likes").insert([
    {
      userId: 1,
      tweetId: 2,
    },
    {
      userId: 1,
      tweetId: 1,
    },
    {
      userId: 2,
      tweetId: 1,
    },
  ]);
};
