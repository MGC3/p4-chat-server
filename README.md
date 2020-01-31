# P4 Chat Server

<p align="center">
  <img src="https://raw.githubusercontent.com/MGC3/p4-chat-client/master/documentation/screen-shot-cover.png" width=300>
</p>

A chat app inspired by AOL Instant Messenger and Windows XP nostalgia. User's can create and join chatrooms and send messages in realtime to multiple users. The app is themed as a Windows XP desktop and the chat app's windows are draggable.

The backend for this app can be found in the following repo: [p4-chat-client](https://github.com/MGC3/p4-chat-client)

## Setup

- Clone or download the directory - `git clone git@github.com:MGC3/p4-chat-server.git`
- Install dependencies - `npm i`
- Start the dev server - `npm run start` (make sure to follow the same instructions for the [frontend repo](https://github.com/MGC3/p4-chat-client) as well)

## Technologies used

- React
- JavaScript
- Socket.IO
- Express
- MongoDB
- Styled Components

## API End Points

| Verb   | URI Pattern        |
| ------ | ------------------ |
| POST   | `/sign-up`         |
| POST   | `/sign-in`         |
| DELETE | `/sign-out`        |
| PATCH  | `/change-password` |
| GET    | `/chatrooms`       |
| POST   | `/chatrooms`       |
| GET    | `/chatrooms/:id`   |
| PATCH  | `/chatrooms/:id`   |
| DELETE | `/chatrooms/:id`   |
| POST   | `/messages/`       |

## Entity Relationship Diagram

<p align="center">
  <img src="https://raw.githubusercontent.com/MGC3/p4-chat-client/master/documentation/erd-p4-chat-app.png" width=300>
</p>

## Planning, Development and Problem Solving Strategy

I had a fun time planning and developing this app. In the beginning, I had a pretty strong vision of what I wanted the app to look like and some of the features I wanted to implement (basically, getting as close as I could to an AIM clone in 4 days), but didn't have a clear idea of how to get there. Before starting development, most of my planning phase was creating wireframes with pen and paper and trying to flush out as many user flows and edge cases as possible ahead of time. I also took some time here thinking about how to break these down into components before actually writing any code, which I found really helpful.

After some sketching and brainstorming sessions, I started the development phase by doing a deep dive into Socket.IO, as it was the biggest unknown for me. The first day and a half started out pretty rough since I was still feeling lost on how everything would connect in the big picture, but after a few proof of concepts, tons of googling, and most importantly, help from peers and instructors, things finally started clicking. I gained more confidence during the remaining two days and was able to hit my original MVP goal of having users chat in one global room, and was able to reach a stretch goal of allowing users to create multiple chat rooms.

My problem solving strategy for most things involved relying heavily on the Chrome dev tools (I pretty much permanently had React Dev Tools open in a tab somewhere). As always, `console.log`ing anything and everything was also a solid strategy. I also found it really helpful to draw things out on paper, which made it easier to visualize abstract problems.

## If I had more time...

Some bigger features I'd like to work on in the future are implementing a direct messaging system and also allowing users to add buddies / send friend requests.

There were also A LOT of silly ideas (that I still very much want to implement), like making users have to wait through the 56k dialup handshake before 'opening' the app, and having desktop icons that the user could interact with.
