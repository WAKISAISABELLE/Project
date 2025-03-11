import React from "react";
import { Link } from "react-router-dom";
import './welcome.css';

export default function Welcome() {
  console.log('Welcome component rendered'); // Debug: Confirm mount
  const chapters = [
    {
      id: 1,
      name: "Robotics and AI Chapter",
      description: "Association for Computing Machinery student chapter focused on advancing computing as a science and profession.",
      members: 120,
      events: 15,
      learnMoreUrl: 'https://www.robogals.org'
    },
    {
      id: 2,
      name: "Data Science",
      description: "Institute of Electrical and Electronics Engineers Computer Society chapter.",
      members: 95,
      events: 12,
      learnMoreUrl: 'https://www.kdnuggets.com'
    },
    {
      id: 3,
      name: "Mechatronics Engineering",
      description: "Supporting and promoting women in computer science and engineering.",
      members: 75,
      events: 8,
      learnMoreUrl: 'https://www.mtu.edu/mechatronics/what-is/'
    },
    {
      id: 4,
      name: "Augmented Reality",
      description: "Focused on artificial intelligence research and applications.",
      members: 60,
      events: 10,
      learnMoreUrl: 'https://www.techtarget.com/whatis/definition/augmented-reality-AR'
    },
    {
      id: 5,
      name: "Cybersecurity Club",
      description: "Dedicated to cybersecurity education and practice.",
      members: 85,
      events: 9,
      learnMoreUrl: 'https://www.cisco.com/site/us/en/learn/topics/security/what-is-cybersecurity.html'
    },
    {
      id: 6,
      name: "Graphics and Animations",
      description: "Promoting and contributing to open source software.",
      members: 70,
      events: 7,
      learnMoreUrl: 'https://www.opensource.org'
    }
  ];

  return (
    <div className="welcome-container">
      <header className='welcome-header'>
        <div className='logo'>CS</div>
        <nav className='main-nav'>
          <ul>
            <li><a href='#about'>About</a></li>
            <li><a href='#chapters'>Chapters</a></li>
            <li><a href='#contact'>Contact</a></li>
          </ul>
        </nav>
        <div className='auth-buttons'>
          <Link to='/login' className='button button-login'>Log in</Link>
          <Link to='/signup' className='button button-signup'>Sign up</Link>
        </div>
      </header>

      <section className='hero-section'>
        <h1>CSE CHAPTER HUB</h1>
        <p className='subtitle'>A comprehensive platform for managing chapter operations.</p>
      </section>

      <section id='about' className='about-section'>
        <h2>About CS Chapter hub</h2>
        <p>CS Chapter Hub is designed to streamline the management of student chapters.</p>
        <div className='features'>
          <div className='feature'>
            <div className='feature-icon'>📊</div>
            <h3>Chapter management</h3>
            <p>Easily manage chapter members, events and resources in one place.</p>
          </div>
          <div className='feature'>
            <div className='feature-icon'>🗓️</div>
            <h3>Event planning</h3>
            <p>Create, promote and track activities and events</p>
          </div>
          <div className='feature'>
            <div className='feature-icon'>🧚‍♀️</div>
            <h3>Member engagement</h3>
            <p>Keep member informed and engaged with announcements</p>
          </div>
        </div>
      </section>

      <section id="chapters" className="chapters-section">
        <h2>Our Chapters</h2>
        <p>Explore the various chapters in the Computer Science and Engineering faculty.</p>
        <div className="chapter-cards">
          {chapters.map(chapter => {
            console.log('Chapter URL:', chapter.learnMoreUrl); // Debug: Log each URL
            return (
              <div className="chapter-card" key={chapter.id}>
                <h3>{chapter.name}</h3>
                <p>{chapter.description}</p>
                <div className="chapter-stats">
                  <span>{chapter.members} Members</span>
                  <span>{chapter.events} Events</span>
                </div>
                <a
                  href={chapter.learnMoreUrl || '#'} // Fallback to '#' if undefined
                  className="chapter-button"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    console.log('Clicked URL:', chapter.learnMoreUrl);
                    if (!chapter.learnMoreUrl) e.preventDefault(); // Prevent navigation if undefined
                  }}
                >
                  Learn More
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}