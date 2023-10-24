import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios'



const PORT = 5000
const app = express();
app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3001']
    })
)
app.get('/api/events', async (req: Request, res: Response) => {
    try {
      // Make a GET request to the API URL
      const response = await axios.get('https://teclead-ventures.github.io/data/london-events.json'); // Replace with your API URL
  
      // Send the API response as JSON
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data from the API' });
    }
  });
app.get('/api/event/:_id', async (req, res) => {
    
    const response = await axios.get('https://teclead-ventures.github.io/data/london-events.json'); // Replace with your API URL
    //console.log(response.data)   
    const {_id} = req.params;
    //const eventId = parseInt(req.params.id); // Parse the ID from the URL
    //console.log(eventId)
     const event = response.data.find( item => item._id === _id); // Find the object by ID
  console.log(event)
    if (event) { return   res.json(event); }
      // Object not found
      else return res.status(404).json({ message: 'Object not found' });
    
  
    // Object found, return it as JSON
  });
  
// app.get('/api/events/:title', (req: Request, res: Response) => {
//       const {title} = req.params
//       const data = res.json("https://teclead-ventures.github.io/data/london-events.json").

//        const event = [...res.json('https://teclead-ventures.github.io/data/london-events.json')].find((event) => event.title === title)
//        console.log(event)
//        res.status(200).json(event)})

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})