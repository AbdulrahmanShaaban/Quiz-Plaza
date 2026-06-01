import type { Difficulty, QuestionTopic } from "../models/Question.js";

export interface StaticQuestion {
  text: string;
  options: [string, string, string, string];
  correctAnswer: 0 | 1 | 2 | 3;
  category: QuestionTopic;
  difficulty: Difficulty;
}

type QuestionSet = Record<Difficulty, StaticQuestion[]>;

function q(
  text: string,
  options: [string, string, string, string],
  correctAnswer: 0 | 1 | 2 | 3,
  category: QuestionTopic,
  difficulty: Difficulty
): StaticQuestion {
  return { text, options, correctAnswer, category, difficulty };
}

const sports: QuestionSet = {
  easy: [
    q("How many players are on a soccer team on the field?", ["9", "10", "11", "12"], 2, "sports", "easy"),
    q("Which sport uses a hoop and a round orange ball?", ["Tennis", "Basketball", "Golf", "Cricket"], 1, "sports", "easy"),
    q("In which sport do athletes swim in a pool?", ["Boxing", "Swimming", "Skiing", "Archery"], 1, "sports", "easy"),
    q("What color card means a player is sent off in soccer?", ["Yellow", "Blue", "Red", "Green"], 2, "sports", "easy"),
    q("Which country invented baseball?", ["Canada", "United States", "Japan", "Mexico"], 1, "sports", "easy"),
    q("How many rings are on the Olympic flag?", ["3", "4", "5", "6"], 2, "sports", "easy"),
    q("Which sport is played at Wimbledon?", ["Golf", "Tennis", "Rugby", "Cycling"], 1, "sports", "easy"),
    q("What do you hit in a game of golf?", ["Puck", "Shuttlecock", "Ball", "Dice"], 2, "sports", "easy"),
    q("Which sport includes a touchdown?", ["Soccer", "American football", "Volleyball", "Fencing"], 1, "sports", "easy"),
    q("How many bases are there in baseball?", ["3", "4", "5", "6"], 1, "sports", "easy"),
  ],
  medium: [
    q("Which country has won the most FIFA World Cups?", ["Germany", "Brazil", "Italy", "Argentina"], 1, "sports", "medium"),
    q("How long is a standard marathon?", ["26.2 miles", "20 miles", "30 miles", "24 miles"], 0, "sports", "medium"),
    q("Which tennis player has the most Grand Slam men's singles titles (Open Era)?", ["Federer", "Nadal", "Djokovic", "Sampras"], 2, "sports", "medium"),
    q("In basketball, how many points is a shot from behind the arc worth?", ["2", "3", "4", "1"], 1, "sports", "medium"),
    q("Which NFL team has the most Super Bowl wins?", ["Cowboys", "Patriots", "Steelers", "49ers"], 1, "sports", "medium"),
    q("What is the maximum break in snooker?", ["100", "147", "155", "120"], 1, "sports", "medium"),
    q("Which country hosted the 2016 Summer Olympics?", ["China", "UK", "Brazil", "Russia"], 2, "sports", "medium"),
    q("In cricket, how many balls are in one over?", ["4", "5", "6", "8"], 2, "sports", "medium"),
    q("Which boxer was known as 'The Greatest'?", ["Tyson", "Ali", "Foreman", "Lewis"], 1, "sports", "medium"),
    q("How many players start on court for one volleyball team?", ["5", "6", "7", "8"], 1, "sports", "medium"),
  ],
  hard: [
    q("Who holds the men's 100m world record as of classic record books (9.58s)?", ["Bolt", "Gatlin", "Powell", "Lewis"], 0, "sports", "hard"),
    q("Which year did rugby union turn professional?", ["1993", "1995", "1997", "1999"], 1, "sports", "hard"),
    q("Who won the Ballon d'Or in 2023?", ["Mbappé", "Haaland", "Messi", "De Bruyne"], 2, "sports", "hard"),
    q("What is a 'albatross' in golf?", ["Two under par", "Three under par", "One under par", "Hole in one"], 1, "sports", "hard"),
    q("Which chess player became world champion in 2023?", ["Carlsen", "Nepomniachtchi", "Ding Liren", "Firouzja"], 2, "sports", "hard"),
    q("In Formula 1, which constructor has the most constructors' championships?", ["McLaren", "Ferrari", "Mercedes", "Red Bull"], 1, "sports", "hard"),
    q("Which country won the first Cricket World Cup in 1975?", ["Australia", "West Indies", "India", "England"], 1, "sports", "hard"),
    q("What weight class did Floyd Mayweather Jr. most often fight at?", ["Lightweight", "Welterweight", "Middleweight", "Featherweight"], 1, "sports", "hard"),
    q("Who scored the 'Hand of God' goal in 1986?", ["Pelé", "Maradona", "Romário", "Batistuta"], 1, "sports", "hard"),
    q("Which cyclist has the most Tour de France wins?", ["Indurain", "Armstrong*", "Hinault", "Anquetil"], 3, "sports", "hard"),
  ],
};

