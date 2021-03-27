const Express = require("express");
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
const EmployeeSchema = require("./employees/schema");

var app = Express();


Mongoose.connect("mongodb://localhost:27017/nominydb", { useNewUrlParser: true, useCreateIndex: true});


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));



app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const EmployeeModel = Mongoose.model("employees", EmployeeSchema);

app.post("/employees", async (request, response, next) => {
    try {
        var employee = new EmployeeModel(request.body);
        var result = await employee.save();
        response.send(result);
    } catch (error) {
        console.log(error);
        response.status(500).send(error.errors);
    }
});

app.get("/employees", async (request, response, next) => {
    try {
        var employees = await EmployeeModel.find().exec();
        response.send(employees);
    } catch (error) {
        response.status(500).send("Error");
    }
});

app.get("/employees/:id", async (request, response, next) => {
    try {
        console.log(request.params.id);
        var employee = await EmployeeModel.findById(request.params.id).exec();
        response.send(employee);
    } catch (error) {
        response.status(500).send("Error");
    }
});

app.put("/employees/:id", async (request, response, next) => {
    try {
        var employee = await EmployeeModel.findById(request.params.id).exec();
        employee.set(request.body);
        var result = await employee.save();
        response.send(result);
    } catch (error) {
        response.status(500).send("Error");
    }
});

app.listen(3000, () => {
    console.log("All nice and warm in port 3000");
});

