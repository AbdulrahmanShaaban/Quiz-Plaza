export interface OfflineQuestion {
  id: string;
  text: string;
  options: [string, string, string, string];
  correctAnswer: 0 | 1 | 2 | 3;
  category: "sports" | "food" | "technology" | "movies" | "geography" | "music";
  difficulty: "easy" | "medium" | "hard";
  explanation?: string;
}

export const offlineQuestions: OfflineQuestion[] = [
  // SPORTS (30 questions)
  {
    id: "sports-1",
    text: "Which country has won the most FIFA World Cup titles?",
    options: ["Germany", "Brazil", "Argentina", "Italy"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "easy",
    explanation: "Brazil has won 5 World Cup titles (1958, 1962, 1970, 1994, 2002)."
  },
  {
    id: "sports-2",
    text: "How many players are on a standard basketball team on the court?",
    options: ["5", "6", "7", "4"],
    correctAnswer: 0,
    category: "sports",
    difficulty: "easy",
    explanation: "A basketball team has 5 players on the court at any time."
  },
  {
    id: "sports-3",
    text: "What is the length of a marathon race?",
    options: ["26.2 miles", "24.5 miles", "28.1 miles", "25.0 miles"],
    correctAnswer: 0,
    category: "sports",
    difficulty: "easy",
    explanation: "A marathon is 26.2 miles (42.195 kilometers)."
  },
  {
    id: "sports-4",
    text: "Which sport is known as 'the beautiful game'?",
    options: ["Basketball", "Soccer", "Tennis", "Cricket"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "easy",
    explanation: "Soccer is famously known as 'the beautiful game'."
  },
  {
    id: "sports-5",
    text: "How many points is a touchdown worth in American football?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "easy",
    explanation: "A touchdown is worth 6 points in American football."
  },
  {
    id: "sports-6",
    text: "What is the maximum number of clubs a golfer can carry in their bag?",
    options: ["12", "14", "15", "16"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "medium",
    explanation: "Golf rules allow a maximum of 14 clubs in a bag."
  },
  {
    id: "sports-7",
    text: "Which tennis player has won the most Grand Slam singles titles?",
    options: ["Rafael Nadal", "Roger Federer", "Novak Djokovic", "Pete Sampras"],
    correctAnswer: 2,
    category: "sports",
    difficulty: "medium",
    explanation: "Novak Djokovic has won the most Grand Slam singles titles (24 as of 2024)."
  },
  {
    id: "sports-8",
    text: "In which year did the first modern Olympic Games take place?",
    options: ["1896", "1900", "1892", "1904"],
    correctAnswer: 0,
    category: "sports",
    difficulty: "medium",
    explanation: "The first modern Olympic Games were held in Athens in 1896."
  },
  {
    id: "sports-9",
    text: "What is the national sport of Japan?",
    options: ["Judo", "Karate", "Sumo Wrestling", "Kendo"],
    correctAnswer: 2,
    category: "sports",
    difficulty: "medium",
    explanation: "Sumo wrestling is considered Japan's national sport."
  },
  {
    id: "sports-10",
    text: "How many rings are on the Olympic flag?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "easy",
    explanation: "The Olympic flag has 5 interlocking rings representing 5 continents."
  },
  {
    id: "sports-11",
    text: "Which boxer was known as 'The Greatest'?",
    options: ["Mike Tyson", "Muhammad Ali", "Joe Frazier", "George Foreman"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "easy",
    explanation: "Muhammad Ali famously called himself 'The Greatest'."
  },
  {
    id: "sports-12",
    text: "What is the diameter of a basketball hoop in inches?",
    options: ["16", "18", "20", "22"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "hard",
    explanation: "A standard basketball hoop is 18 inches in diameter."
  },
  {
    id: "sports-13",
    text: "Which country invented cricket?",
    options: ["Australia", "India", "England", "South Africa"],
    correctAnswer: 2,
    category: "sports",
    difficulty: "medium",
    explanation: "Cricket originated in England in the 16th century."
  },
  {
    id: "sports-14",
    text: "How long is a standard FIFA soccer match?",
    options: ["80 minutes", "90 minutes", "100 minutes", "85 minutes"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "easy",
    explanation: "A standard soccer match is 90 minutes (45 minutes each half)."
  },
  {
    id: "sports-15",
    text: "What is the highest possible break in snooker?",
    options: ["147", "155", "140", "150"],
    correctAnswer: 0,
    category: "sports",
    difficulty: "hard",
    explanation: "The maximum break in snooker is 147 (15 reds, 15 blacks, and all colors)."
  },
  {
    id: "sports-16",
    text: "Which swimmer has won the most Olympic gold medals?",
    options: ["Mark Spitz", "Michael Phelps", "Ian Thorpe", "Ryan Lochte"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "medium",
    explanation: "Michael Phelps has won 23 Olympic gold medals."
  },
  {
    id: "sports-17",
    text: "In baseball, what is it called when a batter hits the ball out of the park?",
    options: ["Home Run", "Strike", "Grand Slam", "Touchdown"],
    correctAnswer: 0,
    category: "sports",
    difficulty: "easy",
    explanation: "A home run is when the ball is hit out of the playing field."
  },
  {
    id: "sports-18",
    text: "How many players are on a standard rugby union team?",
    options: ["13", "15", "11", "17"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "medium",
    explanation: "A rugby union team has 15 players on the field."
  },
  {
    id: "sports-19",
    text: "Which city hosted the first Winter Olympics?",
    options: ["St. Moritz", "Lake Placid", "Chamonix", "Oslo"],
    correctAnswer: 2,
    category: "sports",
    difficulty: "hard",
    explanation: "The first Winter Olympics were held in Chamonix, France in 1924."
  },
  {
    id: "sports-20",
    text: "What is the term for three consecutive strikes in bowling?",
    options: ["Double", "Turkey", "Strike", "Perfect Game"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "medium",
    explanation: "Three consecutive strikes in bowling is called a turkey."
  },
  {
    id: "sports-21",
    text: "Which Formula 1 driver has the most World Championships?",
    options: ["Lewis Hamilton", "Michael Schumacher", "Ayrton Senna", "Sebastian Vettel"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "medium",
    explanation: "Michael Schumacher and Lewis Hamilton both have 7 World Championships."
  },
  {
    id: "sports-22",
    text: "How many points is a free throw worth in basketball?",
    options: ["1", "2", "3", "0.5"],
    correctAnswer: 0,
    category: "sports",
    difficulty: "easy",
    explanation: "A free throw is worth 1 point in basketball."
  },
  {
    id: "sports-23",
    text: "What is the length of an Olympic swimming pool?",
    options: ["25 meters", "50 meters", "75 meters", "100 meters"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "easy",
    explanation: "Olympic swimming pools are 50 meters long."
  },
  {
    id: "sports-24",
    text: "Which country has won the most Olympic gold medals in history?",
    options: ["China", "Soviet Union", "USA", "Great Britain"],
    correctAnswer: 2,
    category: "sports",
    difficulty: "medium",
    explanation: "The USA has won the most Olympic gold medals in history."
  },
  {
    id: "sports-25",
    text: "In tennis, what does 'love' mean?",
    options: ["Zero", "One", "Tie", "Match Point"],
    correctAnswer: 0,
    category: "sports",
    difficulty: "easy",
    explanation: "In tennis scoring, 'love' means zero points."
  },
  {
    id: "sports-26",
    text: "How many holes are played in a standard round of golf?",
    options: ["9", "18", "27", "36"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "easy",
    explanation: "A standard round of golf consists of 18 holes."
  },
  {
    id: "sports-27",
    text: "Which martial art is the national sport of South Korea?",
    options: ["Karate", "Judo", "Taekwondo", "Kung Fu"],
    correctAnswer: 2,
    category: "sports",
    difficulty: "medium",
    explanation: "Taekwondo is the national sport of South Korea."
  },
  {
    id: "sports-28",
    text: "What is the maximum score in a single frame of bowling?",
    options: ["10", "20", "30", "15"],
    correctAnswer: 2,
    category: "sports",
    difficulty: "hard",
    explanation: "The maximum score in a single bowling frame is 30 (three strikes in a row)."
  },
  {
    id: "sports-29",
    text: "Which horse won the Triple Crown in 2018?",
    options: ["American Pharoah", "Justify", "Secretariat", "War Admiral"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "hard",
    explanation: "Justify won the Triple Crown in 2018."
  },
  {
    id: "sports-30",
    text: "How many players are on a standard volleyball team?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "easy",
    explanation: "A volleyball team has 6 players on the court."
  },

  // FOOD (30 questions)
  {
    id: "food-1",
    text: "Which country is famous for inventing pizza?",
    options: ["France", "Italy", "USA", "Spain"],
    correctAnswer: 1,
    category: "food",
    difficulty: "easy",
    explanation: "Pizza originated in Naples, Italy."
  },
  {
    id: "food-2",
    text: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Avocado", "Onion", "Pepper"],
    correctAnswer: 1,
    category: "food",
    difficulty: "easy",
    explanation: "Avocado is the main ingredient in guacamole."
  },
  {
    id: "food-3",
    text: "Which spice gives curry its yellow color?",
    options: ["Cumin", "Turmeric", "Paprika", "Coriander"],
    correctAnswer: 1,
    category: "food",
    difficulty: "easy",
    explanation: "Turmeric gives curry its distinctive yellow color."
  },
  {
    id: "food-4",
    text: "What type of pastry is used to make a croissant?",
    options: ["Choux pastry", "Puff pastry", "Shortcrust", "Filo pastry"],
    correctAnswer: 1,
    category: "food",
    difficulty: "medium",
    explanation: "Croissants are made with laminated puff pastry."
  },
  {
    id: "food-5",
    text: "Which country is the largest producer of coffee?",
    options: ["Colombia", "Vietnam", "Brazil", "Ethiopia"],
    correctAnswer: 2,
    category: "food",
    difficulty: "medium",
    explanation: "Brazil is the world's largest coffee producer."
  },
  {
    id: "food-6",
    text: "What is the primary ingredient in hummus?",
    options: ["Yogurt", "Chickpeas", "Lentils", "Beans"],
    correctAnswer: 1,
    category: "food",
    difficulty: "easy",
    explanation: "Hummus is primarily made from chickpeas (garbanzo beans)."
  },
  {
    id: "food-7",
    text: "Which fruit is known as the 'king of fruits'?",
    options: ["Mango", "Durian", "Apple", "Banana"],
    correctAnswer: 1,
    category: "food",
    difficulty: "medium",
    explanation: "Durian is known as the 'king of fruits' in Southeast Asia."
  },
  {
    id: "food-8",
    text: "What is the main ingredient in traditional Japanese miso soup?",
    options: ["Soy sauce", "Miso paste", "Rice vinegar", "Fish sauce"],
    correctAnswer: 1,
    category: "food",
    difficulty: "easy",
    explanation: "Miso soup is made with miso paste (fermented soybeans)."
  },
  {
    id: "food-9",
    text: "Which cheese is traditionally used on pizza?",
    options: ["Cheddar", "Mozzarella", "Parmesan", "Gouda"],
    correctAnswer: 1,
    category: "food",
    difficulty: "easy",
    explanation: "Mozzarella is the traditional cheese for pizza."
  },
  {
    id: "food-10",
    text: "What is the most consumed meat worldwide?",
    options: ["Beef", "Chicken", "Pork", "Fish"],
    correctAnswer: 1,
    category: "food",
    difficulty: "medium",
    explanation: "Chicken is the most consumed meat globally."
  },
  {
    id: "food-11",
    text: "Which country invented sushi?",
    options: ["China", "Japan", "Thailand", "Korea"],
    correctAnswer: 1,
    category: "food",
    difficulty: "easy",
    explanation: "Sushi originated in Japan."
  },
  {
    id: "food-12",
    text: "What is the main ingredient in pesto sauce?",
    options: ["Tomatoes", "Basil", "Arugula", "Spinach"],
    correctAnswer: 1,
    category: "food",
    difficulty: "easy",
    explanation: "Fresh basil is the main ingredient in pesto sauce."
  },
  {
    id: "food-13",
    text: "Which nut is used to make marzipan?",
    options: ["Walnut", "Almond", "Cashew", "Pistachio"],
    correctAnswer: 1,
    category: "food",
    difficulty: "medium",
    explanation: "Marzipan is made primarily from almonds."
  },
  {
    id: "food-14",
    text: "What is the alcoholic content of standard beer?",
    options: ["3-5%", "5-7%", "8-10%", "10-12%"],
    correctAnswer: 0,
    category: "food",
    difficulty: "medium",
    explanation: "Standard beer typically has 3-5% alcohol by volume."
  },
  {
    id: "food-15",
    text: "Which vegetable is used to make sauerkraut?",
    options: ["Spinach", "Cabbage", "Kale", "Lettuce"],
    correctAnswer: 1,
    category: "food",
    difficulty: "easy",
    explanation: "Sauerkraut is made from fermented cabbage."
  },
  {
    id: "food-16",
    text: "What is the main ingredient in the French dish coq au vin?",
    options: ["Beef", "Chicken", "Duck", "Rabbit"],
    correctAnswer: 1,
    category: "food",
    difficulty: "medium",
    explanation: "Coq au vin is a French dish made with chicken braised in wine."
  },
  {
    id: "food-17",
    text: "Which spice is the most expensive in the world?",
    options: ["Vanilla", "Saffron", "Cardamom", "Cinnamon"],
    correctAnswer: 1,
    category: "food",
    difficulty: "medium",
    explanation: "Saffron is the world's most expensive spice."
  },
  {
    id: "food-18",
    text: "What type of food is a 'bagel'?",
    options: ["Cake", "Bread", "Pastry", "Cookie"],
    correctAnswer: 1,
    category: "food",
    difficulty: "easy",
    explanation: "A bagel is a type of bread product."
  },
  {
    id: "food-19",
    text: "Which country is famous for tacos?",
    options: ["Spain", "Mexico", "Brazil", "Argentina"],
    correctAnswer: 1,
    category: "food",
    difficulty: "easy",
    explanation: "Tacos originated in Mexico."
  },
  {
    id: "food-20",
    text: "What is the main ingredient in tabbouleh?",
    options: ["Rice", "Bulgur wheat", "Couscous", "Quinoa"],
    correctAnswer: 1,
    category: "food",
    difficulty: "medium",
    explanation: "Tabbouleh is made with bulgur wheat as its base."
  },
  {
    id: "food-21",
    text: "Which fruit is used to make prunes?",
    options: ["Grapes", "Plums", "Apricots", "Figs"],
    correctAnswer: 1,
    category: "food",
    difficulty: "easy",
    explanation: "Prunes are dried plums."
  },
  {
    id: "food-22",
    text: "What is the primary ingredient in falafel?",
    options: ["Lentils", "Chickpeas", "Beans", "Peas"],
    correctAnswer: 1,
    category: "food",
    difficulty: "easy",
    explanation: "Falafel is primarily made from chickpeas or fava beans."
  },
  {
    id: "food-23",
    text: "Which country invented the sandwich?",
    options: ["France", "Italy", "England", "Germany"],
    correctAnswer: 2,
    category: "food",
    difficulty: "medium",
    explanation: "The sandwich is named after the 4th Earl of Sandwich, an Englishman."
  },
  {
    id: "food-24",
    text: "What is the main ingredient in the Greek dish spanakopita?",
    options: ["Cheese", "Spinach", "Meat", "Rice"],
    correctAnswer: 1,
    category: "food",
    difficulty: "medium",
    explanation: "Spanakopita is a Greek spinach pie."
  },
  {
    id: "food-25",
    text: "Which type of chocolate has the highest cocoa content?",
    options: ["Milk chocolate", "White chocolate", "Dark chocolate", "Ruby chocolate"],
    correctAnswer: 2,
    category: "food",
    difficulty: "easy",
    explanation: "Dark chocolate has the highest cocoa content."
  },
  {
    id: "food-26",
    text: "What is the national dish of Spain?",
    options: ["Paella", "Tapas", "Gazpacho", "Churros"],
    correctAnswer: 0,
    category: "food",
    difficulty: "medium",
    explanation: "Paella is considered Spain's national dish."
  },
  {
    id: "food-27",
    text: "Which grain is used to make risotto?",
    options: ["Long-grain rice", "Arborio rice", "Basmati rice", "Jasmine rice"],
    correctAnswer: 1,
    category: "food",
    difficulty: "medium",
    explanation: "Risotto is made with Arborio rice, a short-grain Italian rice."
  },
  {
    id: "food-28",
    text: "What is the main ingredient in the Korean dish kimchi?",
    options: ["Cucumber", "Cabbage", "Radish", "Carrot"],
    correctAnswer: 1,
    category: "food",
    difficulty: "easy",
    explanation: "Kimchi is primarily made from fermented cabbage."
  },
  {
    id: "food-29",
    text: "Which country is famous for waffles?",
    options: ["France", "Netherlands", "Belgium", "Germany"],
    correctAnswer: 2,
    category: "food",
    difficulty: "easy",
    explanation: "Belgium is famous for its waffles."
  },
  {
    id: "food-30",
    text: "What is the primary ingredient in the Indian dish dal?",
    options: ["Rice", "Lentils", "Chickpeas", "Beans"],
    correctAnswer: 1,
    category: "food",
    difficulty: "easy",
    explanation: "Dal is made primarily from lentils."
  },

  // TECHNOLOGY (30 questions)
  {
    id: "tech-1",
    text: "Who founded Microsoft?",
    options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos"],
    correctAnswer: 1,
    category: "technology",
    difficulty: "easy",
    explanation: "Bill Gates co-founded Microsoft with Paul Allen."
  },
  {
    id: "tech-2",
    text: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Computer Processing Unit"],
    correctAnswer: 0,
    category: "technology",
    difficulty: "easy",
    explanation: "CPU stands for Central Processing Unit."
  },
  {
    id: "tech-3",
    text: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "JavaScript", "Java", "C++"],
    correctAnswer: 1,
    category: "technology",
    difficulty: "easy",
    explanation: "JavaScript is essential for web development."
  },
  {
    id: "tech-4",
    text: "What year was the first iPhone released?",
    options: ["2005", "2006", "2007", "2008"],
    correctAnswer: 2,
    category: "technology",
    difficulty: "easy",
    explanation: "The first iPhone was released in 2007."
  },
  {
    id: "tech-5",
    text: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
    correctAnswer: 0,
    category: "technology",
    difficulty: "easy",
    explanation: "HTML stands for Hyper Text Markup Language."
  },
  {
    id: "tech-6",
    text: "Who is the CEO of Tesla?",
    options: ["Jeff Bezos", "Tim Cook", "Elon Musk", "Sundar Pichai"],
    correctAnswer: 2,
    category: "technology",
    difficulty: "easy",
    explanation: "Elon Musk is the CEO of Tesla."
  },
  {
    id: "tech-7",
    text: "What does URL stand for?",
    options: ["Universal Resource Locator", "Uniform Resource Locator", "United Resource Link", "Universal Reference Link"],
    correctAnswer: 1,
    category: "technology",
    difficulty: "easy",
    explanation: "URL stands for Uniform Resource Locator."
  },
  {
    id: "tech-8",
    text: "Which company created the Android operating system?",
    options: ["Apple", "Microsoft", "Google", "Samsung"],
    correctAnswer: 2,
    category: "technology",
    difficulty: "easy",
    explanation: "Android was developed by Google."
  },
  {
    id: "tech-9",
    text: "What is the main function of RAM?",
    options: ["Long-term storage", "Temporary memory", "Graphics processing", "Network connectivity"],
    correctAnswer: 1,
    category: "technology",
    difficulty: "medium",
    explanation: "RAM provides temporary memory for running programs."
  },
  {
    id: "tech-10",
    text: "What does HTTP stand for?",
    options: ["HyperText Transfer Protocol", "High Tech Transfer Protocol", "HyperText Transmission Protocol", "Home Tool Transfer Protocol"],
    correctAnswer: 0,
    category: "technology",
    difficulty: "easy",
    explanation: "HTTP stands for HyperText Transfer Protocol."
  },
  {
    id: "tech-11",
    text: "Which company developed the first video game console?",
    options: ["Nintendo", "Atari", "Sega", "Sony"],
    correctAnswer: 1,
    category: "technology",
    difficulty: "medium",
    explanation: "Atari developed the first commercial video game console, the Atari 2600."
  },
  {
    id: "tech-12",
    text: "What is a 'bug' in programming?",
    options: ["A feature", "An error or flaw", "A virus", "A security measure"],
    correctAnswer: 1,
    category: "technology",
    difficulty: "easy",
    explanation: "A bug is an error or flaw in software."
  },
  {
    id: "tech-13",
    text: "What does AI stand for?",
    options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Applied Innovation"],
    correctAnswer: 1,
    category: "technology",
    difficulty: "easy",
    explanation: "AI stands for Artificial Intelligence."
  },
  {
    id: "tech-14",
    text: "Which programming language is known for its snake logo?",
    options: ["Java", "Python", "Ruby", "PHP"],
    correctAnswer: 1,
    category: "technology",
    difficulty: "easy",
    explanation: "Python uses a snake as its logo."
  },
  {
    id: "tech-15",
    text: "What is the purpose of a firewall?",
    options: ["Speed up internet", "Block unauthorized access", "Store data", "Improve graphics"],
    correctAnswer: 1,
    category: "technology",
    difficulty: "medium",
    explanation: "A firewall protects networks from unauthorized access."
  },
  {
    id: "tech-16",
    text: "Who co-founded Apple Computer?",
    options: ["Bill Gates", "Steve Jobs and Steve Wozniak", "Mark Zuckerberg", "Larry Page"],
    correctAnswer: 1,
    category: "technology",
    difficulty: "easy",
    explanation: "Apple was co-founded by Steve Jobs and Steve Wozniak."
  },
  {
    id: "tech-17",
    text: "What does VPN stand for?",
    options: ["Virtual Private Network", "Virtual Public Network", "Visual Private Network", "Verified Private Network"],
    correctAnswer: 0,
    category: "technology",
    difficulty: "medium",
    explanation: "VPN stands for Virtual Private Network."
  },
  {
    id: "tech-18",
    text: "Which company owns Instagram?",
    options: ["Google", "Twitter", "Meta (Facebook)", "Microsoft"],
    correctAnswer: 2,
    category: "technology",
    difficulty: "easy",
    explanation: "Meta (formerly Facebook) owns Instagram."
  },
  {
    id: "tech-19",
    text: "What is the binary system based on?",
    options: ["Base 8", "Base 10", "Base 2", "Base 16"],
    correctAnswer: 2,
    category: "technology",
    difficulty: "medium",
    explanation: "The binary system is based on base 2 (0s and 1s)."
  },
  {
    id: "tech-20",
    text: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
    correctAnswer: 1,
    category: "technology",
    difficulty: "easy",
    explanation: "CSS stands for Cascading Style Sheets."
  },
  {
    id: "tech-21",
    text: "Which device is used to input data into a computer?",
    options: ["Monitor", "Keyboard", "Speaker", "Printer"],
    correctAnswer: 1,
    category: "technology",
    difficulty: "easy",
    explanation: "A keyboard is an input device."
  },
  {
    id: "tech-22",
    text: "What is a 'pixel'?",
    options: ["A programming language", "The smallest unit of a digital image", "A type of virus", "A storage device"],
    correctAnswer: 1,
    category: "technology",
    difficulty: "easy",
    explanation: "A pixel is the smallest unit of a digital image."
  },
  {
    id: "tech-23",
    text: "Who invented the World Wide Web?",
    options: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs", "Mark Zuckerberg"],
    correctAnswer: 1,
    category: "technology",
    difficulty: "medium",
    explanation: "Tim Berners-Lee invented the World Wide Web."
  },
  {
    id: "tech-24",
    text: "What does IoT stand for?",
    options: ["Internet of Things", "Input of Technology", "Integration of Tools", "Internet on Time"],
    correctAnswer: 0,
    category: "technology",
    difficulty: "medium",
    explanation: "IoT stands for Internet of Things."
  },
  {
    id: "tech-25",
    text: "Which company created the PlayStation?",
    options: ["Nintendo", "Microsoft", "Sony", "Sega"],
    correctAnswer: 2,
    category: "technology",
    difficulty: "easy",
    explanation: "Sony created the PlayStation."
  },
  {
    id: "tech-26",
    text: "What is cloud computing?",
    options: ["Weather prediction", "Storing and accessing data over the internet", "A type of hardware", "Computer graphics"],
    correctAnswer: 1,
    category: "technology",
    difficulty: "medium",
    explanation: "Cloud computing involves storing and accessing data over the internet."
  },
  {
    id: "tech-27",
    text: "What does API stand for?",
    options: ["Application Programming Interface", "Automated Program Integration", "Application Process Interface", "Automated Protocol Integration"],
    correctAnswer: 0,
    category: "technology",
    difficulty: "medium",
    explanation: "API stands for Application Programming Interface."
  },
  {
    id: "tech-28",
    text: "Which company developed the Linux operating system?",
    options: ["Microsoft", "Apple", "Linus Torvalds (open source)", "IBM"],
    correctAnswer: 2,
    category: "technology",
    difficulty: "medium",
    explanation: "Linux was created by Linus Torvalds as an open-source project."
  },
  {
    id: "tech-29",
    text: "What is a 'server'?",
    options: ["A type of computer game", "A computer that provides data to other computers", "A restaurant worker", "A type of software"],
    correctAnswer: 1,
    category: "technology",
    difficulty: "easy",
    explanation: "A server provides data and services to other computers."
  },
  {
    id: "tech-30",
    text: "What does GPS stand for?",
    options: ["Global Positioning System", "Geographic Position System", "Global Path System", "Geographic Path System"],
    correctAnswer: 0,
    category: "technology",
    difficulty: "easy",
    explanation: "GPS stands for Global Positioning System."
  },

  // MOVIES (30 questions)
  {
    id: "movies-1",
    text: "Who directed the movie 'Jurassic Park'?",
    options: ["James Cameron", "Steven Spielberg", "George Lucas", "Ridley Scott"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "easy",
    explanation: "Steven Spielberg directed Jurassic Park."
  },
  {
    id: "movies-2",
    text: "What year was the first Star Wars movie released?",
    options: ["1975", "1977", "1979", "1980"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "easy",
    explanation: "Star Wars: A New Hope was released in 1977."
  },
  {
    id: "movies-3",
    text: "Which actor played Iron Man in the Marvel movies?",
    options: ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"],
    correctAnswer: 2,
    category: "movies",
    difficulty: "easy",
    explanation: "Robert Downey Jr. played Iron Man."
  },
  {
    id: "movies-4",
    text: "What is the highest-grossing film of all time (unadjusted)?",
    options: ["Avengers: Endgame", "Avatar", "Titanic", "Star Wars: The Force Awakens"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "medium",
    explanation: "Avatar is the highest-grossing film of all time."
  },
  {
    id: "movies-5",
    text: "Who directed 'The Dark Knight'?",
    options: ["Christopher Nolan", "Zack Snyder", "Tim Burton", "James Cameron"],
    correctAnswer: 0,
    category: "movies",
    difficulty: "easy",
    explanation: "Christopher Nolan directed The Dark Knight."
  },
  {
    id: "movies-6",
    text: "Which movie features the quote 'Here's looking at you, kid'?",
    options: ["Gone with the Wind", "Casablanca", "The Godfather", "Citizen Kane"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "medium",
    explanation: "This famous quote is from Casablanca."
  },
  {
    id: "movies-7",
    text: "What is the name of the wizard in 'The Lord of the Rings'?",
    options: ["Saruman", "Gandalf", "Radagast", "Alatar"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "easy",
    explanation: "Gandalf is the main wizard in The Lord of the Rings."
  },
  {
    id: "movies-8",
    text: "Which studio produces the Marvel Cinematic Universe?",
    options: ["Warner Bros", "Universal", "Disney", "Paramount"],
    correctAnswer: 2,
    category: "movies",
    difficulty: "easy",
    explanation: "Disney produces the Marvel Cinematic Universe."
  },
  {
    id: "movies-9",
    text: "Who played Jack in the movie 'Titanic'?",
    options: ["Brad Pitt", "Leonardo DiCaprio", "Johnny Depp", "Tom Cruise"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "easy",
    explanation: "Leonardo DiCaprio played Jack Dawson in Titanic."
  },
  {
    id: "movies-10",
    text: "What is the name of the protagonist in 'The Matrix'?",
    options: ["Morpheus", "Trinity", "Neo", "Agent Smith"],
    correctAnswer: 2,
    category: "movies",
    difficulty: "easy",
    explanation: "Neo (Thomas Anderson) is the protagonist of The Matrix."
  },
  {
    id: "movies-11",
    text: "Which movie won Best Picture at the 2020 Oscars?",
    options: ["Joker", "1917", "Parasite", "Once Upon a Time in Hollywood"],
    correctAnswer: 2,
    category: "movies",
    difficulty: "medium",
    explanation: "Parasite won Best Picture at the 2020 Oscars."
  },
  {
    id: "movies-12",
    text: "Who directed 'Pulp Fiction'?",
    options: ["Martin Scorsese", "Quentin Tarantino", "Francis Ford Coppola", "Stanley Kubrick"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "medium",
    explanation: "Quentin Tarantino directed Pulp Fiction."
  },
  {
    id: "movies-13",
    text: "What is the name of Batman's butler?",
    options: ["James", "Alfred", "Bruce", "Thomas"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "easy",
    explanation: "Alfred Pennyworth is Batman's loyal butler."
  },
  {
    id: "movies-14",
    text: "Which actress played Wonder Woman?",
    options: ["Margot Robbie", "Gal Gadot", "Scarlett Johansson", "Emma Watson"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "easy",
    explanation: "Gal Gadot plays Wonder Woman."
  },
  {
    id: "movies-15",
    text: "What is the name of the villain in 'The Lion King'?",
    options: ["Mufasa", "Scar", "Simba", "Nala"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "easy",
    explanation: "Scar is the villain in The Lion King."
  },
  {
    id: "movies-16",
    text: "Who directed 'Avatar'?",
    options: ["James Cameron", "Steven Spielberg", "Peter Jackson", "Ridley Scott"],
    correctAnswer: 0,
    category: "movies",
    difficulty: "easy",
    explanation: "James Cameron directed Avatar."
  },
  {
    id: "movies-17",
    text: "Which movie features a character named Darth Vader?",
    options: ["Star Trek", "Star Wars", "Battlestar Galactica", "Guardians of the Galaxy"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "easy",
    explanation: "Darth Vader is the main villain in Star Wars."
  },
  {
    id: "movies-18",
    text: "What is the name of the haunted hotel in 'The Shining'?",
    options: ["The Bates Motel", "The Overlook Hotel", "The Grand Budapest", "The Torrance Hotel"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "medium",
    explanation: "The Overlook Hotel is the setting of The Shining."
  },
  {
    id: "movies-19",
    text: "Who played the Joker in 'The Dark Knight'?",
    options: ["Joaquin Phoenix", "Jack Nicholson", "Heath Ledger", "Jared Leto"],
    correctAnswer: 2,
    category: "movies",
    difficulty: "easy",
    explanation: "Heath Ledger played the Joker in The Dark Knight."
  },
  {
    id: "movies-20",
    text: "Which movie is about a toy cowboy named Woody?",
    options: ["Cars", "Toy Story", "Monsters Inc.", "The Incredibles"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "easy",
    explanation: "Toy Story features Woody the cowboy doll."
  },
  {
    id: "movies-21",
    text: "Who directed 'Forrest Gump'?",
    options: ["Steven Spielberg", "Robert Zemeckis", "Ron Howard", "John Lasseter"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "medium",
    explanation: "Robert Zemeckis directed Forrest Gump."
  },
  {
    id: "movies-22",
    text: "What is the name of the shark in 'Jaws'?",
    options: ["Bruce", "Jaws", "Killer", "Sharky"],
    correctAnswer: 0,
    category: "movies",
    difficulty: "hard",
    explanation: "The shark in Jaws was nicknamed Bruce by the crew."
  },
  {
    id: "movies-23",
    text: "Which movie features the song 'My Heart Will Go On'?",
    options: ["The Bodyguard", "Titanic", "Ghost", "Dirty Dancing"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "easy",
    explanation: "My Heart Will Go On is from Titanic."
  },
  {
    id: "movies-24",
    text: "Who played Hannibal Lecter in 'The Silence of the Lambs'?",
    options: ["Anthony Hopkins", "Jack Nicholson", "Al Pacino", "Robert De Niro"],
    correctAnswer: 0,
    category: "movies",
    difficulty: "medium",
    explanation: "Anthony Hopkins played Hannibal Lecter."
  },
  {
    id: "movies-25",
    text: "What is the name of the superhero team in 'The Avengers'?",
    options: ["Justice League", "X-Men", "The Avengers", "Fantastic Four"],
    correctAnswer: 2,
    category: "movies",
    difficulty: "easy",
    explanation: "The superhero team is called The Avengers."
  },
  {
    id: "movies-26",
    text: "Who directed 'Interstellar'?",
    options: ["Denis Villeneuve", "Christopher Nolan", "James Cameron", "Steven Spielberg"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "medium",
    explanation: "Christopher Nolan directed Interstellar."
  },
  {
    id: "movies-27",
    text: "Which movie is set in the fictional world of Pandora?",
    options: ["Avatar", "John Carter", "Valerian", "Guardians of the Galaxy"],
    correctAnswer: 0,
    category: "movies",
    difficulty: "easy",
    explanation: "Avatar is set on the moon Pandora."
  },
  {
    id: "movies-28",
    text: "Who played Spider-Man in the MCU?",
    options: ["Andrew Garfield", "Tobey Maguire", "Tom Holland", "Miles Morales"],
    correctAnswer: 2,
    category: "movies",
    difficulty: "easy",
    explanation: "Tom Holland plays Spider-Man in the MCU."
  },
  {
    id: "movies-29",
    text: "What is the name of the ghost in 'Ghostbusters'?",
    options: ["Casper", "Slimer", "Beetlejuice", "Poltergeist"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "medium",
    explanation: "Slimer is the famous green ghost in Ghostbusters."
  },
  {
    id: "movies-30",
    text: "Who directed 'Inception'?",
    options: ["David Fincher", "Christopher Nolan", "Denis Villeneuve", "Christopher McQuarrie"],
    correctAnswer: 1,
    category: "movies",
    difficulty: "easy",
    explanation: "Christopher Nolan directed Inception."
  },

  // GEOGRAPHY (30 questions)
  {
    id: "geo-1",
    text: "What is the largest country in the world by area?",
    options: ["China", "USA", "Russia", "Canada"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "easy",
    explanation: "Russia is the largest country by area."
  },
  {
    id: "geo-2",
    text: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    correctAnswer: 1,
    category: "geography",
    difficulty: "medium",
    explanation: "The Nile is traditionally considered the longest river."
  },
  {
    id: "geo-3",
    text: "Which continent has the most countries?",
    options: ["Asia", "Europe", "Africa", "South America"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "medium",
    explanation: "Africa has 54 countries, the most of any continent."
  },
  {
    id: "geo-4",
    text: "What is the capital of Japan?",
    options: ["Osaka", "Kyoto", "Tokyo", "Yokohama"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "easy",
    explanation: "Tokyo is the capital of Japan."
  },
  {
    id: "geo-5",
    text: "Which ocean is the largest?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: 3,
    category: "geography",
    difficulty: "easy",
    explanation: "The Pacific Ocean is the largest ocean."
  },
  {
    id: "geo-6",
    text: "What is the smallest country in the world?",
    options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "easy",
    explanation: "Vatican City is the smallest country."
  },
  {
    id: "geo-7",
    text: "Which country has the largest population?",
    options: ["USA", "India", "China", "Indonesia"],
    correctAnswer: 1,
    category: "geography",
    difficulty: "easy",
    explanation: "India is now the most populous country."
  },
  {
    id: "geo-8",
    text: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "easy",
    explanation: "Canberra is the capital of Australia."
  },
  {
    id: "geo-9",
    text: "Which mountain range includes Mount Everest?",
    options: ["Alps", "Andes", "Rockies", "Himalayas"],
    correctAnswer: 3,
    category: "geography",
    difficulty: "easy",
    explanation: "Mount Everest is in the Himalayas."
  },
  {
    id: "geo-10",
    text: "What is the largest desert in the world?",
    options: ["Sahara", "Arabian", "Gobi", "Antarctic"],
    correctAnswer: 3,
    category: "geography",
    difficulty: "medium",
    explanation: "Antarctica is the largest desert in the world."
  },
  {
    id: "geo-11",
    text: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "South Korea", "Japan", "Thailand"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "easy",
    explanation: "Japan is known as the Land of the Rising Sun."
  },
  {
    id: "geo-12",
    text: "What is the capital of Canada?",
    options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "easy",
    explanation: "Ottawa is the capital of Canada."
  },
  {
    id: "geo-13",
    text: "Which river flows through the Grand Canyon?",
    options: ["Snake River", "Colorado River", "Rio Grande", "Columbia River"],
    correctAnswer: 1,
    category: "geography",
    difficulty: "medium",
    explanation: "The Colorado River carved the Grand Canyon."
  },
  {
    id: "geo-14",
    text: "What is the largest island in the world?",
    options: ["Greenland", "Madagascar", "Borneo", "New Guinea"],
    correctAnswer: 0,
    category: "geography",
    difficulty: "medium",
    explanation: "Greenland is the world's largest island."
  },
  {
    id: "geo-15",
    text: "Which country has the most natural lakes?",
    options: ["USA", "Russia", "Canada", "Finland"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "hard",
    explanation: "Canada has the most natural lakes in the world."
  },
  {
    id: "geo-16",
    text: "What is the capital of Brazil?",
    options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "easy",
    explanation: "Brasília is the capital of Brazil."
  },
  {
    id: "geo-17",
    text: "Which continent is known as the 'Dark Continent'?",
    options: ["Asia", "South America", "Africa", "Australia"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "medium",
    explanation: "Africa was historically called the Dark Continent."
  },
  {
    id: "geo-18",
    text: "What is the tallest waterfall in the world?",
    options: ["Niagara Falls", "Victoria Falls", "Angel Falls", "Iguazu Falls"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "medium",
    explanation: "Angel Falls in Venezuela is the tallest waterfall."
  },
  {
    id: "geo-19",
    text: "Which country is shaped like a boot?",
    options: ["Spain", "Greece", "Italy", "Turkey"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "easy",
    explanation: "Italy is famously shaped like a boot."
  },
  {
    id: "geo-20",
    text: "What is the capital of Egypt?",
    options: ["Alexandria", "Luxor", "Cairo", "Giza"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "easy",
    explanation: "Cairo is the capital of Egypt."
  },
  {
    id: "geo-21",
    text: "Which sea separates Europe from Africa?",
    options: ["Black Sea", "Red Sea", "Mediterranean Sea", "North Sea"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "easy",
    explanation: "The Mediterranean Sea separates Europe from Africa."
  },
  {
    id: "geo-22",
    text: "What is the largest country in South America?",
    options: ["Argentina", "Brazil", "Colombia", "Peru"],
    correctAnswer: 1,
    category: "geography",
    difficulty: "easy",
    explanation: "Brazil is the largest country in South America."
  },
  {
    id: "geo-23",
    text: "Which city is built on canals?",
    options: ["Paris", "Venice", "Amsterdam", "Bruges"],
    correctAnswer: 1,
    category: "geography",
    difficulty: "easy",
    explanation: "Venice is famous for its canals."
  },
  {
    id: "geo-24",
    text: "What is the capital of Germany?",
    options: ["Munich", "Hamburg", "Berlin", "Frankfurt"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "easy",
    explanation: "Berlin is the capital of Germany."
  },
  {
    id: "geo-25",
    text: "Which country has the most time zones?",
    options: ["Russia", "USA", "China", "France"],
    correctAnswer: 0,
    category: "geography",
    difficulty: "hard",
    explanation: "Russia has 11 time zones, the most of any country."
  },
  {
    id: "geo-26",
    text: "What is the capital of France?",
    options: ["Lyon", "Marseille", "Paris", "Nice"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "easy",
    explanation: "Paris is the capital of France."
  },
  {
    id: "geo-27",
    text: "Which volcano destroyed Pompeii?",
    options: ["Etna", "Vesuvius", "Stromboli", "Krakatoa"],
    correctAnswer: 1,
    category: "geography",
    difficulty: "medium",
    explanation: "Mount Vesuvius destroyed Pompeii in 79 AD."
  },
  {
    id: "geo-28",
    text: "What is the capital of China?",
    options: ["Shanghai", "Hong Kong", "Beijing", "Guangzhou"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "easy",
    explanation: "Beijing is the capital of China."
  },
  {
    id: "geo-29",
    text: "Which country is known as the Emerald Isle?",
    options: ["Scotland", "Ireland", "Iceland", "Greenland"],
    correctAnswer: 1,
    category: "geography",
    difficulty: "easy",
    explanation: "Ireland is known as the Emerald Isle."
  },
  {
    id: "geo-30",
    text: "What is the capital of Spain?",
    options: ["Barcelona", "Seville", "Madrid", "Valencia"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "easy",
    explanation: "Madrid is the capital of Spain."
  },

  // MUSIC (30 questions)
  {
    id: "music-1",
    text: "Who is known as the 'King of Pop'?",
    options: ["Elvis Presley", "Michael Jackson", "Prince", "Freddie Mercury"],
    correctAnswer: 1,
    category: "music",
    difficulty: "easy",
    explanation: "Michael Jackson is known as the King of Pop."
  },
  {
    id: "music-2",
    text: "Which band performed 'Bohemian Rhapsody'?",
    options: ["The Beatles", "Led Zeppelin", "Queen", "Pink Floyd"],
    correctAnswer: 2,
    category: "music",
    difficulty: "easy",
    explanation: "Bohemian Rhapsody was performed by Queen."
  },
  {
    id: "music-3",
    text: "What instrument has 88 keys?",
    options: ["Guitar", "Violin", "Piano", "Organ"],
    correctAnswer: 2,
    category: "music",
    difficulty: "easy",
    explanation: "A standard piano has 88 keys."
  },
  {
    id: "music-4",
    text: "Who wrote the 'Moonlight Sonata'?",
    options: ["Mozart", "Beethoven", "Chopin", "Bach"],
    correctAnswer: 1,
    category: "music",
    difficulty: "medium",
    explanation: "Beethoven composed the Moonlight Sonata."
  },
  {
    id: "music-5",
    text: "Which genre originated in New Orleans?",
    options: ["Rock", "Jazz", "Country", "Hip Hop"],
    correctAnswer: 1,
    category: "music",
    difficulty: "easy",
    explanation: "Jazz originated in New Orleans."
  },
  {
    id: "music-6",
    text: "What is the most sold album of all time?",
    options: ["Dark Side of the Moon", "Thriller", "Back in Black", "The Eagles"],
    correctAnswer: 1,
    category: "music",
    difficulty: "medium",
    explanation: "Michael Jackson's Thriller is the best-selling album."
  },
  {
    id: "music-7",
    text: "Who sang 'Rolling in the Deep'?",
    options: ["Beyoncé", "Adele", "Lady Gaga", "Taylor Swift"],
    correctAnswer: 1,
    category: "music",
    difficulty: "easy",
    explanation: "Adele sang Rolling in the Deep."
  },
  {
    id: "music-8",
    text: "Which band had members John, Paul, George, and Ringo?",
    options: ["The Rolling Stones", "The Beatles", "The Who", "The Kinks"],
    correctAnswer: 1,
    category: "music",
    difficulty: "easy",
    explanation: "These were the members of The Beatles."
  },
  {
    id: "music-9",
    text: "What is the national anthem of the United States?",
    options: ["America the Beautiful", "The Star-Spangled Banner", "God Bless America", "My Country, Tis of Thee"],
    correctAnswer: 1,
    category: "music",
    difficulty: "easy",
    explanation: "The Star-Spangled Banner is the US national anthem."
  },
  {
    id: "music-10",
    text: "Who is known as the 'Queen of Soul'?",
    options: ["Diana Ross", "Whitney Houston", "Aretha Franklin", "Tina Turner"],
    correctAnswer: 2,
    category: "music",
    difficulty: "medium",
    explanation: "Aretha Franklin is known as the Queen of Soul."
  },
  {
    id: "music-11",
    text: "Which composer went deaf?",
    options: ["Mozart", "Beethoven", "Bach", "Vivaldi"],
    correctAnswer: 1,
    category: "music",
    difficulty: "easy",
    explanation: "Beethoven became deaf later in life."
  },
  {
    id: "music-12",
    text: "What genre is Taylor Swift primarily known for?",
    options: ["Rock", "Country/Pop", "Jazz", "Hip Hop"],
    correctAnswer: 1,
    category: "music",
    difficulty: "easy",
    explanation: "Taylor Swift started in country and moved to pop."
  },
  {
    id: "music-13",
    text: "Who sang 'Purple Rain'?",
    options: ["Michael Jackson", "Prince", "David Bowie", "Stevie Wonder"],
    correctAnswer: 1,
    category: "music",
    difficulty: "easy",
    explanation: "Purple Rain was performed by Prince."
  },
  {
    id: "music-14",
    text: "Which instrument is a saxophone?",
    options: ["String", "Percussion", "Woodwind", "Brass"],
    correctAnswer: 2,
    category: "music",
    difficulty: "medium",
    explanation: "The saxophone is a woodwind instrument."
  },
  {
    id: "music-15",
    text: "Who wrote 'Imagine'?",
    options: ["Paul McCartney", "John Lennon", "George Harrison", "Ringo Starr"],
    correctAnswer: 1,
    category: "music",
    difficulty: "easy",
    explanation: "John Lennon wrote Imagine."
  },
  {
    id: "music-16",
    text: "What is the tempo marking for very slow music?",
    options: ["Allegro", "Andante", "Largo", "Presto"],
    correctAnswer: 2,
    category: "music",
    difficulty: "hard",
    explanation: "Largo is the tempo marking for very slow music."
  },
  {
    id: "music-17",
    text: "Which band performed 'Stairway to Heaven'?",
    options: ["The Beatles", "Led Zeppelin", "Pink Floyd", "The Who"],
    correctAnswer: 1,
    category: "music",
    difficulty: "easy",
    explanation: "Stairway to Heaven was performed by Led Zeppelin."
  },
  {
    id: "music-18",
    text: "Who is known as the 'Father of Country Music'?",
    options: ["Johnny Cash", "Jimmie Rodgers", "Hank Williams", "Willie Nelson"],
    correctAnswer: 1,
    category: "music",
    difficulty: "hard",
    explanation: "Jimmie Rodgers is known as the Father of Country Music."
  },
  {
    id: "music-19",
    text: "What does 'forte' mean in music?",
    options: ["Soft", "Loud", "Slow", "Fast"],
    correctAnswer: 1,
    category: "music",
    difficulty: "medium",
    explanation: "Forte means to play loudly."
  },
  {
    id: "music-20",
    text: "Who sang 'I Will Always Love You'?",
    options: ["Mariah Carey", "Whitney Houston", "Celine Dion", "Beyoncé"],
    correctAnswer: 1,
    category: "music",
    difficulty: "easy",
    explanation: "Whitney Houston sang I Will Always Love You."
  },
  {
    id: "music-21",
    text: "Which composer wrote 'The Four Seasons'?",
    options: ["Bach", "Vivaldi", "Handel", "Mozart"],
    correctAnswer: 1,
    category: "music",
    difficulty: "medium",
    explanation: "Vivaldi composed The Four Seasons."
  },
  {
    id: "music-22",
    text: "What is a 'gig' in music terms?",
    options: ["A mistake", "A live performance", "A recording session", "A rehearsal"],
    correctAnswer: 1,
    category: "music",
    difficulty: "easy",
    explanation: "A gig is a live musical performance."
  },
  {
    id: "music-23",
    text: "Who sang 'Shape of You'?",
    options: ["Justin Bieber", "Ed Sheeran", "Shawn Mendes", "Charlie Puth"],
    correctAnswer: 1,
    category: "music",
    difficulty: "easy",
    explanation: "Ed Sheeran sang Shape of You."
  },
  {
    id: "music-24",
    text: "Which instrument has four strings and is played with a bow?",
    options: ["Guitar", "Cello", "Violin", "Viola"],
    correctAnswer: 2,
    category: "music",
    difficulty: "easy",
    explanation: "The violin has four strings and is played with a bow."
  },
  {
    id: "music-25",
    text: "Who is known as 'The Voice'?",
    options: ["Adele", "Whitney Houston", "Mariah Carey", "Celine Dion"],
    correctAnswer: 1,
    category: "music",
    difficulty: "medium",
    explanation: "Whitney Houston was often called 'The Voice'."
  },
  {
    id: "music-26",
    text: "What genre is Bob Marley known for?",
    options: ["Hip Hop", "Reggae", "Ska", "Rock"],
    correctAnswer: 1,
    category: "music",
    difficulty: "easy",
    explanation: "Bob Marley is the king of reggae music."
  },
  {
    id: "music-27",
    text: "Which band performed 'Hotel California'?",
    options: ["The Eagles", "Fleetwood Mac", "Creedence Clearwater Revival", "The Doors"],
    correctAnswer: 0,
    category: "music",
    difficulty: "easy",
    explanation: "Hotel California was performed by The Eagles."
  },
  {
    id: "music-28",
    text: "What does 'piano' mean in music?",
    options: ["Loud", "Soft", "Fast", "Slow"],
    correctAnswer: 1,
    category: "music",
    difficulty: "medium",
    explanation: "Piano means to play softly."
  },
  {
    id: "music-29",
    text: "Who sang 'Bad Romance'?",
    options: ["Katy Perry", "Lady Gaga", "Rihanna", "Beyoncé"],
    correctAnswer: 1,
    category: "music",
    difficulty: "easy",
    explanation: "Lady Gaga sang Bad Romance."
  },
  {
    id: "music-30",
    text: "Which composer wrote 'Symphony No. 5'?",
    options: ["Mozart", "Bach", "Beethoven", "Haydn"],
    correctAnswer: 2,
    category: "music",
    difficulty: "easy",
    explanation: "Beethoven composed Symphony No. 5."
  }
];

export const getQuestionsByCategory = (category: OfflineQuestion["category"]): OfflineQuestion[] => {
  return offlineQuestions.filter(q => q.category === category);
};

export const getQuestionsByDifficulty = (difficulty: OfflineQuestion["difficulty"]): OfflineQuestion[] => {
  return offlineQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestions = (count: number, category?: OfflineQuestion["category"]): OfflineQuestion[] => {
  let questions = category ? getQuestionsByCategory(category) : [...offlineQuestions];
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const getDailyQuestions = (): OfflineQuestion[] => {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const pseudoRandom = (n: number) => {
    const x = Math.sin(seed + n) * 10000;
    return x - Math.floor(x);
  };
  
  const shuffled = [...offlineQuestions].sort((a, b) => pseudoRandom(a.id.length) - pseudoRandom(b.id.length));
  return shuffled.slice(0, 10);
};
