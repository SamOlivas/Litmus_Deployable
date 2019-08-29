const express = require('express');
const app = require('./server');
const axios = require('axios')
const {Subreddits, Comments } = require('./db');



//Grab all thread URLS
const urlsFromSubreddit = async(subredditURL) => {
  console.log('ran')
  const threadArray = [];
  const response = await axios.get(subredditURL+'.json');
  const allThreads = response.data.data.children
  allThreads.forEach( (thread) => {
    //console.log(thread)
    threadArray.push(thread.data.permalink)
  });
  return(threadArray);
}

// Grabs all tier 1 comment from post, returns as array
const commentsFromThread = async(threadURL) => {
  let pureComments =[];
  let urlFormatted = 'https://www.reddit.com'+threadURL+'.json'
  let response = await axios.get(urlFormatted);
  let threadComments = response.data[1].data.children
  threadComments.forEach( (comment) => {
    pureComments.push(comment.data.body)
  });
  //console.log(pureComments)
  return pureComments
};

const commentsFromSubredit = async(subredditURL) => {
  let allComments = [];
  const urls = await urlsFromSubreddit(subredditURL);
  console.log(urls)

  let counter = 0
  urls.forEach(async (url)=> {
    let holder = await commentsFromThread(url)
    // holder.forEach( async (comment) => {
    //   console.log(comment)
    //   await Comment.create({
    //     content: comment
    //   })
    // });
    allComments.push(holder)
    counter ++
  })
  setTimeout( () => {
    console.log(allComments)
    console.log(counter)
  },
  1000
  )
  return await allComments;
};
commentsFromSubredit('https://www.reddit.com/r/dankmemes/')


module.exports = commentsFromSubredit
