import LoginPage from "./login.page";
import HomePage from "./home.page";
import LogoutPage from "./logout.page";
import MyAccountPage from "./myAccount.page";
import ForgottenPasswordPage from "./forgottenPassword.page";
import ProductDetailsPage from "./productDetails.page";
import RegistrationPage from "./registration.page";
import ResultsPage from "./results.page";
import { Faker } from "@faker-js/faker";

const loginPage = new LoginPage();
const homePage = new HomePage();
const logoutPage = new LogoutPage();
const myAccountPage = new MyAccountPage();
const forgottenPasswordPage = new ForgottenPasswordPage();
const productDetailsPage = new ProductDetailsPage();
const registrationPage = new RegistrationPage();
const resultsPage = new ResultsPage();

export {
    loginPage,
    homePage,
    logoutPage,
    myAccountPage,
    forgottenPasswordPage,
    productDetailsPage,
    registrationPage,
    resultsPage
}