import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import icon from "./img/icon.png";
import Divider from '@mui/material/Divider';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AddIcon from '@mui/icons-material/Add';
import ApiIcon from '@mui/icons-material/Api';
import BallotIcon from '@mui/icons-material/Ballot';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ReorderIcon from '@mui/icons-material/Reorder';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    const handleScroll = () => {
      const sidebar = document.querySelector('.fixed-sidebar');
      if (sidebar) {
        const top = window.scrollY;
        if (top > 0) {
          sidebar.classList.add('scrolled');
        } else {
          sidebar.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        height: "122%"
      }}
      className="fixed-sidebar"
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
                height="100%"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  <img src={icon} alt="Icon-Bu-Country-Tours" style={{width:'170px', height:'auto'}}/>
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Divider variant="middle" />

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Typography
              variant="h6"
              color={colors.greenAccent[400]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Sales
            </Typography>

            <Item
              title="Create Package"
              to="/create-tour"
              icon={<AddIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Request Manager"
              to="/request-board"
              icon={<BallotIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarMonthIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Booking Desk"
              to="/--"
              icon={<DomainVerificationIcon />}
              selected={selected}
              setSelected={setSelected}
            />
               <Item
              title="Tasks List"
              to="/to-do-list"
              icon={<ChecklistIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Daily Departures"
              to="/daily-departure"
              icon={<FlightTakeoffIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Monthly Overview"
              to="/--"
              icon={<ReviewsIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider variant="middle" />

            <Typography
              variant="h6"
              color={colors.greenAccent[400]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Prod
            </Typography>
            <Item
              title="Create New Product"
              to="/choose-type-product"
              icon={<AddIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Products"
              to="/products"
              icon={<LocalGroceryStoreIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create Special Offers"
              to="/--"
              icon={<ApiIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider variant="middle" />

            <Typography
              variant="h6"
              color={colors.greenAccent[400]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Sys
            </Typography>
            <Item
              title="Users"
              to="/users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Resources"
              to="/resource"
              icon={<WorkOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="Logs"
              to="/--"
              icon={<ReorderIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Faq"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
          
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
