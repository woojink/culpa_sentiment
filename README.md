# culpa sentiment
by [Woojin Kim](http://woojink.com), [José Daniel Ramirez Soto](https://github.com/jdramirez), & Manuel Rueda at [DevFest 2016](http://devfe.st/)

culpa sentiment performs sentiment analysis on the reviews posted on [CULPA](http://culpa.info/) to give users a quick summary of the many reviews for the courses at Columbia University. See it live here: http://woojink.github.io/culpa_sentiment/

## Inspiration
CULPA has a lot more useful information about the courses and the professors at Columbia than any other resource, but the amount of text of some of the courses/professors makes it overwhelming to get a quick overview for course selection. We wanted to make this better.

## What it does
The reviews are collected from CULPA using the CULPA API and fed to the [Alchemy API](http://www.alchemyapi.com/) for sentiment analysis. The results are organized and summarized in a way that is the most useful for browsing and selecting courses at Columbia. The result provides both the overall sentiment analysis as well as possibly important keywords from the review.

## How we built it
Python was used to interact with the CULPA and Alchemy APIs and create the database (PostgreSQL). On the front-end, we have d3.js providing the figures and jQuery handling the document structure and search functions.

## Challenges we ran into
API query limit was the hardest one really. Without a paid account, we were limited in terms of how many reviews we can perform sentiment analysis for.

## What's next?
* Finish performing analysis on every review for more analytics on the reviews
* Possible integration with CULPA
* Explore converting the colour scale to a five-star scale
