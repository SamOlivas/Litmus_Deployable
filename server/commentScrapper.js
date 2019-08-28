const express = require('express');
const app = require('./server');
const axios = require('axios')

const subSeed = '/r/therewasanattempt/'

//Grab all thread URLS
const urlsFromSubreddit = async(subredditURL) => {
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
  commentsFromThread(urls[0])


  // const allComments = urls.map( async (url) => {
  //   await commentsFromThread(url)
  // })

  urls.forEach(async (url)=> {
    allComments.push( await commentsFromThread(url) )
    allComments.concat()
  })

  //setInterval( function() {console.log(allComments)}, 5000)
  //return allComments;
};

commentsFromSubredit('https://www.reddit.com/r/therewasanattempt/')

module.exports = commentsFromThread;
