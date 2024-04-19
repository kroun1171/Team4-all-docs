const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000;
require('dotenv').config()
//console.log(process.env.DB_USER)
//console.log(process.env.DB_PASS)

//middleware here
app.use(express.json());
app.use(cors())

//user bhupathikrounchi
// pass BWYJqiWpHZjmqMEY


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@job-portal-mern.ni7fruk.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-mern`;
//const uri= `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@job-portal-mern.ni7fruk.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-mern`
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const uri=`mongodb+srv://bhupathinannu:b6rrZH5kqj7creXy@job-portal-demo.r4lfifq.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-demo`
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // create db
        const db = client.db("Jobportalmern");
        const jobsCollection = db.collection("jobsdemo");

        //post jobs
        app.post("/post-jobs", async (req, res) => {
            const body = req.body;
            body.createdAt = new Date();
            // console.log(body);
            const result = await jobsCollection.insertOne(body);
            if (result?.insertedId) {
                return res.status(200).send(result);
            } else {
                return res.status(404).send({
                    message: "can not insert try again leter",
                    status: false,
                });
            }
        });

        // get all jobs 
        app.get("/all-jobs", async (req, res) => {
            const jobs = await jobsCollection
                .find({})
                .toArray();
            res.send(jobs);
        });

        // get single job using id
        app.get("/all-jobs/:id", async (req, res) => {
            // console.log(req.params.id);
            const jobs = await jobsCollection.findOne({
                _id: new ObjectId(req.params.id),
            });
            res.send(jobs);
        });

        app.get("/myJobs/:email", async (req, res) => {
            //console.log(req.params.email);
            const jobs = await jobsCollection
                .find({
                    postedBy: req.params.email,
                })
                .toArray();
            res.send(jobs);
        });

        // delete a job
        app.delete("/job/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await jobsCollection.deleteOne(filter);
            res.send(result);
        })

        // updata a job
        app.patch("/update-job/:id", async (req, res) => {
            const id = req.params.id;
            const jobData = req.body;
            // console.log(body);
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    ...jobData
                },
            };
            const options = { upsert: true };
            const result = await jobsCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello kroun!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})