const food: QuestionSet = {
  easy: [
    q("Which fruit is yellow and curved?", ["Apple", "Banana", "Grape", "Pear"], 1, "food", "easy"),
    q("What is the main ingredient in bread?", ["Rice", "Flour", "Corn", "Oats"], 1, "food", "easy"),
    q("Which drink is made from coffee beans?", ["Tea", "Coffee", "Juice", "Milk"], 1, "food", "easy"),
    q("Pizza originally comes from which country?", ["USA", "France", "Italy", "Greece"], 2, "food", "easy"),
    q("What vegetable do rabbits famously eat?", ["Potato", "Carrot", "Onion", "Pepper"], 1, "food", "easy"),
    q("Which nut is used to make peanut butter?", ["Almond", "Peanut", "Walnut", "Cashew"], 1, "food", "easy"),
    q("What is sushi traditionally wrapped in?", ["Lettuce", "Seaweed", "Rice paper", "Cabbage"], 1, "food", "easy"),
    q("Which dairy product is solid and often on burgers?", ["Yogurt", "Cheese", "Cream", "Butter"], 1, "food", "easy"),
    q("What do bees make?", ["Milk", "Honey", "Jam", "Syrup"], 1, "food", "easy"),
    q("Which fruit has a red inside and green outside?", ["Mango", "Watermelon", "Kiwi", "Plum"], 1, "food", "easy"),
  ],
  medium: [
    q("Which spice gives curry its yellow color?", ["Paprika", "Turmeric", "Cumin", "Nutmeg"], 1, "food", "medium"),
    q("What type of pasta is shaped like tubes?", ["Spaghetti", "Penne", "Farfalle", "Lasagna"], 1, "food", "medium"),
    q("Which country is famous for tacos and burritos?", ["Spain", "Mexico", "Peru", "Brazil"], 1, "food", "medium"),
    q("What is the primary ingredient in hummus?", ["Lentils", "Chickpeas", "Beans", "Peas"], 1, "food", "medium"),
    q("Which cheese is traditionally used in a Greek salad?", ["Cheddar", "Feta", "Brie", "Gouda"], 1, "food", "medium"),
    q("What grain is used to make traditional Japanese sake?", ["Wheat", "Barley", "Rice", "Corn"], 2, "food", "medium"),
    q("Which vitamin is abundant in citrus fruits?", ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"], 1, "food", "medium"),
    q("What is tofu made from?", ["Rice", "Soybeans", "Wheat", "Corn"], 1, "food", "medium"),
    q("Which dessert is made with egg whites and sugar?", ["Brownie", "Meringue", "Tiramisu", "Flan"], 1, "food", "medium"),
    q("What meat is used in traditional British fish and chips?", ["Salmon", "Cod", "Tuna", "Trout"], 1, "food", "medium"),
  ],
  hard: [
    q("Which molecule gives chili peppers their heat?", ["Capsaicin", "Menthol", "Quercetin", "Lycopene"], 0, "food", "hard"),
    q("What is the French mother sauce made from brown stock?", ["Béchamel", "Velouté", "Espagnole", "Hollandaise"], 2, "food", "hard"),
    q("Which country produces the most coffee by volume globally?", ["Colombia", "Vietnam", "Brazil", "Ethiopia"], 2, "food", "hard"),
    q("What is umami primarily associated with?", ["Sweetness", "Glutamates", "Acidity", "Bitterness"], 1, "food", "hard"),
    q("Which cheese has PDO protection and holes from bacteria?", ["Gouda", "Emmental", "Mozzarella", "Ricotta"], 1, "food", "hard"),
    q("What is the main alcohol in absinthe traditionally?", ["Rum", "Grain spirit", "Tequila", "Brandy"], 1, "food", "hard"),
    q("Which grain is used for traditional Italian polenta?", ["Wheat", "Corn", "Rye", "Millet"], 1, "food", "hard"),
    q("What technique cooks food slowly in vacuum-sealed bags?", ["Sautéing", "Sous vide", "Blanching", "Braising"], 1, "food", "hard"),
    q("Which amino acid is limiting in maize-based diets?", ["Lysine", "Tryptophan", "Methionine", "Histidine"], 0, "food", "hard"),
    q("What is the origin of croissants' layered technique linked to?", ["French lamination", "Austrian kipferl tradition", "Italian sfoglia", "Turkish börek"], 1, "food", "hard"),
  ],
};

const technology: QuestionSet = {
  easy: [
    q("What does 'WWW' stand for?", ["World Wide Web", "Wide Web World", "Web World Wide", "World Web Wide"], 0, "technology", "easy"),
    q("Which company makes the iPhone?", ["Samsung", "Apple", "Google", "Sony"], 1, "technology", "easy"),
    q("What do you use to click on a computer?", ["Keyboard", "Mouse", "Monitor", "Speaker"], 1, "technology", "easy"),
    q("Which device is used to print documents?", ["Scanner", "Printer", "Router", "Modem"], 1, "technology", "easy"),
    q("What does USB stand for?", ["Universal Serial Bus", "United System Board", "User Signal Base", "Unified Storage Block"], 0, "technology", "easy"),
    q("Which social network uses a blue bird logo?", ["Facebook", "Twitter/X", "Instagram", "TikTok"], 1, "technology", "easy"),
    q("What stores files in the cloud from Google?", ["iCloud", "Google Drive", "Dropbox", "OneDrive"], 1, "technology", "easy"),
    q("Which language is mainly used for web page structure?", ["Python", "HTML", "Java", "C++"], 1, "technology", "easy"),
    q("What does Wi-Fi allow?", ["Wired printing", "Wireless internet", "Bluetooth audio", "GPS tracking"], 1, "technology", "easy"),
    q("Which company created Windows?", ["Apple", "Microsoft", "IBM", "Intel"], 1, "technology", "easy"),
  ],
  medium: [
    q("What does CPU stand for?", ["Central Processing Unit", "Computer Personal Unit", "Core Program Utility", "Cached Processing Unit"], 0, "technology", "medium"),
    q("Which protocol secures websites with HTTPS?", ["FTP", "TLS/SSL", "SMTP", "SNMP"], 1, "technology", "medium"),
    q("What is the binary number for decimal 5?", ["101", "110", "100", "111"], 0, "technology", "medium"),
    q("Which company developed the Android OS?", ["Apple", "Google", "Nokia", "BlackBerry"], 1, "technology", "medium"),
    q("What does RAM do?", ["Permanent storage", "Temporary memory", "Graphics output", "Network routing"], 1, "technology", "medium"),
    q("Which year was the first iPhone released?", ["2005", "2007", "2009", "2010"], 1, "technology", "medium"),
    q("What is open-source software?", ["Paid only", "Publicly modifiable code", "Console exclusive", "Hardware locked"], 1, "technology", "medium"),
    q("Which port is commonly used for HTTPS?", ["21", "80", "443", "25"], 2, "technology", "medium"),
    q("What does GPU primarily accelerate?", ["Spreadsheets", "Graphics/rendering", "Email", "File compression"], 1, "technology", "medium"),
    q("Which company owns GitHub?", ["Google", "Microsoft", "Meta", "Amazon"], 1, "technology", "medium"),
  ],
  hard: [
    q("What algorithm does Bitcoin use for mining?", ["SHA-256", "MD5", "AES", "RSA"], 0, "technology", "hard"),
    q("Which layer of OSI handles IP addressing?", ["Data link", "Network", "Transport", "Session"], 1, "technology", "hard"),
    q("What is the time complexity of binary search?", ["O(n)", "O(log n)", "O(n²)", "O(1)"], 1, "technology", "hard"),
    q("Which transistor type is dominant in modern CPUs?", ["BJT", "MOSFET", "JFET", "Thyristor"], 1, "technology", "hard"),
    q("What does CAP theorem stand for in distributed systems?", ["Consistency, Availability, Partition tolerance", "Cache, API, Protocol", "Compute, Access, Privacy", "Cluster, Auth, Performance"], 0, "technology", "hard"),
    q("Which language introduced ownership for memory safety?", ["Go", "Rust", "Swift", "Kotlin"], 1, "technology", "hard"),
    q("What is the default subnet mask for a Class C network?", ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"], 2, "technology", "hard"),
    q("Which encryption is asymmetric?", ["AES", "RSA", "ChaCha20", "Blowfish"], 1, "technology", "hard"),
    q("What does NVMe improve over SATA SSDs?", ["Latency and parallelism", "Magnetic density", "Optical speed", "Analog bandwidth"], 0, "technology", "hard"),
    q("Which design pattern ensures a single instance?", ["Factory", "Singleton", "Observer", "Strategy"], 1, "technology", "hard"),
  ],
};

const movies: QuestionSet = {
  easy: [
    q("Who is the main character in Harry Potter?", ["Ron", "Harry", "Draco", "Neville"], 1, "movies", "easy"),
    q("Which movie features a talking snowman named Olaf?", ["Moana", "Frozen", "Tangled", "Brave"], 1, "movies", "easy"),
    q("What color is Shrek?", ["Blue", "Green", "Red", "Yellow"], 1, "movies", "easy"),
    q("Which superhero is known as the Dark Knight?", ["Superman", "Batman", "Spider-Man", "Iron Man"], 1, "movies", "easy"),
    q("In Finding Nemo, what type of fish is Nemo?", ["Shark", "Clownfish", "Dolphin", "Whale"], 1, "movies", "easy"),
    q("Which studio made Toy Story?", ["DreamWorks", "Pixar", "Blue Sky", "Illumination"], 1, "movies", "easy"),
    q("Who lives in a pineapple under the sea?", ["Patrick", "Squidward", "SpongeBob", "Mr. Krabs"], 2, "movies", "easy"),
    q("Which movie has the quote 'May the Force be with you'?", ["Star Trek", "Star Wars", "Dune", "Avatar"], 1, "movies", "easy"),
    q("What is the lion's name in The Lion King?", ["Scar", "Mufasa", "Simba", "Timon"], 2, "movies", "easy"),
    q("Which film features minions?", ["Shrek", "Despicable Me", "Madagascar", "Sing"], 1, "movies", "easy"),
  ],
  medium: [
    q("Who directed Inception?", ["Spielberg", "Nolan", "Scorsese", "Cameron"], 1, "movies", "medium"),
    q("Which film won Best Picture at the 2020 Oscars?", ["1917", "Parasite", "Joker", "Once Upon a Time"], 1, "movies", "medium"),
    q("What is the highest-grossing film worldwide (unadjusted)?", ["Avatar", "Endgame", "Titanic", "Force Awakens"], 0, "movies", "medium"),
    q("Who played Jack in Titanic?", ["Pitt", "DiCaprio", "Depp", "Cruise"], 1, "movies", "medium"),
    q("Which actor played Iron Man in the MCU?", ["Evans", "Downey Jr.", "Hemsworth", "Ruffalo"], 1, "movies", "medium"),
    q("What is the name of the ship in Alien?", ["Nostromo", "Enterprise", "Discovery", "Serenity"], 0, "movies", "medium"),
    q("Which film features the character Hannibal Lecter?", ["Se7en", "Silence of the Lambs", "Zodiac", "Prisoners"], 1, "movies", "medium"),
    q("Who composed the Jaws theme?", ["Williams", "Zimmer", "Morricone", "Herrmann"], 0, "movies", "medium"),
    q("Which movie is set on the planet Pandora?", ["Dune", "Avatar", "Arrival", "Gravity"], 1, "movies", "medium"),
    q("What year was The Matrix released?", ["1997", "1999", "2001", "2003"], 1, "movies", "medium"),
  ],
  hard: [
    q("Which cinematographer shot Blade Runner 2049?", ["Deakins", "Lubezki", "Pfister", "Richardson"], 0, "movies", "hard"),
    q("What was the first feature-length animated film?", ["Snow White", "Fantasia", "Pinocchio", "Bambi"], 0, "movies", "hard"),
    q("Who directed Stalker (1979)?", ["Tarkovsky", "Kurosawa", "Fellini", "Bergman"], 0, "movies", "hard"),
    q("Which film popularized the Wilhelm scream in modern cinema?", ["Star Wars", "Distant Drums", "Jaws", "Alien"], 1, "movies", "hard"),
    q("What technique did The Lord of the Rings use for scale?", ["CGI only", "Forced perspective & scale doubles", "Stop motion", "Rotoscoping"], 1, "movies", "hard"),
    q("Which editor won for Mad Max: Fury Road?", ["Schoonmaker", "Menke", "Kahn", "Mirrione"], 1, "movies", "hard"),
    q("In Citizen Kane, what is 'Rosebud'?", ["A sled", "A horse", "A house", "A painting"], 0, "movies", "hard"),
    q("Which studio distributed Parasite internationally?", ["A24", "Neon", "Focus", "Searchlight"], 1, "movies", "hard"),
    q("Who played the Joker in The Dark Knight?", ["Nicholson", "Ledger", "Phoenix", "Leto"], 1, "movies", "hard"),
    q("Which film used the 'bullet time' effect prominently?", ["Matrix", "Inception", "Speed", "Equilibrium"], 0, "movies", "hard"),
  ],
};

const geography: QuestionSet = {
  easy: [
    q("What is the capital of France?", ["Berlin", "Paris", "Madrid", "Rome"], 1, "geography", "easy"),
    q("Which is the largest ocean?", ["Atlantic", "Indian", "Pacific", "Arctic"], 2, "geography", "easy"),
    q("On which continent is Egypt?", ["Asia", "Africa", "Europe", "Australia"], 1, "geography", "easy"),
    q("What is the longest river in the world?", ["Amazon", "Nile", "Yangtze", "Mississippi"], 1, "geography", "easy"),
    q("Which country has the maple leaf on its flag?", ["USA", "Canada", "UK", "Australia"], 1, "geography", "easy"),
    q("What is the capital of Japan?", ["Seoul", "Tokyo", "Beijing", "Bangkok"], 1, "geography", "easy"),
    q("Which desert is the largest hot desert?", ["Gobi", "Sahara", "Kalahari", "Mojave"], 1, "geography", "easy"),
    q("How many continents are there?", ["5", "6", "7", "8"], 2, "geography", "easy"),
    q("Which country is shaped like a boot?", ["Spain", "Italy", "Greece", "Portugal"], 1, "geography", "easy"),
    q("What mountain range contains Mount Everest?", ["Alps", "Himalayas", "Andes", "Rockies"], 1, "geography", "easy"),
  ],
  medium: [
    q("What is the smallest country by area?", ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], 1, "geography", "medium"),
    q("Which river flows through Baghdad?", ["Nile", "Tigris", "Danube", "Indus"], 1, "geography", "medium"),
    q("What is the capital of Australia?", ["Sydney", "Melbourne", "Canberra", "Perth"], 2, "geography", "medium"),
    q("Which sea is the Dead Sea part of?", ["Mediterranean", "Red Sea rift", "Black Sea", "Caspian"], 1, "geography", "medium"),
    q("What country has the most time zones?", ["USA", "Russia", "France", "China"], 2, "geography", "medium"),
    q("Which African country was formerly Abyssinia?", ["Kenya", "Ethiopia", "Sudan", "Ghana"], 1, "geography", "medium"),
    q("What is the highest waterfall in the world?", ["Niagara", "Angel Falls", "Victoria", "Iguazu"], 1, "geography", "medium"),
    q("Which strait separates Europe and Africa at Gibraltar?", ["Bosporus", "Strait of Gibraltar", "Bering", "Malacca"], 1, "geography", "medium"),
    q("What is the largest country by land area?", ["Canada", "China", "USA", "Russia"], 3, "geography", "medium"),
    q("Which US state is the Grand Canyon in?", ["Utah", "Arizona", "Nevada", "Colorado"], 1, "geography", "medium"),
  ],
  hard: [
    q("What is the capital of Kazakhstan (moved in 1997)?", ["Almaty", "Astana", "Bishkek", "Tashkent"], 1, "geography", "hard"),
    q("Which tectonic plate is Japan primarily on?", ["Pacific & North American", "Eurasian only", "African", "Indo-Australian only"], 0, "geography", "hard"),
    q("What is the driest non-polar desert?", ["Atacama", "Sahara", "Gobi", "Namib"], 0, "geography", "hard"),
    q("Which country enclaves Lesotho?", ["Namibia", "South Africa", "Botswana", "Zimbabwe"], 1, "geography", "hard"),
    q("What is the mouth of the Amazon primarily?", ["Delta", "Estuary", "Lagoon", "Fjord"], 1, "geography", "hard"),
    q("Which line separates day and night on Earth?", ["Equator", "Terminator circle", "Tropic", "Prime meridian"], 1, "geography", "hard"),
    q("What is the second-longest river in Europe?", ["Rhine", "Danube", "Volga", "Dnieper"], 1, "geography", "hard"),
    q("Which country has shores on both Atlantic and Indian Oceans?", ["Angola", "South Africa", "Mozambique", "Namibia"], 1, "geography", "hard"),
    q("What is the largest lake by surface area?", ["Superior", "Caspian Sea", "Victoria", "Baikal"], 1, "geography", "hard"),
    q("Which capital is closest to the equator?", ["Quito", "Singapore", "Nairobi", "Bogotá"], 0, "geography", "hard"),
  ],
};

const music: QuestionSet = {
  easy: [
    q("How many strings does a standard guitar have?", ["4", "6", "8", "12"], 1, "music", "easy"),
    q("Which instrument has black and white keys?", ["Violin", "Piano", "Flute", "Drums"], 1, "music", "easy"),
    q("Who is known as the 'King of Pop'?", ["Elvis", "Michael Jackson", "Prince", "Madonna"], 1, "music", "easy"),
    q("Which band performed 'Bohemian Rhapsody'?", ["Beatles", "Queen", "ABBA", "U2"], 1, "music", "easy"),
    q("What do you call a group of musicians playing together?", ["Solo", "Band", "Audience", "Conductor"], 1, "music", "easy"),
    q("Which genre originated in Jamaica?", ["Country", "Reggae", "Blues", "Opera"], 1, "music", "easy"),
    q("What is the highest male singing voice?", ["Bass", "Tenor", "Alto", "Soprano"], 1, "music", "easy"),
    q("Which Disney movie features 'Let It Go'?", ["Moana", "Frozen", "Encanto", "Tangled"], 1, "music", "easy"),
    q("What instrument does a drummer play?", ["Guitar", "Drums", "Trumpet", "Cello"], 1, "music", "easy"),
    q("How many notes are in an octave (Western)?", ["6", "7", "8", "12"], 2, "music", "easy"),
  ],
  medium: [
    q("Who composed the 'Moonlight Sonata'?", ["Mozart", "Beethoven", "Bach", "Chopin"], 1, "music", "medium"),
    q("Which artist released the album '1989'?", ["Adele", "Taylor Swift", "Beyoncé", "Rihanna"], 1, "music", "medium"),
    q("What is the time signature of a waltz?", ["4/4", "3/4", "6/8", "2/4"], 1, "music", "medium"),
    q("Which genre is B.B. King associated with?", ["Jazz", "Blues", "Metal", "Classical"], 1, "music", "medium"),
    q("Who sang 'Shape of You'?", ["Ed Sheeran", "Justin Bieber", "Drake", "Bruno Mars"], 0, "music", "medium"),
    q("What is a group of four singers called?", ["Trio", "Quartet", "Quintet", "Duet"], 1, "music", "medium"),
    q("Which US city is most associated with country music?", ["Nashville", "Austin", "Memphis", "New Orleans"], 0, "music", "medium"),
    q("What instrument did Louis Armstrong play?", ["Saxophone", "Trumpet", "Piano", "Clarinet"], 1, "music", "medium"),
    q("Which K-pop group has 'Dynamite'?", ["BLACKPINK", "BTS", "EXO", "TWICE"], 1, "music", "medium"),
    q("What does 'forte' mean in music?", ["Soft", "Loud", "Fast", "Slow"], 1, "music", "medium"),
  ],
  hard: [
    q("Who composed 'The Four Seasons'?", ["Handel", "Vivaldi", "Haydn", "Telemann"], 1, "music", "hard"),
    q("What is the relative minor of C major?", ["A minor", "E minor", "D minor", "G minor"], 0, "music", "hard"),
    q("Which composer went deaf but continued composing?", ["Mozart", "Beethoven", "Schubert", "Brahms"], 1, "music", "hard"),
    q("What scale uses only half steps and whole steps in jazz?", ["Pentatonic", "Chromatic/dorian context", "Blues scale", "Whole tone"], 2, "music", "hard"),
    q("Who pioneered the 'wall of sound' production?", ["Phil Spector", "George Martin", "Brian Eno", "Rick Rubin"], 0, "music", "hard"),
    q("Which opera is by Puccini and set in Paris?", ["Carmen", "La Bohème", "Tosca", "Aida"], 1, "music", "hard"),
    q("What tuning is standard guitar (low to high)?", ["E A D G B E", "D G C F A D", "E B G D A E", "F B E A C F"], 0, "music", "hard"),
    q("Which interval is an octave plus a fifth?", ["Major sixth", "Twelfth", "Ninth", "Tritone"], 1, "music", "hard"),
    q("Who wrote 'Rhapsody in Blue'?", ["Copland", "Gershwin", "Bernstein", "Ives"], 1, "music", "hard"),
    q("What is the circle of fifths used for?", ["Rhythm", "Key relationships", "Dynamics", "Timbre"], 1, "music", "hard"),
  ],
};

/** Cross-topic questions for mixed rooms (stored with real topic in `category`). */
const mixed: QuestionSet = {
  easy: [
    q("Which planet is known as the Red Planet?", ["Venus", "Mars", "Jupiter", "Saturn"], 1, "technology", "easy"),
    q("Who painted the Mona Lisa?", ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"], 1, "movies", "easy"),
    q("What is the national sport of Canada (winter)?", ["Soccer", "Hockey", "Cricket", "Rugby"], 1, "sports", "easy"),
    q("Which spice comes from cinnamon bark?", ["Pepper", "Cinnamon", "Salt", "Ginger"], 1, "food", "easy"),
    q("What is the capital of Italy?", ["Milan", "Rome", "Venice", "Naples"], 1, "geography", "easy"),
    q("Which instrument has six strings and is strummed?", ["Violin", "Guitar", "Flute", "Harp"], 1, "music", "easy"),
    q("Who directed Jurassic Park?", ["Cameron", "Spielberg", "Scott", "Nolan"], 1, "movies", "easy"),
    q("What device connects your home to the internet?", ["Printer", "Router", "Mouse", "Scanner"], 1, "technology", "easy"),
    q("Which fruit is used to make wine?", ["Apple", "Grape", "Orange", "Banana"], 1, "food", "easy"),
    q("On which continent is Brazil?", ["Africa", "South America", "Asia", "Europe"], 1, "geography", "easy"),
  ],
  medium: [
    q("Who won the FIFA World Cup in 2018?", ["Germany", "France", "Brazil", "Argentina"], 1, "sports", "medium"),
    q("What is the chemical symbol for gold?", ["Go", "Gd", "Au", "Ag"], 2, "technology", "medium"),
    q("Which film features the character Tony Stark?", ["Batman", "Iron Man", "Thor", "Hulk"], 1, "movies", "medium"),
    q("What sea lies between Europe and Africa?", ["Red Sea", "Mediterranean", "Black Sea", "Caspian"], 1, "geography", "medium"),
    q("Who sang 'Rolling in the Deep'?", ["Adele", "Sia", "Dua Lipa", "Ariana Grande"], 0, "music", "medium"),
    q("Which pasta is ribbon-shaped?", ["Penne", "Fettuccine", "Orzo", "Ravioli"], 1, "food", "medium"),
    q("What does HTML stand for?", ["HyperText Markup Language", "High Transfer Mode Link", "Home Tool Markup Language", "Hyperlink Text Model"], 0, "technology", "medium"),
    q("Which country invented paper historically?", ["Egypt", "China", "Greece", "India"], 1, "geography", "medium"),
    q("Who composed the Four Seasons?", ["Bach", "Vivaldi", "Mozart", "Haydn"], 1, "music", "medium"),
    q("Which sport uses a puck?", ["Soccer", "Hockey", "Tennis", "Golf"], 1, "sports", "medium"),
  ],
  hard: [
    q("What is the deepest ocean trench?", ["Puerto Rico", "Mariana", "Java", "Tonga"], 1, "geography", "hard"),
    q("Who wrote '1984'?", ["Huxley", "Orwell", "Bradbury", "Asimov"], 1, "movies", "hard"),
    q("What protocol does email sending use?", ["HTTP", "SMTP", "FTP", "DNS"], 1, "technology", "hard"),
    q("Which enzyme breaks down starch?", ["Lipase", "Amylase", "Protease", "Lactase"], 1, "food", "hard"),
    q("Who holds the men's 100m Olympic record (9.63s)?", ["Gatlin", "Bolt", "Powell", "Greene"], 1, "sports", "hard"),
    q("What key has three sharps?", ["G major", "A major", "D major", "E major"], 1, "music", "hard"),
    q("Which director made Pulp Fiction?", ["Scorsese", "Tarantino", "Coen", "Fincher"], 1, "movies", "hard"),
    q("What is the largest internal organ?", ["Heart", "Liver", "Lung", "Brain"], 1, "food", "hard"),
    q("Which planet has the most moons (known)?", ["Jupiter", "Saturn", "Uranus", "Neptune"], 1, "technology", "hard"),
    q("What is the capital of New Zealand?", ["Auckland", "Wellington", "Christchurch", "Hamilton"], 1, "geography", "hard"),
  ],
};

function flattenSet(set: QuestionSet): StaticQuestion[] {
  return [...set.easy, ...set.medium, ...set.hard];
}

export const staticQuestions: StaticQuestion[] = [
  ...flattenSet(sports),
  ...flattenSet(food),
  ...flattenSet(technology),
  ...flattenSet(movies),
  ...flattenSet(geography),
  ...flattenSet(music),
  ...flattenSet(mixed),
];
