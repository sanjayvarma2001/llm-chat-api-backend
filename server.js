const { error } = require('console');
const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();

app.post('/chat', async (req,res) => {
    console.log('BODY =>', req.body);

  // Temporary debug
  return res.status(200).json({
    debug: true,
    body: req.body,
    contentType: req.headers['content-type']
  });
    try{
        const {chat} = req.body;
        if (!chat){
            return res.status(400).json({error: "Required Chat Input"});
        }

        const apiRes = await fetch("https://api.perplexity.ai/chat/completions", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${process.env.PPLX_API_KEY}`
            },
            body: JSON.stringify({
                model: "sonar-pro" ,
                messages: [
                    {role: "user",content: chat}
                ]
            })
        });

        if (!apiRes.ok){
            const errBody = await apiRes.json();
            console.error("Perplexity API error:", apiRes.status, errBody);
            return res.status(502).json({error: "LLM provider error"});
        }

        const data = await apiRes.json();
        const answer = data.choices?.[0]?.message.content || "";
        return res.json({response : answer});
    }catch (err){
        console.error("LLM Error",err);
        return res.status(500).json({error :"LLM response error"});
    }
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - Status: ${res.statusCode}`);
    next();
});

app.get('/', (req,res) => {
    console.log("GET/ HIT")
    res.status(200).json("It's working")
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
});