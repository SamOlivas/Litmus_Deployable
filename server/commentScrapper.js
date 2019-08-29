const express = require('express');
const app = require('./server');
const axios = require('axios')
const {Subreddits, Comments } = require('./db');



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
//commentsFromSubredit('https://www.reddit.com/r/therewasanattempt/')


const messyData = ['Ninth', 'Tenth', 'Thirteenth', 'Eleventh', 'Twelth' ,
'Not sure if this fits the sub, but it is funny.', 'What?' ,
'Elephants are great',
 'There was a success',
 'Oh my god take your well deserved karma �' ,
'And that’s why you cut off the top and bottom first',
 'The number of pieces this melon exploded into almost perfectly resembles the number of times this gif has been posted in this subreddit before. \n\n\nNature is truly amazing.',
 'You have to cut the top first, don\'t? Like cutting a pineapple',
 'Bitch I see u tryna cut fruit like sum god damn samurai wit a broken sword dat ain’t goin work lemme show u how to samurai this BITCH',
 'I\'ve seen this so many times and I still enjoy it. Absolutely gorgeous!',
 'r/mildyinfuriating',
 'S̸̢̧̧̛̬̠̩̞̗̼̞̺̺̲̠͆ͅQ̶̧̨̩̗̹͕̞̠̰̹̫̠́̊̀̋̑̒̇̚͠U̸͇̟̳̱̻̩̖̲̳̤͚͎̥̭͂͋̌͗͋̀̆̿̈́̈͋̉̈͝Į̶̟̫̿͌̓̔̔̿̌͗̓͘S̴̡̧͈̠̥̣̭̻̩̩̱͖͍̘̀͆̇͆̔̆H̷̛̟̞͙̟̦̞͛̋̓̈́͂̾̚͜' ,
'To be fair, there are many situations where having an agreed-upon common language is much more inclusive and respectful than having small groups of people who do not communicate with each other. You cannot "connect cultures" if no one is speaking the same language.',
 'Looks edited.',
 'If you haven\'t noticed the uk is in the middle of the world, thats why',
 'Waarom?' ,
'No sandwich making on drugs.' ,
'It was a long walk back to the break room for Jeorgie',
 'You fool!',
 'That\'s me in rainbow six siege ���' ,
'r/instantkarma',
 'r/justiceserved',
 'A major oof moment',
 'Bitches be crazy.',
 'therewasanattempt 1 month ago(https://www.reddit.com/r/therewasanattempt/comments/cipftk/to_throw_acid_in_her_exs_face/)\n\ntherewasanattempt 1 month ago(https://www.reddit.com/r/therewasanattempt/comments/cirzas/to_throw_acid_on_exs_face/)\n\ninstantkarma 1 month ago(https://www.reddit.com/r/instantkarma/comments/cimg79/woman_tried_to_acid_attack_her_former_lover/)\n\ninstantkarma 1 month ago(https://www.reddit.com/r/instantkarma/comments/cimg79/woman_tried_to_acid_attack_her_former_lover/)\n\ndankmemes 1 month ago(https://www.reddit.com/r/dankmemes/comments/ciu47q/big_oof/)\n\nMGTOW 1 month ago(https://www.reddit.com/r/MGTOW/comments/ciqapn/thats_the_way_the_wind_blows/)\n\nWhatcouldgowrong 1 month ago(https://www.reddit.com/r/Whatcouldgowrong/comments/civ9it/wcgw_if_i_throw_acid/)' ,
'This is why pugs have smushy faces.',
 'That went from doggo to loggo really quickly.',
 'Pounding some wood, there, doggo?',
 '“Oof, Oh ow, god ow, stop filming.”',
 '"I got it, I GOT IT!!"',
 'This. Is. Me. Every. Single. Day.',
 'Story of my life so far...',
 'The spirit of Loca lives on(https://www.youtube.com/watch?v=x2RJN9a_jdM)',
 'As a pug owner, can confirm that they run head first into things all the time.',
 'Tuck and roll big guy. Nice attempt :)' ,
'So professional. So good. So adult.',
 'Uno is the exact opposite of the UN!',
 'Also used the word \'ur\'' ,
'Why would you even photoshop the sky? Presumably it\'s already there in the picture of the place you want to pretend you\'ve been to, no?',
 'Don’t let those cloud your judgement of the importance of her influence',
 'Those are some nice clouds, not gonna lie',
 'She\'s an "influencer" so what didya expect?',
 'All her followers are in the cloud.',
 'The clouds decide where she visits next',
 'r/instagramreality',
 'There was an article on this, she’s always been open about the use of photoshop on her pictures',
 'She literally has everything pre and post photoshop pics on her account stories . Just checked them when this same pic was posted in r/quityourbullshit.',
 '"There was an attempt" well she successfully attempted the photoshop. Perhaps title could be worked on',
 'I\'m so sick of these influencer people. Get a job god dammit.',
 'I guess its the feeling that matters am i right lads or am i right lads??? ... ? ..ok',
 '/r/instagramreality',
 'Xiaomi camera app does this',
 'She could have literally rotated and flipped some clouds to help avoid being caught. It takes two seconds. Sloppy.' ,
'Genuis idea',
 'This is genius! I wonder how long it\'ll keep the pup entertained? Either way it\'s good exercise for him lol',
 'this reminds me of the joke in elementary school where you would write "How do you keep an idiot busy?  Read the other side to find out." on both sides of a piece of paper.',
 'in 12 years the rope will cut the tree down',
 'Brilliant',
 'Outstanding move',
 'Who ever set this is evil' ,
'How could she not assert domanince? Great, now the cat probably thinks he owns the place',
 'Don’t bring none, won’t be none.',
 'It cracks me up how the cat just starts bopping her towards the end',
 'Take that Spartan t-shirt off this instant! You are not worthy. ^The ^shorts ^too.',
 'Dominance asserted.' ,
'*stays crunchy, even in milk*',
 '“Prefer” so they could be convinced maybe?',
 'I wonder, is cannibalism vegan?',
 'He didn\'t say we couldn\'t eat them. They would rather we don\'t eat animals either but num num num.',
 'And who’s stopping me, you grass-fed fuckholes' ,
'Lazarbeam can demonetize everyone',
 'Love how he contines to curse even after they say dont',
 'Aww shit! That\'s hilarious',
 'What a bloody legend',
 'Thats lazar for ya' ,
'Attempt succesful. Escape unsuccesful.',
 'Sounds like his face said hello to the floor!',
 'Headbutt: The unmistakable move of somebody who has no fighting experience whatsoever, or a shit ton of it. He doesn’t look like a shit ton. Just like shit.',
 'a fight video with no staph? i cant believe it.',
 'You\'re fuckin\' done' ,
'*to stop in the middle of a crosswalk and not get punched',
 'Street fighter II',
 'r/GTAorRussia?',
 'Also r/semiinstantkarma' ,
'I think he meant to do that, otherwise why were they filming.......',
 'idk...kinda seems like he was intending doing that. And its really cool tbh',
 'He forgot he had it enchanted with Loyalty III r/minecraft',
 'That\'s so cool',
 'Plant parachute',
 'The new Thor movie looks cool',
 'Tf is that you thor',
 'So that\'s how Mary Poppins did that.',
 'Prehistoric frisbee!',
 'Thors hammer in disguise',
 'he’s still worthy',
 'If you love something set it free. If it comes back, it’s yours.',
 'Ladies and gentlemen, It is him Thor! (this time he used groot\'s limb)',
 'Look, I\'m a jerk that rips up bushes.',
 'this must be the tree that grew from Donny’s ashes',
 'Great, one more thing all these influence idiots are going to copy for hits.',
 'If you love it let it go, but if it comes back it\'s meant to be',
 '*What kind of black magic is this?*',
 'Wingardium leviosa. Not leviosá!',
 'Task Failed Successfully.' ,
'Did the guy in the TRUCK get out before it BLEW UP?',
 'On top of everything else hes going to have to reset his \'days since I caught fire\' counter at work.',
 'i thought chinese people were evil and callous. they would never help someone in an accident. what happened? why did they run next to a raging fire to pull some guy away???',
 'The ammunition has detonated',
 'How to drive 101 ^^^',
 'Lol the guy that pours his drink on him',
 'LOL some people just deserve the shit they get' ,
'r/ConvenientCop',
 'this was so satisfying to watch',
 'Good ole Medicine Hat',
 'How does he know it’s stolen? Does the card reader say something other than declined?\n\n*EDIT:* I did some research on this because I was really curious and it\'s somewhat related to my work. According to page 38 of the Visa card acceptance guidelines(https://usa.visa.com/dam/VCOM/download/merchants/card-acceptance-guidelines-for-merchants.pdf) one of the responses can be "Pick Up".\n\n***\n\n|Response|Meaning|\n|:-|:-|\n|Approved|Card issuer approves the transaction. This is the most common response.|\n|Declined or Card Not Accepted|Card issuer does not approve the transaction. The transaction should not be completed. Return the card and instruct the cardholder to call the card issuer for more information on the status of the account.|\n|Call, Call Center, or Referrals|Card issuer needs more information before approving the sale. You should call your authorization center and follow whatever instructions you are given. In most cases, an authorization Agent will ask to speak directly with the cardholder or will instruct you to check the cardholder’s identification.|\n|**Pick Up**|**Card issuer wants to recover the card. Do not complete the transaction. Inform the customer that you have been instructed to keep the card, and ask for an alternative form of payment. If you feel uncomfortable, simply return the card to the cardholder.**|\n\n&amp;#x200B;\n\n# Recovered Cards\n\nIn general, you should recover a card if you have reasonable grounds for believing the card is being used fraudulently or is altered or counterfeit and it can be done safely. The following situations are considered reasonable grounds for recovery:\n\n* Card security features are missing or irregular, or appear to have been tampered with (See Visa Card Features and Security Elements on page 26 of this document.)\n* The account number on the magnetic-stripe does not match the number embossed on the front of the card (See Doing It Right at the Point of Sale on pages 20 through 25 of this document.)\n* You receive a pick-up response when a card has been swiped for electronic authorization.\n\n## Card Recovery Procedures\n\nThe following card recovery procedures apply to all Visa credit, debit, prepaid and Visa Electron cards:\n\n* Recover the card only if you can do so safely. Never take unnecessary risks.\n* Tell the cardholder you have been instructed to keep the card, and that he or she may call the card issuer for more information.\n* Remain calm and courteous. If the cardholder behaves in a threatening manner, return the card immediately.\n* Make a readable copy of the front and back of the card, if possible.\n* If the recovered card is retained by law enforcement officials, you must give your acquirer a readable copy to be eligible for a reward.\n* Cut the card according to acquirer procedures.\n* Tell your acquirer that you have recovered a card and ask for further instructions.\n\nFor cards that are inadvertently left at a merchant location and remain unclaimed, follow the procedures for contacting your acquirer and sending in the card.\n\n***\n\nAlso, fuck that. I\'m not holding that card in any situation, 100% not my job. Say it\'s declined and let the system figure it out. Obviously the card can\'t be used anymore and they have a record of where it\'s been.',
 'Haha does the cop drop some change on the counter before leaving? I think he paid for a coffee or something mid-arrest.',
 'Talk about having your job gift wrapped...',
 'Officer just grinning away watching it all unfold in front of him.',
 'Background song to watch it(https://www.youtube.com/watch?v=6MYAGyZlBY0)',
 'Lol how cocky. he even opened the drink before paying for it.' ,
'"I\'m just gonna pretend I was looking for a comfy spot to lie down"',
 'Sneak 0',
 'They get so embarrassed when they fall or fail. They start doing cat things like what this one does or they start rapidly licking themselves',
 'Me when i try to get my life together',
 'He just accepted his fate'
]

module.exports = messyData
