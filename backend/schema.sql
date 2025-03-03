CREATE TABLE IF NOT EXISTS UserProfile (
  UserID INTEGER PRIMARY KEY AUTOINCREMENT,
  Name TEXT NOT NULL,
  Email TEXT UNIQUE NOT NULL,
  Bio TEXT,
  SocialMediaLinks TEXT
);

CREATE INDEX IF NOT EXISTS idx_UserProfile_Email ON UserProfile(Email);

INSERT INTO UserProfile (Name, Email, Bio, SocialMediaLinks) VALUES
('Alice Johnson', 'alice@example.com', 'Cybersecurity enthusiast and blogger.', 'https://twitter.com/alicejohnson'),
('Bob Smith', 'bob@example.com', 'IT professional with a focus on security.', 'https://linkedin.com/in/bobsmith'),
('Charlie Brown', 'charlie@example.com', NULL, 'https://facebook.com/charliebrown'),
('Diana Prince', 'diana@example.com', 'Passionate about protecting data.', NULL),
('Edward Elric', 'edward@example.com', 'Crypto enthusiast.', 'https://instagram.com/edwardelric');

CREATE TABLE IF NOT EXISTS BlogPost (
  PostID INTEGER PRIMARY KEY AUTOINCREMENT,
  Title TEXT UNIQUE NOT NULL,
  Description TEXT NOT NULL,
  Content TEXT NOT NULL,
  Image TEXT,
  CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UpdatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_BlogPost_Title ON BlogPost(Title);

INSERT INTO BlogPost (Title, Description, Content, Image) VALUES
('Understanding Cybersecurity Basics', 'A guide to the fundamentals of cybersecurity.', 'Content about cybersecurity basics...', 'https://picsum.photos/500/300'),
('Top 10 Cybersecurity Tools', 'A rundown of the best tools for securing your data.', 'Content about tools...', 'https://picsum.photos/500/300'),
('How to Protect Your Privacy Online', 'Tips and tricks for maintaining privacy on the internet.', 'Content about privacy...', 'https://picsum.photos/500/300'),
('The Future of Cybersecurity', 'Exploring upcoming trends and innovations.', 'Content about the future...', 'https://picsum.photos/500/300'),
('Cybersecurity in Remote Work', 'Maintaining security while working from home.', 'Content about remote work...', 'https://picsum.photos/500/300');

CREATE TABLE IF NOT EXISTS Comment (
  CommentID INTEGER PRIMARY KEY AUTOINCREMENT,
  PostID INTEGER NOT NULL,
  UserID INTEGER NOT NULL,
  Content TEXT NOT NULL,
  CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (UserID, PostID),
  FOREIGN KEY (PostID) REFERENCES BlogPost(PostID) ON DELETE CASCADE,
  FOREIGN KEY (UserID) REFERENCES UserProfile(UserID) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_Comment_PostID ON Comment(PostID);

INSERT INTO Comment (PostID, UserID, Content) VALUES
(1, 1, 'Great introduction to cybersecurity!'),
(1, 2, 'Very informative, thanks for sharing.'),
(2, 3, 'I use some of these tools, very effective.'),
(3, 4, 'Privacy is so important nowadays, great tips.'),
(4, 1, 'I can’t wait to see what’s coming in the security field!'),
(5, 2, 'Remote work security tips are really necessary.');