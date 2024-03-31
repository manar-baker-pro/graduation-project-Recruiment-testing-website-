import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/signtureCom/components/signIn/signIn";
import Register from "./component/signtureCom/components/signUp/signUp";
import WELCOMEPAGE from "./component/signtureCom/components/signUp/welcomePage";
import COMPANYSIGHNUP from "./component/signtureCom/components/signUp/compSignUp";
import FOOTERPRIVACY from "./component/Footer/components/footerPrivcy";
import COMPANYHOMEPAGE from "./component/CompanyDash/components/homePage/companyHomePage";
import SURVEYMAIN from "./component/CompanyDash/components/CreateSurvey/surveyMain";
import "./App.css";
import CONFIRM from "./component/signtureCom/components/signUp/confirmPage";
import LandingPage from "./component/landingPage/components/landingPage";
import About from "./component/landingPage/components/About";
import {
  AuthorizeRoute,
  RequireAuth,
} from "./setup/protectedRoutes/authrizeComp";
import {
  ApiEnum,
  ComponentName,
} from "./setup/protectedRoutes/authorize.interfaces";
import USEERDASH from "./component/userDash/components/userDash";
import { READONLINESURVEYS } from "./component/CompanyDash/components/readSurveys/readSurvey";
import COMPNOTACTIVE from "./component/adminDash/components/mangeCompanies/compNotActiv";
import ADMINDASHMAIN from "./component/adminDash/adminDashMain";
import CompanyDashMain from "./component/CompanyDash/components/CompanyDashMain";
import COMPANYPROFILE from "./component/CompanyDash/components/companyprofile/companyProfile";
import { ManageTechnologiesMain } from "./component/adminDash/components/mangeTechnologies/manageTechnologiesMain";
import NotFound from "./setup/globalConfig/NotFound";
import ManageSkillTestsMain from "./component/adminDash/components/manageSkillTests/manageSkillTestMain";
import MatchedSurveyMain from "./component/userDash/components/matchedSurveys/matchedSurveyMain";
import SurveyView from "./component/userDash/components/SurveyView/surveyView";
import SurveyDetails from "./component/CompanyDash/components/readSurveys/surveyDetails";
import EditSurvey from "./component/CompanyDash/components/updateSurvey/editSurvey";
import {CreateTest} from "./component/adminDash/components/manageSkillTests/createTest";
import DisplayTest from "./component/userDash/components/displayTest/displayTest";
import AddNewUserExperience from "./component/userDash/components/displayTest/addNewUsrExperience";
import { HOMPAGE } from "./component/adminDash/components/HomeDash/homePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="welcome" element={<WELCOMEPAGE />} />
          <Route path="register" element={<Register />} />
          <Route path="confirm" element={<CONFIRM />} />
          <Route path="registerComp" element={<COMPANYSIGHNUP />} />
        </Route>

        <Route
          path="/companyDash"
          element={
            // <AuthorizeRoute
            //   componentNa={ComponentName.adminDash}
            //   callVerb={ApiEnum.GET}
            // >
              <CompanyDashMain />
            // </AuthorizeRoute>
          }
        >
          <Route
            path="homePage"
            element={
              <AuthorizeRoute
                componentNa={ComponentName.CompanyDash}
                callVerb={ApiEnum.GET}
              >
                <COMPANYHOMEPAGE />
              </AuthorizeRoute>
            }
          />
          <Route path="readSurveys" element={<READONLINESURVEYS />} />
          <Route path="createSurvey/:id" element={<SURVEYMAIN />} />
          <Route path="surveyDetails/:id" element={<SurveyDetails />} />
          <Route path="editSurvey/:id" element={<EditSurvey />} />
          <Route path="profile" element={<COMPANYPROFILE />} />
        </Route>
        <Route
          path="/userDash"
          element={
            <RequireAuth
            // componentNa={ComponentName.CompanyDash}
            // callVerb={ApiEnum.GET}
            >
              <USEERDASH />
            </RequireAuth>
          }
        >
          <Route
            path="homePage"
            element={
              <RequireAuth
              // componentNa={ComponentName.userDash}
              // callVerb={ApiEnum.GET}
              >
                <MatchedSurveyMain />
              </RequireAuth>
            }
          />
          <Route
            path="surveyResponse/:id"
            element={
              <RequireAuth
              // componentNa={ComponentName.userDash}
              // callVerb={ApiEnum.GET}
              >
                <SurveyView />
              </RequireAuth>
            }
          />
          <Route
            path="displayTest"
            element={
              // <AuthorizeRoute
              //   componentNa={ComponentName.adminDash}
              //   callVerb={ApiEnum.GET}
              // >
                <DisplayTest/>
             // </AuthorizeRoute> 
            }
          />
          <Route
            path="addNewExperience"
            element={
              // <AuthorizeRoute
              //   componentNa={ComponentName.adminDash}
              //   callVerb={ApiEnum.GET}
              // >
                <AddNewUserExperience/>
             // </AuthorizeRoute> 
            }
          />
        </Route>

        <Route
          path="/adminDash"
          element={
            <AuthorizeRoute
              componentNa={ComponentName.adminDash}
              callVerb={ApiEnum.GET}
            >
              <ADMINDASHMAIN />
            </AuthorizeRoute>
          }
        >
          <Route
            path="homepage"
            element={
              <AuthorizeRoute
                componentNa={ComponentName.adminDash}
                callVerb={ApiEnum.GET}
              >
                <HOMPAGE />
              </AuthorizeRoute>
            }
          />
          <Route
            path="getCompaniesNotActive"
            element={
              <AuthorizeRoute
                componentNa={ComponentName.adminDash}
                callVerb={ApiEnum.GET}
              >
                <COMPNOTACTIVE />
              </AuthorizeRoute>
            }
          />
          <Route
            path="manageTechnologies"
            element={
              <AuthorizeRoute
                componentNa={ComponentName.adminDash}
                callVerb={ApiEnum.GET}
              >
                <ManageTechnologiesMain />
              </AuthorizeRoute>
            }
          />
          <Route
            path="manageSkillTest"
            element={
              // <AuthorizeRoute
              //   componentNa={ComponentName.adminDash}
              //   callVerb={ApiEnum.GET}
              // >
                <ManageSkillTestsMain />
              // </AuthorizeRoute>
            }
            
          />
            <Route
              path="manageSkillTest/creatTest"
              element={
                <CreateTest />
              }
              //   <AuthorizeRoute
              //     componentNa={ComponentName.adminDash}
              //     // callVerb={ApiEnum.GET}
              //   >
                // {/* </AuthorizeRoute> */}
            />
          
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <FOOTERPRIVACY />
    </BrowserRouter>
  );
}
export default App;
