export const MenuTest = function () {
    return 5;
}

class Menu {
    constructor(id, text, url, icon){
        this.id = id;
        this.text = text;
        this.url = url;
        this.icon = icon;
        this.state = false;
    }
}

export default Menu;