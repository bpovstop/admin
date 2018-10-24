import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification
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
}
