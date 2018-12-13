// element-ui 所有组件列表:
//
//     Alert,Aside,Autocomplete,Badge,Breadcrumb,BreadcrumbItem,Button,
//     ButtonGroup,Card,Carousel,CarouselItem,Cascader,Checkbox,CheckboxButton,
//     CheckboxGroup,Col,Collapse,CollapseItem,ColorPicker,Container,DatePicker,
//     Dialog,Dropdown,DropdownItem,DropdownMenu,Footer,Form,FormItem,Header,
//     Icon,Input,InputNumber,Loading,Main,Menu,MenuItem,MenuItemGroup,Message,
//     MessageBox,Notification,Option,OptionGroup,Pagination,Popover,Progress,
//     Radio,RadioButton,RadioGroup,Rate,Row,Select,Slider,Step,Steps,Submenu,
//     Switch,TabPane,Table,TableColumn,Tabs,Tag,TimePicker,TimeSelect,Tooltip,
//     Transfer,Tree,Upload
// !需要哪个导入哪个以便减少项目体积

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Input,
  Menu,
  MenuItem,
  MenuItemGroup,
  Option,
  Popover,
  Radio,
  Select,
  Submenu,
  Switch,
  TabPane,
  Tabs,
  Tooltip,
  Upload
} from "element-ui";
import view from "@okvue/view";
import OMenu from "../components/menu";

import "../assets/style/element-overide.scss";

export default {
  install: function(Vue) {
    Vue.component(Dropdown.name, Dropdown);
    Vue.component(DropdownItem.name, DropdownItem);
    Vue.component(DropdownMenu.name, DropdownMenu);
    Vue.component(Input.name, Input);
    Vue.component(Menu.name, Menu);
    Vue.component(MenuItem.name, MenuItem);
    Vue.component(MenuItemGroup.name, MenuItemGroup);
    Vue.component(Option.name, Option);
    Vue.component(Popover.name, Popover);
    Vue.component(Radio.name, Radio);
    Vue.component(Select.name, Select);
    Vue.component(Submenu.name, Submenu);
    Vue.component(Switch.name, Switch);
    Vue.component(TabPane.name, TabPane);
    Vue.component(Tabs.name, Tabs);
    Vue.component(Tooltip.name, Tooltip);
    Vue.component(Upload.name, Upload);

    Vue.use(view);
    Vue.component(OMenu.name, OMenu);
  }
};
