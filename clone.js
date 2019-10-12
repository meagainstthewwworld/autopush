require("dotenv").config();
// Simple-git without promise
const simpleGit = require("simple-git")();
// Shelljs package for running shell tasks optional
const shellJs = require("shelljs");
// Simple Git with Promise for handling success and failure
const simpleGitPromise = require("simple-git/promise")();
const octokit = require("@octokit/rest")();

// Authentication using username and password
// octokit.authenticate({
//   type: "basic",
//   username: process.env.USERNAME,
//   password: process.env.PASSWORD
// });
// // Variables for Repo name and description
// var folderName = "auto-create-repo";
// var repoDescription = "repo creation using git api";

// //Create a Repository online via Github Api
// const createGitHubRepo = octokit.repos.create({
//   folderName,
//   repoDescription
// });

// change current directory to repo directory in local
shellJs.cd("../auto-create-repo/");
// Repo name
const repo = "autopush"; //Repo name
// User name and password of your GitHub
const userName = process.env.USERNAME;
const password = process.env.PASSWORD;
// Set up GitHub url like this so no manual entry of user pass needed
const gitHubUrl = `https://${userName}:${password}@github.com/${userName}/${repo}`;
console.log(gitHubUrl);
// add local git config like username and email
simpleGit.addConfig("user.email", "karavanleather@gmail.com");
simpleGit.addConfig("user.name", "Ahmad Zakiy");
// Add remore repo url as origin to repo
// simpleGitPromise.addRemote("origin", gitHubUrl);
// Add all files for commit
simpleGitPromise.add(".").then(
  addSuccess => {
    console.log(addSuccess);
  },
  failedAdd => {
    console.log("adding files failed");
  }
);
// Commit files as Initial Commit
simpleGitPromise.commit("Intial commit by simplegit").then(
  successCommit => {
    console.log(successCommit);
  },
  failed => {
    console.log("failed commmit");
  }
);
// Finally push to online repository
simpleGitPromise.push("origin", "master").then(
  success => {
    console.log("repo successfully pushed");
  },
  failed => {
    console.log("repo push failed");
  }
);
