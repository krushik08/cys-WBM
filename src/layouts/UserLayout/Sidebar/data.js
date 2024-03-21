import AspectRatioOutlinedIcon from "@mui/icons-material/AspectRatioOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const Menuitems = [
  {
    title: 'Dashboard',
    icon: DashboardOutlinedIcon,
    href: '/u/dashboard',
  },

  {
    title: 'Billing',
    icon: DescriptionOutlinedIcon,
    href: '/u/billing',
  },

  {
    title: 'Personal Details',
    icon: PersonOutlineOutlinedIcon,
    href: 'u/personal-details',
  },

  // {
  //   title: "Setting",
  //   icon: AspectRatioOutlinedIcon,
  //   subItems: [
  //     {
  //       title: "Personal Details",
  //       href: "u/personal-details",
  //     },
  //   ],
  // },
];

export default Menuitems;
