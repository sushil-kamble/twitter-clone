/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcrypt = require("bcryptjs");

exports.seed = async function (knex) {
  const pass = await bcrypt.hash("test@12345", 10);

  await knex.raw('TRUNCATE TABLE "tweet" CASCADE');
  await knex.raw('TRUNCATE TABLE "follow" CASCADE');
  await knex.raw('TRUNCATE TABLE "user" CASCADE');

  await knex("user").insert([
    {
      name: "Sushil Kamble",
      handle: "sushilkamble",
      password: pass,
      avatar:
        "https://pbs.twimg.com/profile_images/1183019941085110272/VUyStWen_400x400.jpg",
      bio: "This is awesome",
    },
    {
      name: "test 1",
      handle: "test1",
      password: pass,
      bio: "Hello everyone, This is Test 1",
    },
    {
      name: "test 2",
      handle: "test2",
      password: pass,
      bio: "Hello everyone, This is Test 2",
    },
  ]);

  await knex("follow").insert([
    {
      from: 1,
      to: 2,
    },
    {
      from: 1,
      to: 3,
    },
    {
      from: 3,
      to: 1,
    },
  ]);

  await knex("tweet").insert([
    {
      content: "This tweet is awesome",
      userId: 1,
    },
    {
      content: "Lets Go",
      userId: 2,
    },
    {
      content: "Hello Guys, hello from test 2",
      userId: 3,
    },
    {
      content: "Hope Everything is going well",
      userId: 1,
    },
  ]);

  await knex("tweet_likes").insert([
    {
      userId: 1,
      tweetId: 2,
    },
    {
      userId: 1,
      tweetId: 3,
    },
  ]);
};
