const mongoose = require("mongoose");
const Campsite = require("./models/campsite");

const url = "mongodb://localhost:27017/nucampsite";
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
});

connect.then(() => {
  console.log("Connected correctly to the server");
  Campsite.create({
    name: "React Lake Campground",
    description: "test",
  })
    .then((campsite) => {
      console.log(campsite);
      return Campsite.findByIdAndUpdate(
        campsite._id,
        {
          $set: { description: "Updated Test Document" },
        },
        {
          new: true,
        }
      );
    })
    .then((campsite) => {
      console.log(campsite);

      campsite.comments.push({
        rating: 5,
        text: "What a manificant view!",
        author: "Tinus Lorvaldes",
      });
      return campsite.save();
    })
    .then((campsites) => {
      console.log(campsites);
      return Campsite.description;
    })
    .then((campsite) => {
      console.log(campsite);
      return Campsite.deleteMany();
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
      mongoose.connection.close();
    });
});
