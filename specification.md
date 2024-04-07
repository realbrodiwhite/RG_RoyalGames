# Overall Description and Goals:
The Royal Games Social Casino web-app aims to recreate the experience of a social casino platform, allowing users to play various casino games virtually withfriends or other online users. The primary goal is to provide an engaging, fun & interactive social gaming environment where players can enjoy casino games without real money betting. The platform will be designed mobile-first but will be fully responsive for all screen sizes.

## Features of the Application:

## User Authentication:
- Utilize Strapi’s built-in user authentication system that supports registration, login, email confirmation, and password reset.
- Users are required to provide their location, legal names, birthday, and either ID verification with a profile picture that “matches” their ID, or get verified status by an admin.
- Passwords should be managed by Strapi or must be securely stored using hashing techniques.

## Game Lobby:
- Displays available casino games including a dice game, coin toss, a version of bingo called ROYAL (with the letters in "royal" replacing the words in bingo), scratchers lottery tickets, and weekly as well as monthly lotterys.
- Users can join existing game rooms or request new ones.
- Shows the number of players in each game room.

## Agents:
- Users can request to be an agent after inviting 5 or more people to the platform or if they are made an agent by an Admin.
- Users that accept an invite are credited to the user who first sent an invite to the new user unless it was accepted more than 72 hours later, in which case nobody receives credit.

## Casino Games:
- Initial version to include a selection of popular casino games such as Blackjack, Poker, Slots, Dice, Coin Toss, and ROYAL.
- Game rules and instructions available within each game interface.
- Interactive tutorials for new users or those unfamiliar with certain games.

## Social Features:
- Friend system to connect with other players.
- Chat feature within game rooms for players to communicate.
- Follow your friends for all their game activity.

## Leaderboards:
- Display top players based on winnings or points.
- Separate leaderboards for each game.

## Profile Management:
- Allow users to edit their profile information (username, avatar).
- Require email or phone number, require legal first and last name, require location/address, View personal game statistics, goals and achievements.

## Achievements and Rewards:
- Implement an achievement or reward system to increase user engagement.
- Users could earn badges or points for reaching certain milestones, winning games, or participating in special events. Daily login bonus’, spin goals, spend targets etc.

## User Feedback/Support:
- Include a feature for users to provide feedback or report issues in the chat panel, also provide an AI support bot in the chat system.

## Subscription Packs:
- Users can subscribe to Bronze, Silver, Gold, or Platinum packs for an RTP booster of 0.5%, 1%, 1.5%, and 2% respectively.
- Subscription packs are available on a monthly or annual basis.

## Game Credits:
- Users can purchase game credits at a 1:1 ratio with dollars.
- Game credits are used in replacement of cash to play games, purchase RTP boosters, or participate in pickpocketing as well as any other in-app store products. Nothing in app is sold directly with money, every purchase must be made using game credits.

## RTP Boosters:
- Users can purchase temporary RTP boosters that provide a temporary increase in the RTP percentage for a limited time.
- RTP boosters are available in durations of 1 minute, 3 minutes, and 10 minutes, and percentages of 0.5%, 1%, 2%, and 3%.
- Users can stack one subscription with one active RTP booster for a maximum RTP boost of 5% at any one time.

## Admin Dashboard:
- Provides administrative control over various aspects of the platform, including game settings, RTP percentages, user management, subscription management, and reporting and analytics.

## Store:
- Users can purchase any in-app items in the in-app store using real money without verification.
- Verified users can trade their gaming credits back in at the store for real money.

## Pickpocket Feature:
- Users can choose to participate in the pickpocket feature on account creation, which allows them to risk their own game credits to try to pickpocket their friends.
- If a pickpocket attempt fails and the user gets caught by security, they lose their game credits to the house.
- If a pickpocket attempt is successful but they are caught by security, they can pay 20% of the pickpocketed amount to ensure security lets it slide, if they refuse they lose the pickpocketed money and an equal amount of their own game credits.
- If a pickpocket attempt is successful and the user is not caught by security then they keep the entire amount.
- Users have a 70% chance of success in pickpocketing.

## Lottery:
- The house keeps 5% of all funds from the lottery off the top and this is taken at lottery ticket purchase/win time before the total possible winning is calculated.
- When a user wins the pooled lottery, they can accept the lottery winning as direct deposit or playable game credits.
- If a winner chooses to take redeemable game credits, then 30% of all pooled funds lottery winnings go back to the house. This if the winner wants the redeemable credits sent as an immediate payout sent to their bank.
- But take only 5% (on top of the initial 5% before lottery total calculation) of the pooled funds lottery if the user chooses to take the payout in game credits!
- If a user keeps the game credits instead of the real money payout then they must use 100% of their payout in game before.

## Daily Spin:
- All users get a free daily spin on a wheel for a chance to win various prizes, including RTP boosters, game credits, and subscription packs.
- The maximum value of any prize is $20, and 80% of the prizes are $5 or less.

# Functional Specification:
- Upon visiting the web-app/app, users are greeted with a login/register page.
- After authentication, users are directed to the game lobby.
- In the game lobby, users can view available games and number of active players. They can join an existing game room or request a new one.
- Inside each game, users can play according to the game’s rules, interact with other players via chat, and view their current standings.
- The leaderboard is accessible from the main lobby, showing rankings for each game.
- Users can access their profile to edit personal information and view statistics.

# Technical Specification:
- Application Type: Web App, iOS, Android, Linux, Windows & MacOS
- Technologies Used: Node.js with Express framework, SQLite3 for database operations, EJS for templating on the frontend.
- Use a reverse proxy like Nginx for load balancing and caching.
- Implement a caching mechanism for improved performance.
- Monitor and measure performance using appropriate tools.
- Optimize database queries for faster data retrieval.
- Use load balancers to distribute traffic and reduce the load on individual servers.
- Use Strapi for user authentication, content management, user management, and admin dashboards.
- The application will be developed incrementally, starting with the most complex portions and all dependencies first to ensure minimal backtracking while writing the code.

# Architecture:
- Backend: Handles user authentication, game logic, database interactions, and serves dynamic content using EJS. The backend will use Socket.io for efficient real-time communication for the chat feature and game state updates.
- Frontend: Interactive UI, making AJAX calls to the backend for dynamic content updates without page reloads.
- Database: SQLite3 database for users, game rooms, game states, and chat messages.
- Server and Client: The server and client will be in separate folders but in the same project and deployed together so one command in the root should be capable of any scripts in the separate client/server folders, it may make sense to do so in a monorepo type of structure.

# Integration Specification:
- 3rd Party Integrations: None specified.
- Custom API Usage: Not applicable as no custom APIs are mentioned.

# Device Availability:
- Web-App (priority)
- Native iOS, Android, Linux, Windows & MacOS

# Pages and Components:
1. "/login", "/forgot_password" and "/register": Separated Authentication pages for users to login, reset password or register.
2. "/lobby": Main game lobby showing available games and rooms.
3. "/game/":gameId: Game interface where the selected game is played.
4. "/profile": User profile page for managing personal information and viewing statistics.
5. "/leaderboard": Page displaying the leaderboards for each game.
6. "/settings": Page for users to change their own settings like autospin, default bet minimum etc.
7. "/admin": Password Protected Page for Admins to manipulate game or app wide RTP settings, bonus game frequency, daily platform payout maximum, withdrawal/deposit minimums, user accounts, agents, jackpot maximum/frequency etc.

# Important Considerations:
- Ensure user data is securely handled and passwords are hashed.
- Design the UI to be responsive and engaging, providing a seamless gaming experience.
- Include a clear and easily accessible privacy policy and terms of service within the app.
