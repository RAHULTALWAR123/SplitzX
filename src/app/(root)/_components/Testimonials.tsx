/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import './Testimonials.css';

interface Tweet {
  id: number;
  avatar: string;
  text: string;
  handle: string;
}

interface TweetCardProps {
  tweet: Tweet;
}

interface MarqueeRowProps {
  tweets: Tweet[];
  direction?: 'left' | 'right';
  speed?: number;
}

const Testimonials = () => {
  const tweets: Tweet[] = [
    {
      id: 1,
      avatar: 'https://pbs.twimg.com/profile_images/1923072273809801216/B2K1_X63_400x400.jpg',
      text: 'Tried many expense splitting apps but SplitzX nails it with perfect UI and effortless sharing',
      handle: '@itsRajnandinit',
      // url: 'https://x.com/itsRajnandinit/status/1890326577809924497'
    },
    {
      id: 2,
      avatar: 'https://pbs.twimg.com/profile_images/1918646280223608832/nqBF4zh__400x400.jpg',
      text: 'SplitzX makes group finances painless - the clean design and instant calculations are game changers',
      handle: '@syskey_dmg',
      // url: 'https://x.com/syskey_dmg/status/1929762648922398754'
    },
    {
      id: 3,
      avatar: 'https://pbs.twimg.com/profile_images/1794450494686932992/wqRqF4dt_400x400.jpg',
      text: 'Really impressed by https://SplitzX Check it out.',
      handle: '@makwanadeepam',
      // url: 'https://x.com/makwanadeepam/status/1879416558461890864'
    },
    {
      id: 4,
      avatar: 'https://pbs.twimg.com/profile_images/1722358890807861248/75S7CB3G_400x400.jpg',
      text: 'SplitzX: Finally an expense app that doesnt make simple math feel like rocket science',
      handle: '@gregberge_',
      // url: 'https://x.com/gregberge_/status/1896425347866059041'
    },
    {
      id: 5,
      avatar: 'https://pbs.twimg.com/profile_images/1554006663853592576/Gxtolzbo_400x400.jpg',
      text: 'Literally the coolest app',
      handle: '@Logreg_n_coffee',
      // url: 'https://x.com/Logreg_n_coffee/status/1889573533425991992'
    },
    {
      id: 6,
      avatar: 'https://pbs.twimg.com/profile_images/1880284612062056448/4Y2C8Xnv_400x400.jpg',
      text: 'SplitzX receipt scanning and automatic currency conversion saved our international trip',
      handle: '@DIYDevs',
      // url: 'https://x.com/DIYDevs/status/1892964440900763761'
    },
    {
      id: 7,
      avatar: 'https://pbs.twimg.com/profile_images/1724192049002340352/-tood-4D_400x400.jpg',
      text: 'The dark mode in SplitzX is so easy on eyes during late-night expense logging',
      handle: '@GibsonSMurray',
      // url: 'https://x.com/GibsonSMurray/status/1889909058838339626'
    },
    {
      id: 8,
      avatar: 'https://pbs.twimg.com/profile_images/1885430699567513600/JP1m8cHY_400x400.jpg',
      text: 'SplitzX one-click settlement feature makes collecting money from friends actually work',
      handle: '@Traccey001',
      // url: 'https://x.com/Traccey001/status/1875450691805966422'
    },
    {
      id: 9,
      avatar: 'https://pbs.twimg.com/profile_images/1915754015381483520/07SpEJWa_400x400.jpg',
      text: 'As someone who splits 50+ expenses monthly, SplitzX bulk actions are lifesavers',
      handle: '@Alishahzad2000M',
      // url: 'https://x.com/Alishahzad2000M/status/1916556455232127010'
    }
  ];

  const row1Tweets = tweets.slice(0, 3);
  const row2Tweets = tweets.slice(3, 6);
  const row3Tweets = tweets.slice(6, 9);

  const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => (
    <div
      className="testimonial-card"
      // onClick={() => window.open(tweet.url, '_blank')}
      role="button"
      tabIndex={0}
    >
      <div className="testimonial-content">
        <p className="testimonial-text">{tweet.text}</p>
        <div className="testimonial-author">
          <img
            src={tweet.avatar}
            alt="Avatar"
            className="testimonial-avatar"
            loading="lazy"
          />
          <span className="testimonial-handle">{tweet.handle}</span>
        </div>
      </div>
    </div>
  );

  const MarqueeRow: React.FC<MarqueeRowProps> = ({ tweets, direction = 'left', speed = 30 }) => {
    const duplicatedTweets = [...tweets, ...tweets, ...tweets, ...tweets];

    return (
      <div className="testimonial-row">
        <div
          className={`testimonial-marquee testimonial-marquee-${direction}`}
          style={{ '--speed': `${speed}s` } as React.CSSProperties}
        >
          {duplicatedTweets.map((tweet, index) => (
            <TweetCard key={`${tweet.id}-${index}`} tweet={tweet} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h3 className="testimonials-title">Loved by users worldwide</h3>
          <p className="testimonials-subtitle">
            See what our users are saying about SplitzX
          </p>
        </div>

        <div className="testimonials-marquee-container">
          <MarqueeRow tweets={row1Tweets} direction="left" speed={40} />
          <MarqueeRow tweets={row2Tweets} direction="right" speed={35} />
          <MarqueeRow tweets={row3Tweets} direction="left" speed={45} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;