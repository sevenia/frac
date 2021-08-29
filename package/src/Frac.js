import './tailwind.scss'

// --- Components ------------------------------------------------------------------------------------
import Input from './components/Input.vue'
import ConfigRow from './components/ConfigRow.vue'
import Menu from './components/Menu.vue'
import MenuToggle from './components/MenuToggle.vue'
import IconError from './icons/Error.vue'
import IconPencil from './icons/Pencil.vue'
import IconOk from './icons/Ok.vue'
import IconCancel from './icons/Cancel.vue'

export const Components = {
    Input,
    ConfigRow,
    Menu,
    MenuToggle,

    IconError,
    IconPencil,
    IconOk,
    IconCancel,
}

// --- Plugins ---------------------------------------------------------------------------------------
import I18n from './plugins/I18n'
import Router from './plugins/Router'
import EventHub from './plugins/EventHub'
import Helpers from './plugins/Helpers'

export const Plugins = {
    Router,
    I18n,
    EventHub,
    Helpers,
}
