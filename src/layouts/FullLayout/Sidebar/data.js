import AspectRatioOutlinedIcon from "@mui/icons-material/AspectRatioOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AdUnitsOutlinedIcon from '@mui/icons-material/AdUnitsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const Menuitems = [
  {
    title: 'Dashboard',
    icon: DashboardOutlinedIcon,
    href: '/dashboard',
  },

  {
    title: 'Reading',
    icon: AdUnitsOutlinedIcon,
    href: '/Reading',
  },
  {
    title: 'User',
    icon: PeopleAltOutlinedIcon,
    href: '/user-details',
  },
  {
    title: 'Transactions',
    icon: ReceiptLongIcon,
    href: '/transaction',
  },

  // {
  //   title: 'Reports',
  //   icon: AspectRatioOutlinedIcon,
  //   subItems: [
  //     {
  //       title: 'Monthly Reports',
  //       href: '/monethly-report',
  //     },
  //     {
  //       title: 'User Reports',
  //       href: '/user-report',
  //     },
  //   ],
  // },

  // {
  //   title: 'Manage',
  //   icon: AspectRatioOutlinedIcon,
  //   subItems: [
  //     {
  //       title: 'Reading',
  //       href: '/Reading',
  //     },
  //     {
  //       title: 'User Details',
  //       href: '/user-details',
  //     },
  //   ],
  // },
];

export default Menuitems;
