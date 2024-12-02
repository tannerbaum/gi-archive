Around the time Gameinformer was shut down without warning, I ran a scrape of The Internet Archive to get as much of the articles from the site as I could using the program SiteSucker. Limitations involving the speed and rate limits of The Internet Archive meant this was an incredibly slow process. After a few weeks I had ~15k files. After stripping out cover story hubs, random files, and AMP duplicates, we're left with about 7.6k articles. I imagine there must have been tens of thousands more published on the site that I wasn't able to get once the scraping aborted. 

## To Former GI Staff 
You will find in the `/sorted` folder a folder with your name on it that contains all the articles I have with your byline. These are the text only versions, heavily manipulated from the HTML files I had that were filled with tracking code, Wayback's inserted code, and other nonsense. 

_Becuase you guys were doing some funky stuff in there with newlines and tabs, some of the spacing may be weird in the files. I tried to cut back on most of that 😆_

If there appears to be content missing in that txt file, then maybe my bulk operations on all the files didn't work for the contents of that article. If so – or if you just want to try to simulate what the article would have looked like – the full downloaded file can be found under this Github branch: https://github.com/tannerbaum/gi-archive/tree/sorted-full. They take forever to open which is why I wanted to cut these down to just the text content for you. If there is enough demand for it I can see if I can get a version of these pages that loads faster. Or maybe someone else can (see next section)

Thank you for all of the work you did over the years. 

## To other fans with scripting skills 
Please feel free to use these files however you like, or submit PRs with alternate sorting methods / modifications to the files. You can find a branch with the initial results of the scrape here, in case I screwed up somewhere. https://github.com/tannerbaum/gi-archive/tree/scrape. This also has some log files from SiteSucker in case anyone is especially familiar with that software and knows a way to resume the scraping. 
