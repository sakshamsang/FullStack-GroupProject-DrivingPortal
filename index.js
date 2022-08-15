const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
var expressSession = require('express-session');

const createUserValidation = require("./middlewares/createUserValidation");
const loginValidation = require("./middlewares/loginValidation");
const updateUserValidation = require("./middlewares/updateUserValidation");
const AuthMiddleware = require("./middlewares/authValidation");
const AdminAuthValidation = require("./middlewares/adminAuthValidation");
const ExaminerAuthMiddleware = require("./middlewares/examinerAuthValidation");

const HomeController = require("./controllers/home");
const LoginController = require("./controllers/login");
const GPageController = require("./controllers/gPage");
const G2PageController = require("./controllers/g2Page");
const CreateUserController = require("./controllers/createUser");
const GetUserController = require("./controllers/getUser");
const UpdateUserController = require("./controllers/updateUser");
const LogOutController = require("./controllers/logout");
const AppointmentController = require("./controllers/appointmentView");
const AppointmentSaveController = require("./controllers/appointmentSave");
const FetchSlotsController = require("./controllers/fetchSlots");
const BookSlotController = require("./controllers/bookSlot");
const ExaminerController = require("./controllers/examiner");
const UpdateExaminerController = require("./controllers/updateExaminer");
const ReportController = require("./controllers/adminReport");

const app = express();
app.use(expressSession({
    secret: 'ksirimalla',
  }));

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/g2page', AuthMiddleware);
app.use('/gpage', AuthMiddleware);
app.use('/updateUser', AuthMiddleware);
app.use('/bookSlot', AuthMiddleware);
app.use('/fetchSlots', AuthMiddleware);
app.use('/appointment', AdminAuthValidation);
app.use('/appointmentSave', AdminAuthValidation);
app.use('/report', AdminAuthValidation);
app.use('/examiner', ExaminerAuthMiddleware);
app.use('/updateExaminer', ExaminerAuthMiddleware);


app.use('/createUser', createUserValidation);
app.use('/getUser', loginValidation);
app.use('/updateUser', updateUserValidation);

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

mongoose.connect('mongodb+srv://ksirimalla:Mongodb@cluster0.v4s3k.mongodb.net/?retryWrites=true&w=majority', { dbName: 'driveTest' });
mongoose.connection.on("connected", () => {
    console.log("Application is connected");
})

app.get('/', HomeController)
app.get('/login', LoginController)
app.get('/g2page', G2PageController)
app.get('/gpage', GPageController)
app.post('/createUser', CreateUserController)
app.post('/getUser', GetUserController);
app.post('/updateUser', UpdateUserController);
app.get('/logout', LogOutController);
app.get('/appointment', AppointmentController);
app.post('/appointment', AppointmentController)
app.post('/appointmentSave', AppointmentSaveController);
app.post('/fetchSlots', FetchSlotsController);
app.post('/bookSlot', BookSlotController);
app.get('/examiner', ExaminerController);
app.post('/updateExaminer', UpdateExaminerController);
app.get('/report', ReportController);