//George Chorny Irimina Even Periods 7-8 Feburary 3rd 

//With the API I created, there are various programs that communicate with eachother. First, I must use the command line to use node to 
//initiate the express web server. Once initiated, all thats left is to send the proper signals with another program, in this case POSTMAN.
// While one can use their browser to send an https GET request, postman can be used to send signals such as POST and PUT. Using POSTMAN, you 
// select the whichever signal you want. When the https request is sent, the call back function of the corresponding route is called and adjusts 
// the array as well as sends back a response

//From this project, I learned many things because before I was entirely unfamiliar with API's. Firstly, I learned what an API actually is.
//Next, I learned about the type of https requests that can be sent. I also found out that in order to sent requests such as PUT and POST, 
//a tool like POSTMAN can be used to vastly simplify the process. In addition, I also became more familiar with callback funcitons as well as
//the traversal of arrays.

//To further extend the project, css as well as html could be implemented to make it look more presentable and user friendly.
const express = require('express');
const app = express();
app.use(express.json());

const songs = [
    {
    id: 1,
    name: "Bohemian Rhapsody",
    genre: "Rock",
    year: 1975,
    month: 11
    },
    {
    id: 2,
    name: "Stairway to Heaven",
    genre: "Rock",
    year: 1971,
    month: 11
    },
    {
    id: 3,
    name: "Imagine",
    genre: "Folk Rock",
    year: 1971,
    month: 10
    },
    {
    id: 4,
    name: "Billie Jean",
    genre: "Pop",
    year: 1983,
    month: 3
    },
    {
    id: 5,
    name: "Smells Like Teen Spirit",
    genre: "Grunge",
    year: 1991,
    month: 9
    },
    {
    id: 6,
    name: "What's Going On",
    genre: "Soul",
    year: 1971,
    month: 5
    },
    {
    id: 7,
    name: "I Want to Hold Your Hand",
    genre: "Rock",
    year: 1964,
    month: 11
    },
    {
    id: 8,
    name: "Purple Haze",
    genre: "Psychedelic Rock",
    year: 1967,
    month: 3
    },
    {
    id: 9,
    name: "God Save the Queen",
    genre: "Punk Rock",
    year: 1977,
    month: 5
    },
    {
    id: 10,
    name: "Hey Jude",
    genre: "Rock",
    year: 1968,
    month: 8
    },
    {
    id: 11,
    name: "Yesterday",
    genre: "Folk Rock",
    year: 1965,
    month: 9
    },
    {
    id: 12,
    name: "Like a Rolling Stone",
    genre: "Folk Rock",
    year: 1965,
    month: 7
    },
    {
    id: 13,
    name: "Good Vibrations",
    genre: "Pop Rock",
    year: 1966,
    month: 10
    },
    {
    id: 14,
    name: "What'd I Say",
    genre: "Rhythm and Blues",
    year: 1959,
    month: 12
    },
    {
    id: 15,
    name: "Let It Be",
    genre: "Rock",
    year: 1970,
    month: 3
    },
    {
    id: 16,
    name: "Be My Baby",
    genre: "Pop",
    year: 1963,
    month: 8
    },
    {
    id: 17,
    name: "Sweet Child O' Mine",
    genre: "Hard Rock",
    year: 1987,
    month: 7
    },
    {
    id: 18,
    name: "Yesterday Once More",
    genre: "Pop",
    year: 1973,
    month: 9
    },
    {
    id: 19,
    name: "Beat It",
    genre: "Dance-Rock",
    year: 1982,
    month: 2
    }
];

app.get('/', (req, res)=>
{
    res.send("Welcome To My Music App!!!");
});

app.get('/songs',(req,res)=>
{
    res.send(songs);
});

//the route that allows for a search of a song by its id
app.get('/songs/number/:id',(req,res)=>
{
    const song = songs.find(c=> c.id === parseInt(req.params.id));
    if(!song)
    {
        res.status(404).send("The Song With The Given ID Was Not Found");
        return
    }

        res.send(song);
})

//the route that allows for a search of a song by its name
app.get('/songs/sname/:name',(req,res)=>
{
    const song = songs.find(c=> c.name === req.params.name);
    if(!song)
    {
        res.status(404).send("The Song With The Given Name Was Not Found");
        return
    }

        res.send(song);
});

//the route that returns the date year and month of a song based on its name
app.get('/songs/date/:name', (req,res)=>
{
    const date = songs.find(c =>c.name === req.params.name);
    if(!date)
    {
        res.status(404).send("The Song With The Given Name Was Not Found");
        return;
    } 

    let str = ("Year Of Song: " + date.year + " Month of Song: "+ date.month);
    res.send(str);
});

//https post route
app.post('/songs',(req,res)=>
{
    const song = 
    {
        id: songs.length+1,
        name: req.body.name,
        genre: req.body.genre,
        year: req.body.year,
        month: req.body.month
    };
    if(req.body.name.length<=2 || req.body.name.length>=30)
    {
        res.status(404).send("NAME MUST BE GREATER THAN OR EQUAL TO TWO CHARACTERS AND LESS THAN OR EQUAL TO THIRTY");
        return;
    }
    songs.push(song);
    res.send(song);
});

//https put route
app.put('/songs/change/:name',(req,res)=>
{
    const song = songs.find(c => c.name === req.params.name);
    if(!song) 
    {
        res.status(404).send('The Song With The Given Name Was Not Found');
        return;
    }

    if(req.body.name.length<=2 || req.body.name.length>=30)
    {
        res.status(404).send("NAME MUST BE GREATER THAN OR EQUAL TO TWO CHARACTERS AND LESS THAN OR EQUAL TO THIRTY");
        return;
    }

    song.name  = req.body.name;
    song.genre = req.body.genre;
    song.year = req.body.year;
    song.month = req.body.month;
    res.send(song)
    
    
})

//https delete route
app.delete('/api/delete/:id',(req,res)=>
{
    const song = songs.find(c => c.id === parseInt(req.params.id));
    if(!song)
    {
        res.status(404).send("The Song With The Given ID Was Not Found");
        return;
    }

    const idx = songs.indexOf(song);
    songs.splice(idx,1);
    res.send(song);
})



app.listen(3000, ()=>
{
    console.log("Listening on port 3000 ...");
});
