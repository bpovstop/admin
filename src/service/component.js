import {
  Alert,
  Aside,
  Autocomplete,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Card,
  Carousel,
  CarouselItem,
  Cascader,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  ColorPicker,
  Container,
  DatePicker,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Footer,
  Form,
  FormItem,
  Header,
  Icon,
  Input,
  InputNumber,
  Loading,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  Message,
  MessageBox,
  Notification,
  Option,
  OptionGroup,
  Pagination,
  Popover,
  Progress,
  Radio,
  RadioButton,
  RadioGroup,
  Rate,
  Row,
  Select,
  Slider,
  Step,
  Steps,
  Submenu,
  Switch,
  TabPane,
  Table,
  TableColumn,
  Tabs,
  Tag,
  TimePicker,
  TimeSelect,
  Tooltip,
  Transfer,
  Tree,
  Upload,
} from "element-ui";

export default function componentService(vue) {
  vue.component("el-menu", Menu);
  vue.component("el-submenu", Submenu);
  vue.component("el-menu-item", MenuItem);
  vue.component("el-menu-item-group", MenuItemGroup);
  vue.component("el-switch", Switch);
  vue.component("el-dropdown", Dropdown);
  vue.component("el-dropdown-menu", DropdownMenu);
  vue.component("el-dropdown-item", DropdownItem);
  vue.component("el-tooltip", Tooltip);
  vue.component("el-input", Input);
  vue.component("el-autocomplete", Autocomplete);
  vue.component("el-popover", Popover);
  vue.component("el-radio", Radio);
  vue.component("el-select", Select);
  vue.component("el-option", Option);
  vue.component("el-upload", Upload);
}
