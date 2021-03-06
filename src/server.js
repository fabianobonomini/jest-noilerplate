const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get(`/fake-html`, async (req, res) => {
    let markup = `<html>
        <body>
            <img src="https://www.ansa.it/webimages/ch_620x438/2021/12/1/987691de422940f8438f00801b69438f.jpg" />
            <form id="fake-form" method="POST" action="/fake-post">
                <input name="fake-input" id="fake-input" value="Test Default">
                <button id="send-button">Send</button>
            </form>
        </body>
    </html>`;
    res.send(markup);
});

app.post(`/fake-post`, async (req, res) => {
    console.log(`/fake-post - Received POST Call - ${JSON.stringify(req.body)}`);    
    res.json({
        data:req.body
    });
});


const port = 8080;
const server = app.listen(port, () => console.log(`Server listening on port ${port}`));