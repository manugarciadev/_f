import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import UserSidebar from "./scenes/global/UserSidebar";
import Salesboard from "./scenes/salesboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
// >>> Pick type of product Import
import ProductsDock from "./scenes/products_dock/index";
// >>> Create Package Import
import CreateTour from "./scenes/tour_form/index";
import ProductsList from "./scenes/products_list/index";
import RequestTable from "./scenes/request_table/index";
import CancellationPolicySettings from "./scenes/cancellation_policy_set/index";
// >>> Users Imports
import Users from "./scenes/users/index";
// >>> Settings Imports
import Settings from "./scenes/_settings/index";
import AgeRange from "./scenes/age_range_set/index";
import WhatToBring from "./scenes/what_to_bring_set/index";
import Class from "./scenes/classes_set/index";
import Rate from "./scenes/rate/index";
import UserHome from "./scenes/user_land_page/index";
// >>> Create Product Imports
import CreateProductAccomodation from "./scenes/product_form_accomodation_v2/index";
import CreateProductAttraction from "./scenes/product_form_day_tour_attraction_test/index";
import CreateProductMeal from "./scenes/product_form_meal_test/index";
import CreateProductDayTourActivity from "./scenes/product_form_day_tour_activity/index";
import CreateProductEvent from "./scenes/product_form_event_test/index";
import CreateProductMultiDayTour from "./scenes/product_form_multi_day_tour/index";
import CreateProductRental from "./scenes/product_form_rental/index";
import CreateProductTicket from "./scenes/product_form_ticket_test/index";
import CreateProductTransportation from "./scenes/product_form_transportation_test/index";
import CreateProductVisa from "./scenes/product_form_visa_test/index";
import Login from "./scenes/login_form/index";
import Pdf from "./scenes/pdf/index";
import RequestBoard from './scenes/request_board/index';
import LocalStorage from './scenes/localStorageData/index';
import Price from './scenes/pricing/index';
import TaskList from './scenes/task_list/index';
import DailyDeparture from './scenes/daily_departure/index';
import PackageBoard from './scenes/package_board_test/index';
import InclusionSettings from './scenes/inclusions_set/index';
import ExclusionSettings from './scenes/exclusions_set/index';
import LocationSettings from './scenes/locations_set/index';
import CategorySettings from './scenes/categories_set/index';
import PickUpSetting from './scenes/pickup/index';
import AccomodationSetting from './scenes/accomodation_set/index';
import DropOffSetting from './scenes/dropoff/index';
import ThemeSettings from './scenes/themes_set/index';
import PartnerSettings from './scenes/partners_set/index';
import SalesboardEdit from "./scenes/salesboard_edit/index";
import RentalTest from "./scenes/product_form_rental_v2/index";
import Resource from "./scenes/resources_/index";
import ProductDetails from "./scenes/activity_details/index";






function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [userData, setUserData] = useState(null);

  const [role, setRole] = useState('admin');
  
  
  
  const isLoginPage = () => window.location.pathname === "/";
 
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* Renderiza o UserSidebar se o role for "user", caso contrário, renderiza o Sidebar padrão */}
          {!isLoginPage()  && (role === "user" ? <UserSidebar /> : <Sidebar isSidebar={isSidebar} />)}
          <main className="content">
            {/* Renderiza o Topbar, exceto na página de login */}
            {!isLoginPage()  && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
            <Route path="/" element={<Login />} /> 
              <Route path="/salesboard" element={<Salesboard />} />
              <Route path="/salesboard/_edit" element={<SalesboardEdit />} />
              <Route path="/home" element={<UserHome />} />
              <Route path="/request-board" element={<RequestBoard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/choose-type-product" element={<ProductsDock />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/create-tour" element={<CreateTour />} />
              <Route path="/users" element={<Users />} />
              <Route path="/pdf" element={<Pdf />} />
              <Route path="/local" element={<LocalStorage />} />
              <Route path="/price" element={<Price />} />
              <Route path="/to-do-list" element={<TaskList />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/cancellation-policy" element={<CancellationPolicySettings />} />
              <Route path="/settings/inclusions" element={<InclusionSettings />} />
              <Route path="/settings/exclusions" element={<ExclusionSettings />} />
              <Route path="/settings/locations" element={<LocationSettings />} />
              <Route path="/settings/partners" element={<PartnerSettings />} />
              <Route path="/settings/categories" element={<CategorySettings />} />
              <Route path="/settings/classes" element={<Class />} />
              <Route path="/settings/what-to-bring" element={<WhatToBring />} />
              <Route path="/settings/pick-up-places" element={<PickUpSetting />} />
              <Route path="/settings/accomodation-types" element={<AccomodationSetting />} />
              <Route path="/settings/drop-off-places" element={<DropOffSetting />} />
              <Route path="/settings/themes" element={<ThemeSettings />} />
              <Route path="/settings/age-ranges" element={<AgeRange />} />
              <Route path="/daily-departure" element={<DailyDeparture />} />
              <Route path="/package-board" element={<PackageBoard />} />
              <Route path="/request-table" element={<RequestTable />} />
              <Route path="/create-rate" element={<Rate />} />
              <Route path="/create-product-accomodation" element={<CreateProductAccomodation />} />
              <Route path="/create-product-meal" element={<CreateProductMeal />} />
              <Route path="/create-product-attraction" element={<CreateProductAttraction />} />
              <Route path="/create-product-day-tour-activity" element={<CreateProductDayTourActivity />} />
              <Route path="/create-product-event" element={<CreateProductEvent />} />
              <Route path="/create-product-multi-day-tour" element={<CreateProductMultiDayTour />} />
              <Route path="/create-product-rental" element={<CreateProductRental />} />
              <Route path="/create-product-ticket" element={<CreateProductTicket />} />
              <Route path="/create-product-transportation" element={<CreateProductTransportation />} />
              <Route path="/create-product-visa" element={<CreateProductVisa />} />
              <Route path="/cp" element={<RentalTest />} />
              <Route path="/resource" element={<Resource/>} />
              <Route path="/product-details" element={<ProductDetails/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

