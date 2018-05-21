---
layout: post
title:  A Proof of the Monty Hall Problem in JS
h1: The Monty Hall Problem in JavaScript
description: My goal was to prove out the Monty Hall Problem in JavaScript.
date: 2018-03-10T08:00:01Z
categories: javascript
permalink: /blog/the-monty-hall-problem.html
excerpt: "After an unexpected reintroduction to the Monty Hall Problem, I try to test its premise in JavaScript."
---

You probably didn't know, but I love video games, and it's one of the reasons I decided to learn to program in the first place. It should come as no surprise that I consume just about anything related to games - videos, articles, disappointment in endless cycles of ports of old games to new platforms. Interestingly, it was during a YouTube video of a guy who goes by CarlSagan42 that I was reintroduced to the Monty Hall Problem - in this case, in the form of a [Super Mario Maker level](https://www.youtube.com/watch?v=otDNr4kSnAs) - and became curious on how I could demonstrate it with code.

<img src="https://i.chzbgr.com/full/7125393920/h307E1165/" alt="goats, my dude" style="text-align: center">

## Who is Monty Hall and What is His Problem?

For a little background to set the stage, Monty Hall was the host of a TV show called "Let's Make a Deal" that started out in the 60's and end its first run in the 80's (it has had several other iterations since). In the show, contestants would have to make a deal with the host, Monty Hall, usually trading some kind of prize for another prize of unknown value. One of those games forms the basis of what we know as "the Monty Hall Problem".

<img src="http://static.tvtropes.org/pmwiki/pub/images/Lets_Make_A_Deal_3048.gif" alt="Let's Make a Deal w. Monty Hall" style="text-align: center">

The particular game in question, The Big Deal, revolves around 3 doors, each of which has a prize behind it. Two of the contestants that had won during the main show would have the opportunity to give up the prizes they won for a chance to open one of the doors and receiving the prize behind it, so it was a game of chance where you might end up with a prize worth less than what you gave up.

## How is The Big Deal Related to The Monty Hall Problem?

The problem in question is kinda sorta based on The Big Deal from Let's Make a Deal. How it got named after Monty Hall is anybody's guess. Maybe he was secretly a math enthusiast? Either way, it was an American statistician named Steve Selvin who referred to it as such in 1975, and the name stuck.

Anyway, the problem also has the three doors, but it's also got a few key differences:

- Only one door has a prize, a car, behind it
- The other two doors have goats behind them
- The host, knowing what is behind each door, opens one of the remaining doors to reveal a goat (i.e. eliminates a wrong choice)
- The contestant is asked if they want to switch their chosen door

That's pretty much it. So, the basic flow of the testing of the problem's premise is:

- choose initial door
- host opens a goat door
- choose to switch doors or not to switch
- receive resulting car or goat

What makes it interesting is that we only want to answer the question, "is it in the contestant's best interest to change doors"? As it turns out, the answer is yes, but that's not why we're here. I wanted to see this thing demonstrated with real code here!

## Monty Hall Problem Proof in JavaScript

As it turns out, this is a pretty common problem to write up, and I had no idea! Anyway, I'll start by defining the goals and steps.

Goals
- provide a human readable outcome in the console
- prove that switching doors is the best choice
- do at least 10,000 tests to get a decent sample size

Steps
- 10,000x do:
  - choose a first random number, 1 - 3, as the "winning" door
  - choose a second random number, 1 - 3, as the "initial choice" door
  - switch the choice to another remaining number/door
  - note result as a win or a loss
- print results of all 10,000 tests to console as percentage won vs. percentage lost

With some basic goals and steps set down, I'll show you the code I wrote to test the premise. I used an object to store the outcome of each turn of my for loop, and inside the for loop, there's a bunch of fun stuff. We invoke the chooseDoor function with an integer (n), and it returns a random integer value from 0 to n - 1. We do that twice to get our first pick and the winner. We also assign a variable for the doors left after our choice.

At that point, our first set of conditionals removes either the element at the 0 or 1 index as long as it's not the winner, and finally, we increment one of the values at a win or loss key in the results object. Outside of the for loop, we log the outcome of the tests.

{% highlight JavaScript %}

const results = {
  wonGames: 0,
  lostGames: 0
}

const chooseDoor = (n) => {
  return Math.floor(Math.random() * n);
}

const runMontyHallProblemTests = (n) => {
  for(var i = 0; i < n; i++){
  // assign first choice, winner and door switch choices
  let initialChoiceDoor = chooseDoor(3),
    winnerDoor    = chooseDoor(3),
    remainingDoors  = [0,1,2].filter(
      (d) => d !== initialChoiceDoor
    );

  // remove a 'goat' door from switch choices
  if(remainingDoors[0] === winnerDoor){
    remainingDoors.pop();
  } else {
    remainingDoors.shift();
  }

  // increment the winner or loser
  if(remainingDoors[0] === winnerDoor){
    results.wonGames++;
  } else {
    results.lostGames++;
  }
  }

  // after for loop completes, log the results
  console.log(
  `${results.wonGames / (results.wonGames + results.lostGames) * 100}% of switches resulted in wins. ${results.lostGames / (results.wonGames + results.lostGames) * 100}% resulted in losses.`
  )
}

{% endhighlight %}

## On Clearly Understading a Problem

To be real about this exercise, I made a pretty significant blunder before I even started - I forgot the part about removing a goat after the initial door choice. And it showed! In my first version of the code, I saw that my results were the EXACT OPPOSITE of the expected outcome, so I knew I did something wrong. You can see the same thing yourself if you leave out the first conditional block and change `remainingDoors[0]` to `remainingDoors[chooseDoor(2)]` in the second conditional. It was frustrating to realize it. After about 10 minutes of scratching my head, I reread the Wolfram-Alpha page about the Monty Hall Problem and immediately saw the issue.

My error certainly underscores the importance of clearly delineating and understanding deliverables **before** starting to code. Or at least having a pair that can tell you you're being a bonehead.

## Thoughts on My Solution to the Monty Hall Problem

I know there are things I can improve about the code I wrote that can be improved. There are a few hard-coded values (indices, the array) I use that would fall apart if ever this code were to be used for more than three doors. I've read that there's another version of Monty Hall that has four doors, so the solution is brittle beyond the three door scope.

Additionally, the two conditional blocks make me feel like there's a more elegant way to accomplish the same thing. I'll look at how others have solved this problem to get a sense of whether or not that's true, but it feels like a case of code smell.

Feel free to test out the above code in the console (it's included in this page) or tweet me with thoughts on what I wrote. Thanks for reading!

<script src="/js/monty-hall.js"></script>
