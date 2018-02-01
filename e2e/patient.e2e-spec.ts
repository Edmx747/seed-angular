import { LoginPage } from './login.po';
import { MainPage } from './main.po';
import { PatientListPage } from './patientlist.po';
import { PatientPage } from './patient.po';

describe('Seed Angular: Patient', () => {
	let login: LoginPage;
	let main: MainPage;
	let patientlist: PatientListPage;
	let patient: PatientPage;
	let initialNumOfRows = 0;


	beforeEach(() => {
		login = new LoginPage();
		main = new MainPage();
		patientlist = new PatientListPage();
		patient = new PatientPage();

		login.navigateToHomePage();
		login.getUsernameField().sendKeys('quentinada');
		login.getPasswordField().sendKeys('quentinada');
		login.getEnterButton().click();
		main.getPatientButton().click();
	});

	it('Should be possible to create a patient if all fields are correct', () => {

		patientlist.getNumberOfRows().then((value) => this.initialNumOfRows = value);

		patientlist.getAddButton().click();
		patient.getNameField().sendKeys('Alex');
		patient.getSurnameField().sendKeys('Johanson');
		const today= new Date();
		const timestamp = today.getFullYear() + '.' + today.getMonth() + '.' + today.getDate();
		patient.getEMailField().sendKeys('ajohanson' + timestamp + '@gmail.com');
		patient.getCreateButton().click();
		patientlist.getRefreshButton().click();
		expect(patientlist.getCellWithValue('ajohanson' + timestamp + '@gmail.com').isPresent());
	});

	it('Should have incremented the number of rows of the grid', () => {
		patientlist.getNumberOfRows().then((value) => expect(value === initialNumOfRows + 1));
	});

	it('Should display an error message when creating a patient with incorrect email', () => {
		patientlist.getAddButton().click();
		patient.getNameField().sendKeys('Alex');
		patient.getSurnameField().sendKeys('Johanson');
		patient.getEMailField().sendKeys('ajohanson 2.:43:/2@gmail.com');
		patient.getCreateButton().click();
		expect(patient.getErrorMessage().isPresent());
	});

});
